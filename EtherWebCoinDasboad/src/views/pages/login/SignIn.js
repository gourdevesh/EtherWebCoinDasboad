import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Make sure this is installed and imported
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../../../Services/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignIn = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { success, data, error } = await loginUser(formData);
            if (success) {
                const { token } = data;
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
        <section
            className="vh-100 vw-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgb(37 43 55)' }}
        >
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                            <div className="row g-0">

                                {/* Sidebar Image */}
                                <div
                                    className="col-md-6 col-lg-5 d-none d-md-block"
                                    style={{
                                        backgroundImage:
                                            'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: '#6d4c41',
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
                                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        }}
                                    />
                                </div>

                                {/* Login Form */}
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black w-100">
                                        <form onSubmit={handleSubmit}>
                                            <div className="d-flex mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x " style={{ color: '#ff6219' }}></i>
                                                <span className="display-6 fw-bold" style={{ color: '#fff' }}><img src="src/assets/brand/logocoin.png" width='190px' alt='logo' /></span>
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px', color: '#fff' }}>
                                                Sign into your account
                                            </h5>

                                            {/* Email */}
                                            <div className="form-outline mb-4">
                                                <label htmlFor="textInput" className="form-label" style={{ color: '#fff', fontSize: '1.22rem' }}>
                                                    Email address
                                                </label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your email"
                                                    required
                                                />
                                            </div>

                                            {/* Password */}
                                            <div className="form-outline mb-4">
                                                <label htmlFor="password" className="form-label" style={{ color: '#fff', fontSize: '1.22rem' }}>
                                                    Password
                                                </label>
                                                <div className="input-group">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        id="password"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        className="form-control form-control-lg"
                                                        placeholder="Enter your password"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary"
                                                        style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #6c757d' }}
                                                        onClick={() => setShowPassword(prev => !prev)}
                                                    >
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-lg w-100 text-white"
                                                    type="submit"
                                                    style={{ backgroundColor: '#ff6219', border: 'none' }}
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Logging in...' : 'Login'}
                                                </button>
                                            </div>

                                            <a className="small text-muted" href="/#/verify-email" style={{ color: '#ffff' }}>
                                                Forgot password?
                                            </a>
                                            <p className="mb-5 pb-lg-2" style={{ color: '#ffff' }}>
                                                Don't have an account?{' '}
                                                <a href="/#/register" className="custom-link" >
                                                    Register here
                                                </a>
                                            </p>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
