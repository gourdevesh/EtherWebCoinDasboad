import React, { useState } from 'react'
import Web3 from 'web3'
import {
  CCard, CCardBody, CCardHeader,
  CForm, CFormLabel, CFormInput, CFormSelect, CButton
} from '@coreui/react'
import { notifyBackendOfDeposit, submitdepositAsset, updateDeposit } from '../../Services/depositService'
import { toast } from 'react-toastify'
import { useAuth } from '../../views/pages/context/AuthContext'

const DepositForm = ({ onDepositSuccess }) => {
  const [walletAddress, setWalletAddress] = useState('')
  const [amount, setAmount] = useState('')
  const contractAddress = '0x55d398326f99059fF775485246999027B3197955'
  const access_key = "Mj4V95yTzSQp7C8bCR57v9TF4yJxtdpj"
  const { authUser } = useAuth()
  const user = authUser?.USER
  const client_id = user?.id;
  const user_name = user?.name;
  const deposit_network = "BEP20";
  const deposit_asset = "USDT"
  const currentOrigin = window.location.origin;


  const handleWeb3Transfer = async () => {
    try {
      if (!window.ethereum) return alert('MetaMask not detected!')
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const web3 = new Web3(window.ethereum)
      const account = accounts[0]
      setWalletAddress(account)

      const response = await notifyBackendOfDeposit(amount, 'USDT', 'wallet')

      if (!response || !response.data?.to_address) {
        throw new Error('Invalid backend response')
      }
      setAmount("")
      toast.success(response.message);
      onDepositSuccess()
      const to_address = response.data.to_address
      const deposit_id = response?.data?.id;
      const request_amount = response?.data?.request_amount;


      if (!web3.utils.isAddress(to_address)) {
        alert('Invalid recipient address!')
        return
      }
      const amountInWei = web3.utils.toWei(amount.toString(), 'ether')
      const data = web3.eth.abi.encodeFunctionCall(
        {
          name: 'transfer',
          type: 'function',
          inputs: [
            { type: 'address', name: '_to' },
            { type: 'uint256', name: '_value' }
          ]
        },
        [to_address, amountInWei]
      )

      const tx = {
        from: account,
        to: contractAddress,
        value: '0x0',
        gas: web3.utils.toHex(200000),
        gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
        data: data
      }
      try {
        console.log('Sending transaction:', tx)
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx]
        })
        const updateResponse = await updateDeposit(
          deposit_id,
          request_amount,
          walletAddress,
          txHash
        );
        onDepositSuccess()
        console.log('Transaction hash:', txHash)
        alert(`Transaction sent! Hash: ${txHash}`)
      } catch (err) {
        console.error('MetaMask TX Error:', err)
      }

    } catch (err) {
      console.error('Transaction error:', err)
      toast.error(err.message)
    }
  }

  const generateTxnId = () => {
    const prefix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const suffix = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${suffix}`;
  }

  const handleGatewayPayment = async () => {
    const txn_id = generateTxnId();

    try {
      const response = await notifyBackendOfDeposit(amount, 'USDT', 'getway')
      const deposit_id = response?.data?.id;

      if (deposit_id) {
        localStorage.setItem('deposit_id', deposit_id);
      }
      const res = await submitdepositAsset({
        access_key: access_key,
        txn_id: txn_id,
        client_id: client_id,
        user_name: user_name,
        deposit_amt: amount,
        deposit_network: deposit_network,
        deposit_asset: deposit_asset,
        back_url: `${currentOrigin}/#/deposit?txn_id=${txn_id}&client_id=${client_id}`
      });
      toast.success(res.message)
      setAmount("")
      onDepositSuccess()

      window.open(res.qrUrl, '_blank');
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className="d-flex justify-content-center">
      <CCard
        className="my-4 text-white"
        style={{ backgroundColor: '#0B0730', width: '100%', maxWidth: '500px' }}
      >
        <CCardHeader className="text-white" style={{ backgroundColor: '#151136' }}>
          <h5>Deposit Form</h5>
        </CCardHeader>
        <CCardBody>
          <div className="mb-3">
            <CFormLabel className="text-white">Deposit Asset</CFormLabel>
            <CFormInput type="text" value="USDT" disabled style={{ backgroundColor: '#151136', color: '#fff' }} />
          </div>

          <div className="mb-3">
            <CFormLabel className="text-white">Select Network</CFormLabel>
            <CFormSelect disabled style={{ backgroundColor: '#151136', color: '#fff' }}>
              <option value="BEP20">BEP20</option>
            </CFormSelect>
          </div>

          <div className="mb-3">
            <CFormLabel className="text-white">Deposit Amount</CFormLabel>
            <CFormInput
              className="dark-input"
              type="number"
              placeholder="Enter USDT amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={{ backgroundColor: '#151136', color: '#fff' }}
            />
          </div>

          <div className="d-flex justify-content-center gap-3 w-100">
            <CButton color="success" className="w-50" onClick={handleWeb3Transfer} type="button">
              {walletAddress ? `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
            </CButton>
            <CButton color="primary" type="submit" className="w-50" onClick={handleGatewayPayment}>
              Pay with Gateway
            </CButton>
          </div>
        </CCardBody>
      </CCard>
    </div>

  )
}

export default DepositForm
