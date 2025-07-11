import React, { useState } from 'react'
import {
    CModal,
    CModalHeader,
    CModalBody,
    CButton,
    CFormInput,
    CFormLabel,
    CCol,
    CInputGroup,
    CInputGroupText,
} from '@coreui/react'
import { toast } from 'react-toastify'
import { updatePassword } from '../Services/profileService'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordUpdateModal = ({ show, handleClose, onSave }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [newShowPassword, setNewShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleUpdate = async () => {
        const formData = new FormData()
        formData.append('old_password', oldPassword)
        formData.append('new_password', newPassword)
        setLoading(true)
        try {
            const response = await updatePassword(formData)
            toast.success(response?.message || 'Password updated successfully')
            setNewPassword('')
            setOldPassword('')
            handleClose()
            navigate('/')
        } catch (error) {
            toast.error(error?.message || 'Failed to update password')
        }
        setLoading(false)
    }

    return (
        <CModal visible={show} onClose={handleClose} alignment="center">
            <CModalHeader>Password Update</CModalHeader>
            <CModalBody>
                {/* Current Password Field */}
                <div className="mb-3">
                    <CFormLabel htmlFor="oldPassword">Current Password</CFormLabel>
                    <CInputGroup>
                        <CFormInput
                            type={showPassword ? 'text' : 'password'}
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <CInputGroupText
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </CInputGroupText>
                    </CInputGroup>
                </div>

                {/* New Password Field */}
                <div className="mb-3">
                    <CFormLabel htmlFor="newPassword">New Password</CFormLabel>
                    <CInputGroup>
                        <CFormInput
                            type={newShowPassword ? 'text' : 'password'}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <CInputGroupText
                            style={{ cursor: 'pointer' }}
                            onClick={() => setNewShowPassword(!newShowPassword)}
                        >
                            {newShowPassword ? <FaEyeSlash /> : <FaEye />}
                        </CInputGroupText>
                    </CInputGroup>
                </div>

                <CCol xs={12}>
                    <CButton
                        color="primary"
                        onClick={handleUpdate}
                        className="w-100"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Save'}
                    </CButton>
                </CCol>
            </CModalBody>
        </CModal>
    )
}

export default PasswordUpdateModal
