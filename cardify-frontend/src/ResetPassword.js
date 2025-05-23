import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './ForgotPassword.css'
function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // from ?token=<reset_token>

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('idle');
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        setStatus('loading');
        try {
            await axios.post(`${BACKEND_BASE_URL}/api/users/reset-password`, {
                token,
                newPassword: password
            });
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="reset-pwd">
                <h2>Password Reset Successfully</h2>
                <p>You can now log in with your new password.</p>
            </div>
        );
    }

    return (
        <div className="reset-pwd">
            <div className="reset-container">
                <h1>Reset Your Password</h1>
                {status === 'error' && <p style={{color: 'red'}}>Error resetting password.</p>}
                <form onSubmit={handleSubmit} className="reset-form">
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button disabled={status === 'loading'}>
                        {status === 'loading' ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
        </div>
        </div>
    );
}

export default ResetPassword;
