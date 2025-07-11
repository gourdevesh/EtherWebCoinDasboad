import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeClosed, cilLockLocked, cilCode } from '@coreui/icons';
import { toast } from 'react-toastify';
import { resendVerificationEmail } from '../../../Services/authService';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordReset = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setLoading(true);

    try {
      const res = await resendVerificationEmail({
        email: formData.email,
        otp: formData.otp,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      if (!res.status) {
        toast.error(res.message || 'Something went wrong');
        return;
      }

      toast.success(res.message || 'Password reset successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h2>Reset Password</h2>
                  <p className="text-body-secondary">
                    Enter your registered email, the OTP received, and a new password.
                  </p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCode} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="otp"
                      placeholder="OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="New Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ paddingRight: '40px' }}
                    />
                    <CInputGroupText
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </CInputGroupText>
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      style={{ paddingRight: '40px' }}
                    />
                    <CInputGroupText
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </CInputGroupText>
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton type="submit" color="primary" disabled={loading}>
                      {loading ? 'Resetting...' : 'Reset Password'}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default PasswordReset;
