import React from 'react';
import {useNavigate} from "react-router-dom";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {useState} from "react";

const Home = () => {
    const navigate = useNavigate();
    const handleCreate = () => {
        navigate("/create-ecard");
    };
    const [isYearly, setIsYearly] = useState(true);

    const plans = [
        {
            name: "Freelancer",
            monthlyPrice: 35,
            yearlyPrice: 25,
            features: ["Feature Eleven", "Feature Twelve", "Feature Thirteen", "Feature Fourteen", "Feature Fifteen"],
        },
        {
            name: "Professional",
            monthlyPrice: 65,
            yearlyPrice: 55,
            features: [
                "Feature Eleven",
                "Feature Twelve",
                "Feature Thirteen",
                "Feature Fourteen",
                "Feature Fifteen",
                "Feature Sixteen",
                "Feature Seventeen",
                "Feature Eighteen",
            ],
            mostPopular: true,
        },
        {
            name: "Agency",
            monthlyPrice: 125,
            yearlyPrice: 95,
            features: [
                "Feature Eleven",
                "Feature Twelve",
                "Feature Thirteen",
                "Feature Fourteen",
                "Feature Fifteen",
                "Feature Sixteen",
                "Feature Seventeen",
                "Feature Eighteen",
                "Feature Nineteen",
                "Feature Twenty",
                "Feature Thirty",
                "Feature Forty",
            ],
        },
    ];
    return (
        <div className="homepage-main">
            <section className="intro">
                <section className="intro1">
                    <h1 className="motto">The Smarter Way to Share Who You Are.</h1>
                    <p>Cardify is a modern digital business card and CRM platform designed to help professionals and
                        businesses network smarter. Create a personalized portfolio website, share your contact details
                        with a simple QR code, and manage your leads effortlessly—all in one place.</p>
                    {/*<button className="create-ecard-button" onClick={handleCreate}>*/}
                    {/*    Create your eCard*/}
                    {/*</button>*/}
                    <section className="buttons">
                        <button className="signup-button" onClick={handleCreate}>GET STARTED</button>
                        <button className="login-button">LOG IN</button>
                    </section>
                </section>
                <div className="portfolio-preview">
                    <img src="Picture1.png"
                         alt="Portfolio Preview"
                         className="portfolio-image"/>
                </div>
            </section>
            <div className="features-section">
                <h2>WHY CHOOSE US?</h2>
                <div className="scroll-container">
                    {/* Row 1 */}
                    <div className="scroll-row row1">
                        <ul className="features-list">
                            <li>Social media integration</li>
                            <li>Save contacts instantly</li>
                            <li>Easy sharing options</li>
                            <li>One-click call, text, and email</li>
                            <li>QR code support</li>
                        </ul>
                    </div>

                    {/* Row 2 */}
                    <div className="scroll-row row2">
                        <ul className="features-list">
                            <li>No downloads needed</li>
                            <li>Display customer reviews</li>
                            <li>Customizable designs</li>
                            <li>Eco-friendly and paperless</li>
                            <li>Usage analytics</li>
                        </ul>
                    </div>

                    {/* Row 3 */}
                    <div className="scroll-row row3">
                        <ul className="features-list">
                            <li>Secure data sharing</li>
                            <li>Fast contact exchange</li>
                            <li>Real-time updates</li>
                            <li>Cross-platform support</li>
                            <li>Easy to use</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <h2>YOUR PARTNER</h2>
                <img className="video" src="Video1.png" alt="video"/>
            </div>
            <div className="pricing-section">
                <h2 className="pricing-title">YOUR PRICING OPTIONS</h2>
                <p className="pricing-description">
                    Choose the perfect plan for your needs. Whether you're a freelancer, growing a business, or managing
                    a large team,
                    our flexible pricing options offer the right features and scalability to help you succeed.
                </p>

                <div className="toggle-switch">
                    <span className="discount-badge">20% OFF</span>
                    <span>Yearly</span>
                    <label className="switch">
                        <input type="checkbox" checked={!isYearly} onChange={() => setIsYearly(!isYearly)}/>
                        <span className="slider"></span>
                    </label>
                    <span>Monthly</span>
                </div>

                <div className="pricing-cards">
                    {plans.map((plan, index) => (
                        <div key={index} className={`pricing-card ${plan.mostPopular ? "most-popular" : ""}`}>
                            {plan.mostPopular && <div className="popular-badge">Most Popular</div>}
                            <h3>{plan.name}</h3>
                            <p className="plan-price">
                                <span
                                    className="old-price">${isYearly ? plan.monthlyPrice : plan.monthlyPrice + 10}</span>
                                <span className="new-price">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                            </p>
                            <p className="price-detail">${isYearly ? plan.yearlyPrice : plan.monthlyPrice} USD per
                                month, paid annually</p>
                            <button className="get-started-btn">Get Started</button>
                            <ul className="feature-list">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>✔ {feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="support-section">
                <div className="support-content">
                    <h2 className="support-title">NEED SUPPORT?</h2>
                    <p className="support-description">
                        We’re here to help! If you have any questions, feel free to reach out, and our team will assist
                        you promptly.
                    </p>
                </div>
                <div className="support-button">
                    <button className="contact-btn">CONTACT US</button>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-logo">
                        <img src="logo.png" alt="Cardify Logo"/>
                    </div>
                    <div className="footer-social">
                        <a href="#"><FaYoutube/></a>
                        <a href="#"><FaFacebookF/></a>
                        <a href="#"><FaTwitter/></a>
                        <a href="#"><FaInstagram/></a>
                        <a href="#"><FaLinkedinIn/></a>
                    </div>
                </div>

                <hr className="footer-divider"/>

                <div className="footer-bottom">
                    <p>Cardify © 2025. All rights reserved.</p>
                    <div className="footer-links">
                        <a href="#">HOME</a>
                        <a href="#">SUPPORT</a>
                        <a href="#">PRICING</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;