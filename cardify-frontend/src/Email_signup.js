import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Email_signup.css';
import axios from "axios";

function EmailSignup() {
    const navigate = useNavigate(); // React Router hook for navigation

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
            // Send the data to the backend
            const response = await axios.post("http://localhost:8080/api/users/signup", formData);
            console.log("Response:", response.data);

            alert("Account Created Successfully!");

            // Clear form data
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
            });

            // Redirect to another page if needed
            navigate("/");
        } catch (error) {
            console.error("Error during account creation:", error);
            alert("Failed to create account. Please try again.");
        }
    };

    const handleGoBack = () => {
        navigate('/signup'); // Navigate back to the Signup page
    };

    return (
        <div className="email-signup-container">
            <h1 className="title">Create your account</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-row">
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="input"
                    />
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
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="input"
                    />
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
                    <button type="submit" className="btn create-account-btn" onClick={handleSubmit}>
                        Create Account
                    </button>
                    <button
                        type="button"
                        className="btn go-back-btn"
                        onClick={handleGoBack} // Go back to the Signup page
                    >
                        Go Back
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EmailSignup;