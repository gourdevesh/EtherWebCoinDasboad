import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { loginUser } from '../../../Services/authService'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { success, data, error } = await loginUser(formData);
      if (success) {
        const { token, user } = data;
        localStorage.setItem('token', token);
        toast.success(data.message || 'Login successful');
        navigate('/');
      } else {
        toast.error(error?.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    {/* Email */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />
                    </CInputGroup>

                    {/* Password */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>

                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                      />

                      <CInputGroupText
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </CInputGroupText>
                    </CInputGroup>



                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                          {loading ? 'Logging in...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/verify-email">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              {/* Right Panel */}
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Don't have an account? Sign up now and start your journey with us!
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
