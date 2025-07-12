import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CButton,
  CFormInput,
  CFormLabel,
  CCol,
  CAlert,
  CSpinner,
  CInputGroupText,
  CInputGroup,
} from '@coreui/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { transferFund } from '../Services/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FundTransferModal = ({ show, handleClose, onTransfer }) => {
  const [amount, setAmount] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleTransfer = async () => {

    setLoading(true);
    try {
      const result = await transferFund({
        receiver_id: receiverId,
        amount,
        password,
      });

      if (result.success) {
        toast.success('Transfer successful');
        handleClose();
        onTransfer();
      } else {
        toast.error(result.error.message || 'Transfer failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CModal visible={show} onClose={handleClose} alignment="center">
      <CModalHeader closeButton>Fund Transfer</CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <CFormLabel htmlFor="amount">Amount</CFormLabel>
          <CFormInput
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-3">
          <CFormLabel htmlFor="receiverId">Receiver ID</CFormLabel>
          <CFormInput
            type="text"
            id="receiverId"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            placeholder="Enter user ID to transfer"
          />
        </div>

        <div className="mb-4">
          <CFormLabel htmlFor="password">Transaction Password</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your transaction password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <CInputGroupText
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </CInputGroupText>
          </CInputGroup>
        </div>

        <CCol xs={12}>
          <CButton
            color="primary"
            className="w-100 fw-bold"
            onClick={handleTransfer}
            disabled={loading}
          >
            {loading ? <CSpinner size="sm" color="dark" /> : 'Transfer Now'}
          </CButton>
        </CCol>
      </CModalBody>
    </CModal>
  );
};

export default FundTransferModal;
