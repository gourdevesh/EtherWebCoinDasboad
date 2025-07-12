import React, { useEffect, useState } from 'react'
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
    const [timer, setTimer] = useState(0);


    const handleSendOtp = async () => {
        setOtpLoading(true);
        try {
            const res = await sendOtp();
            toast.success(res?.message || 'OTP sent successfully');
            setTimer(300); // start 5-minute timer
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
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
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
                    <CCard style={{ backgroundColor: '#0B0730', color: '#fff' }}>
                        <CCardHeader className="d-flex justify-content-between align-items-center">
                            <strong>Update Transaction Password</strong>
                            <CButton color="secondary" size="sm" onClick={handleSendOtp} disabled={otpLoading}>
                                {otpLoading
                                    ? 'Sending...'
                                    : timer > 0
                                        ? `Resend OTP`
                                        : 'Send OTP'}                            </CButton>
                        </CCardHeader>

                        <CCardBody>
                            <CForm>
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <CFormLabel htmlFor="otp" className="mb-0">OTP</CFormLabel>
                                        {timer > 0 && (
                                            <span style={{ fontSize: '14px', color: 'red' }}>
                                                {formatTime(timer)}
                                            </span>
                                        )}
                                    </div>

                                    <CFormInput
                                        type="text"
                                        id="otp"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        style={{ backgroundColor: '#151136' }}
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
                                            style={{ backgroundColor: '#151136' }}

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
