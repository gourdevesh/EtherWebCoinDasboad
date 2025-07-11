import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilExitToApp } from '@coreui/icons'
import { CDropdownItem, CNavItem } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../Services/authService'
import { toast } from 'react-toastify'

const LogoutNavItem = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await logoutUser()
            localStorage.removeItem('token')
            toast.success(response?.message)
            navigate('/login')
        } catch (error) {
            console.error('Logout failed:', error)
            const errorMessage =
                error?.response?.data?.message || 'Logout failed. Please try again.'
            toast.error(errorMessage)
        }
    }

    return (
        <CDropdownItem>
            <div
                className="nav-link d-flex align-items-center text-dark"
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
            >
                <CIcon icon={cilExitToApp} className="nav-icon me-2" />
                <span>Logout</span>
            </div>
        </CDropdownItem>
    )
}

export default LogoutNavItem
