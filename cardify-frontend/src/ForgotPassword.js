import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'
import Footer from "./Footer";
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    // 'idle' | 'loading' | 'sent' | 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('http://localhost:8080/api/users/forgot-password', { email });
            setStatus('sent');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'sent') {
        return (
            <div>
                <h2>Email Sent</h2>
                <p>We've sent a password reset link to your email.</p>
            </div>
        );
    }

    return (
        <div className="forgot-password">
            <div className="forgot-container">
                <h1>Forgotten your password?</h1>
                <p>There is nothing to worry about, we'll send you a message to help you reset your password</p>
                {status === 'error' && <p style={{color: 'red'}}>Error sending email.</p>}
                <form onSubmit={handleSubmit} className="forgot-form">
                    <label>Email Address:</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sending Email...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
            <div>
            <Footer/>
            </div>
        </div>
    );
}

export default ForgotPassword;
