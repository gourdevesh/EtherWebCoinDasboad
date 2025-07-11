import React, { useState } from 'react'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CButton,
    CForm,
    CFormLabel,
    CFormInput,
    CRow,
    CCol,
    CContainer,
    CInputGroupText,
    CInputGroup,
} from '@coreui/react'
import { toast } from 'react-toastify'
import { sendOtp, updateTransactionPassword } from '../Services/authService'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const UpdateTnxPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [otp, setOtp] = useState('')
    const [new_password, setPassword] = useState('')
    const [otpLoading, setOtpLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);


    const handleSendOtp = async () => {
        setOtpLoading(true);
        try {
            const res = await sendOtp();
            toast.success(res?.message || 'OTP sent successfully');
        } catch (error) {
            toast.error(
                error?.response?.data?.error ||
                error.message ||
                'Failed to send OTP'
            );
        } finally {
            setOtpLoading(false);
        }
    };



    const handleUpdate = async () => {
        setUpdateLoading(true);
        try {
            const res = await updateTransactionPassword({ otp, new_password });
            toast.success(res?.message || 'Transaction password updated successfully');
            setOtp('');
            setPassword('');
        } catch (error) {
            toast.error(
                error?.response?.data?.error ||
                error.message ||
                'Failed to update password'
            );
        }
        finally {
            setUpdateLoading(false);
        }
    };


    return (
        <CContainer>
            <CRow className="justify-content-center">
                <CCol xs={12} sm={10} md={8} lg={6}>
                    <CCard>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Update Transaction Password</strong>
                            <CButton color="info" size="sm" onClick={handleSendOtp} disabled={otpLoading}>
                                {otpLoading ? 'Sending...' : 'Set OTP'}
                            </CButton>

                        </CCardHeader>

                        <CCardBody>
                            <CForm>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="otp">OTP</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="otp"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                  
                                </div>

                           <div className="mb-3">
  <CFormLabel htmlFor="tnxPassword">Password</CFormLabel>
  <CInputGroup>
    <CFormInput
      type={showPassword ? 'text' : 'password'}
      id="tnxPassword"
      placeholder="Enter Password"
      value={new_password}
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


                                <CButton color="primary" className="w-100" onClick={handleUpdate} disabled={updateLoading}>
                                    {updateLoading ? 'Updating...' : 'Update'}
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default UpdateTnxPasswordForm
