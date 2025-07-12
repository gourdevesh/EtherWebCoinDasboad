import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilSettings } from '@coreui/icons'
import { useState } from 'react'
import PasswordUpdateModal from './PasswordUpdateModal'

const PasswordUpdateNav = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const handleClick = () => {
        setShowPasswordModal(true) //
    }

    return (
        <>
            <div className="nav-link" style={{ cursor: 'pointer' }} onClick={handleClick}>
                <CIcon icon={cilLockLocked} className="me-2 nav-icon" />
                Password Update
            </div>

            <PasswordUpdateModal
                show={showPasswordModal}
                handleClose={() => setShowPasswordModal(false)}
                onSave={() => {
                    setShowPasswordModal(false)
                }}
            />
        </>
    )
}

export default PasswordUpdateNav
