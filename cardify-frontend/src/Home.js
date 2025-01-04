import React from 'react';
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleOpenSignup = () => {
        navigate("/signup");
    };
    return (
        <div className="homepage-main">
            <h1>The Smarter Way to Share Who You Are.</h1>
            <button className="create-ecard-button" onClick={handleOpenSignup}>
                Create your eCard
            </button>
            <div className="portfolio-preview">
                <img
                    src="portfolio.png"
                    alt="Portfolio Preview"
                    className="portfolio-image"
                />
            </div>
            <div className="features-section">
                <h2>Why Choose Cardify for Your eCard?</h2>
                <ul className="features-list">
                    <li>Social media integration</li>
                    <li>Save contacts instantly</li>
                    <li>Easy sharing options</li>
                    <li>One-click call, text, and email</li>
                    <li>QR code support</li>
                    <li>No downloads needed</li>
                    <li>Display customer reviews</li>
                    <li>Customizable designs</li>
                    <li>Eco-friendly and paperless</li>
                    <li>Usage analytics</li>
                    <li>Secure data sharing</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
