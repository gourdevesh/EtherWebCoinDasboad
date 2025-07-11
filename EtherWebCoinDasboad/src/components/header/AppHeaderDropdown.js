import React, { useEffect } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import LogoutNavItem from '../LogoutNavItem'
import { useAuth } from '../../views/pages/context/AuthContext'

const AppHeaderDropdown = () => {
   const { authUser } = useAuth()
   const user = authUser?.USER

  return (
    <CDropdown variant="nav-item " >
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={user?.profile_image} size="md" />
      </CDropdownToggle>
     <CDropdownMenu
  className="pt-0 text-dark"
  placement="bottom-end"
  style={{ backgroundColor: '#f5f6fa' }} 
>
  <CDropdownHeader className="bg-0E0F33 fw-semibold text-white">Account</CDropdownHeader>

  <CDropdownDivider />

  <CDropdownItem href="/#/profile" className="text-dark">
    <CIcon icon={cilUser} className="me-2 text-dark" />
    Profile
  </CDropdownItem>
    <LogoutNavItem />
</CDropdownMenu>

    </CDropdown>
  )
}

export default AppHeaderDropdown
