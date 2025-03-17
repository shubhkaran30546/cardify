// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./Login.css";
// //
// // const LoginForm = () => {
// //     const [email, setEmail] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState("");
// //     const [success, setSuccess] = useState("");
// //
// //     const navigate = useNavigate(); // Hook for navigation
// //
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError("");
// //         setSuccess("");
// //
// //         try {
// //             const response = await axios.post("http://localhost:8080/api/users/login", {
// //                 email,
// //                 password,
// //             });
// //
// //             if (response.data && response.data.token) {
// //                 localStorage.setItem("token", response.data.token); // Save token
// //                 setSuccess("Login successful!");
// //                 console.log(response.data);
// //                 navigate("/"); // Redirect to homepage or another page
// //             }
// //         } catch (err) {
// //             setError(
// //                 err.response?.data || "Login failed. Please check your credentials."
// //             );
// //             console.error("Error during login:", err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };
// //
// //     return (
// //         <div className="login-container">
// //             <div className="login-card">
// //                 <h2>Login to access eCard</h2>
// //                 {error && <p className="error-message">{error}</p>}
// //                 {success && <p className="success-message">{success}</p>}
// //                 <form onSubmit={handleSubmit}>
// //                     <input
// //                         type="email"
// //                         placeholder="Email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                         className="login-input"
// //                     />
// //                     <input
// //                         type="password"
// //                         placeholder="Password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                         className="login-input"
// //                     />
// //                     <button type="submit" className="login-button" disabled={loading}>
// //                         {loading ? "Logging in..." : "Login"}
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default LoginForm;
//
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
//
// function Login() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');
//
//         try {
//             const response = await axios.post('http://localhost:8080/api/users/login', { email, password }, {
//                 withCredentials: true // Ensure cookies are sent with the request if needed
//             });
//             console.log("Login response:", response.data); // Verify the token is present here
//             localStorage.setItem("token", response.data.token); // Store token
//             console.log("Token stored:", localStorage.getItem("token")); // Verify storage
//             navigate("/create-ecard");
//         } catch (err) {
//             setError('Login failed: Invalid email or password!');
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit" disabled={isLoading}>
//                     {isLoading ? 'Logging in...' : 'Login'}
//                 </button>
//             </form>
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </div>
//     );
// }
//
// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Footer from './Footer';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };
    const handleFacebookLogin = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users/auth/facebook");
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error("Error initiating Facebook login:", error);
        }
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
            const redirect=localStorage.getItem("redirectAfterLogin");
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirect, { replace: true });
        } catch (err) {
            setError('Login failed: Invalid email or password!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* Login Card */}
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
