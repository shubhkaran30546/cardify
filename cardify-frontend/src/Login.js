// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Login.css";
//
// const LoginForm = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//
//     const navigate = useNavigate(); // Hook for navigation
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError("");
//         setSuccess("");
//
//         try {
//             const response = await axios.post("http://localhost:8080/api/users/login", {
//                 email,
//                 password,
//             });
//
//             if (response.data && response.data.token) {
//                 localStorage.setItem("token", response.data.token); // Save token
//                 setSuccess("Login successful!");
//                 console.log(response.data);
//                 navigate("/"); // Redirect to homepage or another page
//             }
//         } catch (err) {
//             setError(
//                 err.response?.data || "Login failed. Please check your credentials."
//             );
//             console.error("Error during login:", err);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <div className="login-container">
//             <div className="login-card">
//                 <h2>Login to access eCard</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 {success && <p className="success-message">{success}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="login-input"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="login-input"
//                     />
//                     <button type="submit" className="login-button" disabled={loading}>
//                         {loading ? "Logging in..." : "Login"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default LoginForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', { email, password }, {
                withCredentials: true // Ensure cookies are sent with the request if needed
            });
            console.log("Login response:", response.data); // Verify the token is present here
            localStorage.setItem("token", response.data.token); // Store token
            console.log("Token stored:", localStorage.getItem("token")); // Verify storage
            navigate("/create-ecard");
        } catch (err) {
            setError('Login failed: Invalid email or password!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default Login;