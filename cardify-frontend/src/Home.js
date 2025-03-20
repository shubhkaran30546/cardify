import React from 'react';
import Footer from './Footer';
import {useNavigate, useLocation} from "react-router-dom";
import {useEffect} from "react";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {useState} from "react";



const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleCreate = () => {
        navigate("/create-ecard");
    };
    const login = () => {
        navigate("/login", { state: { from: location } });
    };
    const support =()=> {
        window.scrollTo(0, 0);
        navigate("/support");
    }
    const [isYearly, setIsYearly] = useState(true);

    const plans = [
        {
            name: "Individual",
            monthlyPrice: 20,
            yearlyPrice: 15,
            features: [
                "Personalized digital business card",
                "QR code for easy sharing",
                "Basic analytics & insights",
                "Social media integration",
                "Email & phone contact support",
                "Custom profile picture & branding",
                "Basic contact management",
                "Mobile-friendly design",
                "Up to 100 profile views per month",
                "Access to standard templates",
            ],
        },
        {
            name: "Corporate",
            monthlyPrice: 50,
            yearlyPrice: 40,
            features: [
                "All Individual Plan features",
                "Multi-user team access",
                "Advanced analytics & lead tracking",
                "CRM integration",
                "Custom branding options",
                "Team collaboration tools",
                "Unlimited profile views",
                "Priority customer support",
                "Export contacts to CSV",
                "Integration with Google & Apple Pay",
                "Custom domain support",
                "Access to premium templates",
                "Email & SMS marketing tools",
            ],
            mostPopular: true,
        },
        {
            name: "Custom Solution",
            monthlyPrice: "Contact Us",
            yearlyPrice: "Contact Us",
            features: [
                "Fully tailored website & CRM solution",
                "Dedicated account manager",
                "API integrations & automation",
                "Enterprise security & compliance",
                "24/7 priority support",
                "Custom-designed digital cards & themes",
                "Unlimited storage for media & documents",
                "Role-based access control (RBAC)",
                "Automated workflows & triggers",
                "Single sign-on (SSO) integration",
                "Onboarding & training for teams",
                "Custom dashboard & reports",
                "Scalability for large enterprises",
            ],
        },
    ];

    useEffect(() => {
        const elements = document.querySelectorAll(".anim");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.3 });

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);


    return (
        <div className="homepage-main">
            <section className="intro">
                <section className="intro1">
                    <h1 className="motto anim">The Smarter Way to Share Who You Are.</h1>
                    <p className="para anim">Cardify is a modern digital business card and CRM platform designed to help professionals and
                        businesses network smarter. Create a personalized portfolio website, share your contact details
                        with a simple QR code, and manage your leads effortlessly—all in one place.</p>
                    {/*<button className="create-ecard-button" onClick={handleCreate}>*/}
                    {/*    Create your eCard*/}
                    {/*</button>*/}
                    <section className="buttons">
                        <button className="signup-button" onClick={handleCreate}>GET STARTED</button>
                        <button className="login-button" onClick={login}>LOG IN</button>
                </section>
                </section>
                <div className="portfolio-preview anim">
                    <img src="Picture1.png"
                         alt="Portfolio Preview"
                         className="portfolio-image"/>
                </div>
            </section>
            <div className="features-section anim">
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
                            {/* Duplicate items for continuous scrolling */}
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
                            {/* Duplicate items for continuous scrolling */}
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
                            {/* Duplicate items for continuous scrolling */}
                            <li>Secure data sharing</li>
                            <li>Fast contact exchange</li>
                            <li>Real-time updates</li>
                            <li>Cross-platform support</li>
                            <li>Easy to use</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="anim">
                <h2>YOUR PARTNER</h2>
                <img className="video" src="Video1.png" alt="video"/>
            </div>
            <div id="pricing" className="pricing-section anim">
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
                                {/*<span*/}
                                {/*    className="old-price">${isYearly ? plan.monthlyPrice : plan.monthlyPrice + 10}</span>*/}
                                <span className="new-price">${isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                            </p>
                            {/*<p className="price-detail">${isYearly ? plan.yearlyPrice : plan.monthlyPrice} USD per*/}
                            {/*    month, paid annually</p>*/}
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
            <div id="support" className="support-section anim">
                <div className="support-content">
                    <h2 className="support-title">NEED SUPPORT?</h2>
                    <p className="support-description">
                        We’re here to help! If you have any questions, feel free to reach out, and our team will assist
                        you promptly.
                    </p>
                </div>
                <div className="support-button">
                    <button className="contact-btn" onClick={support}>CONTACT US</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;