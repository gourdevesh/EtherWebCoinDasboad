import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilMenu,

} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { useAuth } from '../views/pages/context/AuthContext'

const AppHeader = () => {
  const { authUser } = useAuth()
  const user = authUser?.USER

  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0 custom-header"
      ref={headerRef} style={{ backgroundColor: '#0E0F33	' }}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75" style={{ backgroundColor: '#fff' }}></div>
          </li>

        </CHeaderNav>
        <CHeaderNav className="d-none d-md-flex">
          <CHeaderNav className="ms-auto align-items-center gap-3">
            <div className="text-white text-start d-none d-md-block">
              <div className="fw-bold ">{user?.name}</div>
              <small style={{ fontSize: '12px', color: '#ccc' }}>{user?.email}</small>
            </div>
          </CHeaderNav>


        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75" style={{ backgroundColor: '#fff' }}></div>
          </li>


          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
