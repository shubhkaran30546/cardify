import React, { useState } from 'react';
import "./Email_signup.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
function SignupForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });
    const navigate = useNavigate();
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
            navigate("/");
        } catch (error) {
            console.error("Error during account creation:", error);
            alert("Failed to create account. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                        <button type="button" className="google-btn">
                            <img src="/1-6fa0a792.png" alt="Google"/>
                            Log in with Google
                        </button>
                        <button type="button" className="facebook-btn">
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
