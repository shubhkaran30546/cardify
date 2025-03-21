import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const handleFacebookLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/facebook";
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(
                'http://localhost:8080/api/users/login',
                { email, password },
                { withCredentials: true }
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userRole", response.data.role);

            // If there's a redirect stored, use it; otherwise navigate to "/profile"
            const redirect = localStorage.getItem("redirectAfterLogin");
            if (redirect) {
                localStorage.removeItem("redirectAfterLogin");
                navigate(redirect, { replace: true });
            } else {
                navigate("/profile", { replace: true });
            }
        } catch (err) {
            setError('Login failed: Invalid email or password!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <h2>Log In</h2>
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="password-requirements">
                            I want to be commissioned and secure in letters, numbers, and symbols.
                        </div>

                        <div className="login-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="/forgot-password" className="forgot-password">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>

                        <div className="social-login">
                            <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                                <img src="/1-6fa0a792.png" alt="Google" />
                                Log in with Google
                            </button>
                            <button type="button" className="facebook-btn" onClick={handleFacebookLogin}>
                                <img src="/fb.png" alt="Facebook" />
                                Log in with Facebook
                            </button>
                        </div>

                        <div className="signup-link">
                            No Account Yet? <a href="/email-signup">Sign Up</a>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default Login;