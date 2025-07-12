import React, { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilEnvelopeClosed } from '@coreui/icons'
import { toast } from 'react-toastify'
import { verifyEmail } from '../../../Services/authService'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await verifyEmail({ email })
            if (!response.status) {
                toast.error(response.message || 'Invalid email');
                return;
            }
            toast.success(response.message || 'Verification email sent!')
            navigate('/password-reset')
        } catch (err) {
            toast.error(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleSubmit}>
                                    <h2>Email Verification</h2>
                                    <p className="text-body-secondary">Enter your email to receive a verification link or OTP</p>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilEnvelopeClosed} />
                                        </CInputGroupText>
                                        <CFormInput
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton type="submit" color="primary" disabled={loading}>
                                            {loading ? 'Sending...' : 'Send Verification'}
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default VerifyEmail
