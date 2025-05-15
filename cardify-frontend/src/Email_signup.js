import React, { useState } from 'react';
import "./Email_signup.css"
import {useNavigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import Footer from "./Footer";
function SignupForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    useEffect(() => {
        console.log("Current URL:", window.location.href);
        console.log("React Router location object:", location);

        const query = new URLSearchParams(location.search);
        const token = query.get("token");
        const role = query.get("role");

        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", role)
            const redirect=localStorage.getItem("redirectAfterLogin");
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirect, { replace: true });  // Use replace to prevent back button issues
        } else {
            console.log("❌ No token in the URL.");
        }
    }, [location, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/users/signup", formData);
            console.log("Response:", response.data);
            alert("Account Created Successfully!");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
            });
            navigate("/login");
        } catch (error) {
            console.error("Error during account creation:", error);
            alert("Failed to create account. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
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

    return (
        <div className="signup-page">

            <div className="signup-container">
                <form onSubmit={handleSubmit}>
                    {/* First & Last Name side by side */}
                    <h2>Sign Up</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                required
                            />
                        </div>
                    </div>

                    {/* Email (full width) */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                        />
                    </div>

                    {/* Phone Number (full width) */}
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                        />
                    </div>

                    {/* Password (full width) */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a Password"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    {/*<div className="button-row">*/}
                    <button type="submit" className="submit1">Create Account</button>
                    <div className="social-login">
                        <button type="button" className="google-btn" onClick={handleGoogleLogin}>
                            <img src="/1-6fa0a792.png" alt="Google"/>
                            Log in with Google
                        </button>
                        <button type="button" className="facebook-btn" onClick={handleFacebookLogin}>
                            <img src="/fb.png" alt="Facebook"/>
                            Log in with Facebook
                        </button>
                    </div>
                    {/*<button type="button" onClick={() => console.log('Go Back clicked')}>*/}
                    {/*    Go Back*/}
                    {/*</button>*/}
                    {/*</div>*/}
                </form>
            </div>
            <div>
                <Footer/>
            </div>
        </div>


    );
}

export default SignupForm;
