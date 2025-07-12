import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormInput,
  CFormLabel,
  CButton,
  CForm,
  CAlert,
  CSpinner,
  CInputGroup,
} from '@coreui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { decryptWithKey, startWithdraw, updateWithdraw } from '../Services/WidthDrawServer';
import Swal from 'sweetalert2';
import { useAuth } from '../views/pages/context/AuthContext';
import Web3 from 'web3';

const WithdrawRequestModal = ({ visible, setVisible, fetchWithdrawList }) => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('0xB827B836CA7Fb632f74297607282C772bb47bFBc');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { authUser } = useAuth()
  const user = authUser?.USER


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await startWithdraw({ amount, to_address: address, password });

      if (!res?.status) {
        toast.error(res?.message || 'Withdrawal failed.');
        return;
      }
      toast.success(res?.message || 'Withdrawal request submitted successfully');
      setAmount('');
      setAddress('');
      setPassword('');
      setVisible(false);
      fetchWithdrawList()

      if (res?.access && res?.type === 'auto') {
        await handleBNBTransfer(res, { to_address: address, amount }, user?.email);
        return;
      }

      if (res?.type === 'manual') {
        Swal.fire({
          title: 'Congratulations!',
          html: 'Your withdrawal will be completed within 24 hours.<br><b>Closing in <span id="timer">2</span> seconds...</b>',
          icon: 'success',
          timer: 2000,
          didOpen: () => {
            const timerElement = document.getElementById('timer');
            let timeLeft = 2;
            const timerInterval = setInterval(() => {
              timeLeft--;
              if (timerElement) {
                timerElement.textContent = timeLeft.toString();
              }
            }, 1000);
          },
        });
      }


    } catch (error) {
      toast.error(error.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };



  const handleBNBTransfer = async (res, withdrawFormValues, userEmail) => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));

      const fromAddress = res.data.from_address;
      const toAddress = withdrawFormValues.to_address;
      const amount = withdrawFormValues.amount;
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

      const nonce = await web3.eth.getTransactionCount(fromAddress, 'pending');
      const gasPrice = await web3.eth.getGasPrice();

      let gasLimit;
      try {
        gasLimit = await web3.eth.estimateGas({
          from: fromAddress,
          to: toAddress,
          value: amountInWei,
        });
      } catch (err) {
        gasLimit = 21000;
        toast.error('Estimate gas failed, using fallback.');
      }

      const tx = {
        from: fromAddress,
        to: toAddress,
        value: amountInWei,
        gas: gasLimit,
        gasPrice,
        nonce,
      };

      const decrypted = decryptWithKey(res.access, user.email);
      const privateKey = decrypted.startsWith('0x') ? decrypted : '0x' + decrypted;

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      if (!signedTx.rawTransaction) throw new Error('Signing failed');

      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      await updateWithdraw({
        withdraw_id: res.data.id,
        txn_hash: receipt.transactionHash,
      });

      Swal.fire({
        title: 'Success!',
        html: 'BNB Transfer Complete.<br><b>Closing in <span id="timer">2</span> seconds...</b>',
        icon: 'success',
        timer: 2000,
        didOpen: () => {
          const timerElement = document.getElementById('timer');
          let timeLeft = 2;
          const interval = setInterval(() => {
            timeLeft--;
            if (timerElement) timerElement.textContent = timeLeft.toString();
          }, 1000);
        },
      });

      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Transaction Failed.');
    }
  };



  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Withdraw Request</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel>Amount</CFormLabel>
            <CFormInput
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <CFormLabel>Select Network</CFormLabel>
            <CFormInput disabled value="BEP20" />
          </div>

          <div className="mb-3">
            <CFormLabel>Address</CFormLabel>
            <CFormInput
              type="text"
              placeholder="Enter address"
              value={address}
              readOnly
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <CFormLabel>Transaction Password</CFormLabel>
            <CInputGroup>
              <CFormInput
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter transaction password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required

              />
              <CButton type='button' color='secondary' varient="outline" onClick={() => setShowPassword(!showPassword)}> {showPassword ? <FaEyeSlash /> : <FaEye />} </CButton>
            </CInputGroup>
          </div>

          {/* <div className="mb-3">
            <strong>Available Amount:</strong> 63.0207<br />
            <strong>Remaining Amount:</strong> 0
          </div> */}

          <CAlert color="warning">
            ⚠️ Please double-check the withdrawal address before proceeding. Transactions are irreversible!
          </CAlert>

          <div className="d-flex justify-content-center w-100 mt-3">
            <CButton type="submit" color="primary" className="w-100" disabled={loading}>
              {loading ? <CSpinner size="sm" /> : 'Confirm Withdraw'}
            </CButton>
          </div>
        </CForm>
      </CModalBody>
    </CModal>
  );
};

export default WithdrawRequestModal;
