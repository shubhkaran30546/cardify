import React, { useState } from 'react';
import axios from 'axios';
import './BroadcastEmail.css';

function BroadcastEmail() {
    const [portfolioEmail, setPortfolioEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

        const formData = new FormData();
        formData.append('portfolioEmail', portfolioEmail);
        formData.append('subject', subject);
        formData.append('message', message);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(
                `${BACKEND_BASE_URL}/api/contact/broadcast`,
            formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
        );
            setResponseMessage(response.data);
        } catch (error) {
            setResponseMessage('Error sending broadcast email.');
        }
    };

    return (
        <div className="broadcast-container">
            <div className="broadcast-header">
                <span className="broadcast-icon">📢</span>
                <h2 className="broadcast-title">Broadcast Email to All Contacts</h2>
            </div>
            <p className="broadcast-description">
                Fill out this form to broadcast an email to all your contacts.
            </p>
            <form onSubmit={handleSubmit} className="broadcast-form">
                <div className="broadcast-form-group">
                    <label className="broadcast-label">Portfolio Email<span style={{color: 'red'}}>*</span></label>
                    <input
                        type="email"
                        value={portfolioEmail}
                        onChange={(e) => setPortfolioEmail(e.target.value)}
                        required
                        className="broadcast-input"
                        placeholder="your@email.com"
                    />
                </div>
                <div className="broadcast-form-group">
                    <label className="broadcast-label">Subject<span style={{color: 'red'}}>*</span></label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="broadcast-input"
                        placeholder="Email subject"
                    />
                </div>
                <div className="broadcast-form-group">
                    <label className="broadcast-label">Message<span style={{color: 'red'}}>*</span></label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="broadcast-textarea"
                        placeholder="Type your message here..."
                    />
                </div>
                <div className="broadcast-form-group">
                    <label className="broadcast-label">Attach Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="broadcast-input-file"
                    />
                </div>
                <button type="submit" className="broadcast-button">
                    Send Broadcast
                </button>
            </form>
            {responseMessage && (
                <p className="broadcast-response">{responseMessage}</p>
            )}
        </div>
    );
}

export default BroadcastEmail;