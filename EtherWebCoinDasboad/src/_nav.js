import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilUser,
  cilChartLine,
  cilGroup,
  cilWallet,
  cilTransfer,
  cilBank,
  cilSettings,
  cilExitToApp,
  cilUserFollow,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
import PasswordUpdateNav from './model/PasswordUpdateNav'
import { logoutUser } from './Services/authService'
import LogoutNavItem from './components/LogoutNavItem'

const handleLogout = async () => {
  try {
    const response = await logoutUser()

    localStorage.removeItem('token')
    toast.success(response?.message || 'Logout successful')
    window.location.href = '/#/login'
  } catch (error) {
    console.error('Logout failed:', error)
    const errorMessage =
      error?.response?.data?.message || 'Logout failed. Please try again.'
    toast.error(errorMessage)
  }
}

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Rank',
    to: '/my-rank',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Stake',
    to: '/stake',
    icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
  },
  {
  component: CNavItem,
  name: 'Level Income',
  to: '/level-income',
  icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
},
  {
    component: CNavItem,
    name: 'My Team',
    to: '/my-team',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Wallet',
    to: '/wallet',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Fund Transfer',
    to: '/fund-transfer',
    icon: <CIcon icon={cilTransfer} customClassName="nav-icon" />,
  },

{
  component: CNavItem,
  name: 'Referral Income',
  to: '/referral-income',
  icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
},
{
  component: CNavItem,
  name: 'Team Business',
  to: '/team-business',
  icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
},


  {
    component: CNavItem,
    name: 'Withdraw',
    to: '/withdraw',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Setting',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tnx Password',
        to: '/update-tnx-password',
      },
      {
        component: PasswordUpdateNav,
      },
    ],
  },

   {
    component: LogoutNavItem, 
  },
]

export default _nav
