import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'


// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
import Profile from './components/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import VerifyEmail from './views/pages/forgetPassword/VerifyEmail'
import PasswordReset from './views/pages/forgetPassword/PasswordReset'
import MyTeam from './components/MyTeam'
import { useAuth } from './views/pages/context/AuthContext'
import PrivateRoute from './PrivateRoute'
import SignIn from './views/pages/login/Signin'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { refreshProfile } = useAuth()

  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])




  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/verify-email" name="Verify Email" element={<VerifyEmail />} />
          <Route exact path="/password-reset" name="password reset" element={<PasswordReset />} />

          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/login" name="Login Page" element={<SignIn />} />

          <Route path="*" name="Home" element={<PrivateRoute><DefaultLayout /></PrivateRoute>} />

        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />

      </Suspense>
    </HashRouter>
  )
}

export default App
