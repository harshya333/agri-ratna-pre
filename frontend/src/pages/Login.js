import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { FaEnvelope, FaLock, FaSignInAlt, FaHome, FaUserPlus } from 'react-icons/fa';
import '../styles/Auth.css';

function Login({ darkMode }) {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            
            const result = await response.json();
            
            if (result.success) {
                handleSuccess(result.message);
                localStorage.setItem('token', result.jwtToken);
                localStorage.setItem('userId', result.id);
                setTimeout(() => navigate('/home'), 1000);
            } else if (result.error) {
                const details = result.error?.details?.[0]?.message;
                handleError(details || result.message);
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={`auth-page ${darkMode ? 'dark' : ''}`}>
            <div className='auth-container'>
                <div className="auth-header">
                    <h1><FaSignInAlt className="auth-icon" /> Login</h1>
                    <p>Welcome back to AgriRental</p>
                </div>
                
                <form className='auth-form' onSubmit={handleLogin}>
                    <div className='form-group'>
                        <label htmlFor='email'>
                            <FaEnvelope className="input-icon" /> Email
                        </label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            value={loginInfo.email}
                            required
                        />
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='password'>
                            <FaLock className="input-icon" /> Password
                        </label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            value={loginInfo.password}
                            required
                        />
                    </div>
                    
                    <button 
                        type='submit' 
                        className='submit-btn'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <div className='auth-links'>
                        <Link to="/signup" className="auth-link">
                            <FaUserPlus /> Create account
                        </Link>
                        <Link to="/" className="auth-link">
                            <FaHome /> Back to home
                        </Link>
                    </div>
                </form>
                <ToastContainer position="bottom-right" theme={darkMode ? 'dark' : 'light'} />
            </div>
        </div>
    );
}

export default Login;