import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { registerUser } from '../../../Services/authService'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    referralCode: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        referral: formData.referralCode,
      }
      const { success, data, error } = await registerUser(payload)
      if (success) {
        toast.success(data?.message || 'Registration successful!')
        navigate('/login')
      } else {
        toast.error(error?.message || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="min-vh-100 vw-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgb(37 43 55)', padding: '20px 0' }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-xl-10">
            <div
              className="card"
              style={{ borderRadius: '1rem', overflow: 'hidden', maxHeight: '95vh' }}
            >
              <div className="row g-0">
                <div
                  className="col-md-6 col-lg-5 d-none d-md-block"
                  style={{
                    backgroundImage:
                      'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}
                  />
                </div>

                {/* Form section */}
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div
                    className="card-body p-4 p-lg-5 text-white w-100"
                    style={{ overflowY: 'auto' }}
                  >
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <span className="h1 fw-bold mb-0 text-white">
                          Create Account
                        </span>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label text-white" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control form-control"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="form-outline mb-4">
                        <label className="form-label text-white" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control form-control"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Password */}
                      <div className="form-outline mb-4 position-relative">
                        <label className="form-label text-white" htmlFor="password">
                          Password
                        </label>
                        <div className="input-group">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="form-control form-control"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword((prev) => !prev)}
                            style={{
                              backgroundColor: 'transparent',
                              color: '#fff',
                              border: '1px solid #6c757d',
                            }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      {/* Referral Code */}
                      <div className="form-outline mb-4">
                        <label className="form-label text-white" htmlFor="referralCode">
                          Referral Code (Optional)
                        </label>
                        <input
                          type="text"
                          id="referralCode"
                          name="referralCode"
                          className="form-control form-control"
                          placeholder="Enter referral code"
                          value={formData.referralCode}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Submit */}
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-lg w-100 text-white"
                          type="submit"
                          style={{ backgroundColor: '#ff6219', border: 'none' }}
                          disabled={loading}
                        >
                          {loading ? 'Creating...' : 'Register'}
                        </button>
                      </div>

                      <p className="mb-2 pb-lg-2 text-white">
                        Already have an account?{' '}
                        <Link to="/login" className="custom-link" >
                          Login here
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
                {/* End Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
