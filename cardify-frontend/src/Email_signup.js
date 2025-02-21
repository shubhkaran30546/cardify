import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Email_signup.css'; // Ensure this CSS file matches the login page styles
import './Footer';
import Footer from "./Footer";
function EmailSignup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    const handleGoBack = () => {
        navigate('/signup');
    };

    return (
        <div className="email-signup-page">
            <div className="email-signup-container">
                <div className="signup-card">
                    <h2>Sign Up</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-row">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                className="input"
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className="input"
                            />
                        </div>
                        <div className="input-row">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="input"
                            />
                        </div>
                        <div className="input-row">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                className="input"
                            />
                        </div>
                        <div className="input-row">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Create a Password"
                                className="input full-width"
                            />
                        </div>
                        <div className="button-row">
                            <button type="submit" className="btn create-account-btn">
                                Create Account
                            </button>
                            <button
                                type="button"
                                className="btn go-back-btn"
                                onClick={handleGoBack}
                            >
                                Go Back
                            </button>
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

export default EmailSignup;