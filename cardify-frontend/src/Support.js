import React, { useState } from 'react';
import "./Support.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Support = () => {
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND_BASE_URL}/api/support`, formData);
            alert("Your message has been sent successfully.");
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
        } catch (error) {
            alert("Failed to send message. Please try again later.");
            console.error(error);
        }
    };

    return (
        <div className="support">
            <div className="support-container">
                <h2>Get In Touch</h2>
                <p>
                    Fill in the form below and someone from our customer service will get back to you within 24
                    hours.
                </p>
                <form onSubmit={handleSubmit} className="support-form">
                    <label>First Name</label>
                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label>Message</label>
                    <input
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                    <div className="support-send">
                        <button type="submit" className="support-button1">Send</button>
                    </div>
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Support;