import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { useNavigate, useLocation } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { loadStripe } from '@stripe/stripe-js';

// 1) Replace these with your real publishable key.
const stripePromise = loadStripe('pk_test_51R4pAYD8oruRmlHjNcig752oNyfhuwVtIm9smcVSjuAIyTl2XcWfHeCGwrUxw3pEBLDlNvD0gGE2AwduMq0IG7NQ00kPgWj0bJ');

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 2) Price ID map (for monthly/yearly)
    //    Replace these placeholders with your real Stripe price IDs:
    const priceIds = {
        individualMonthly: 'price_1R4qFGD8oruRmlHjPVvsbAGZ',
        individualYearly: 'price_1R4qRxD8oruRmlHjtY5k2Vrl',
        corporateMonthly:  'price_1R4qG0D8oruRmlHjOq2GNu0m',
        corporateYearly:   'price_1R4qSGD8oruRmlHjybN2PL0j',
    };

    // Create E-Card
    const handleCreate = () => {
        navigate("/create-ecard");
    };

    // Log In
    const login = () => {
        navigate("/login", { state: { from: location } });
    };

    // Support
    const support = () => {
        window.scrollTo(0, 0);
        navigate("/support");
    };

    // 3) Toggle between monthly & yearly
    const [isYearly, setIsYearly] = useState(true);

    // 4) Plans array
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
            monthlyPrice: "Contact Us",
            yearlyPrice: "Contact Us",
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

    // 5) Stripe Checkout handler function
    const handleCheckout = async (priceId) => {
        const stripe = await stripePromise;

        const response = await fetch('http://localhost:8080/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ priceId }),
        });

        const session = await response.json();

        if (session.url) {
            window.location.href = session.url; // redirect to Stripe Checkout
        } else {
            console.error('Failed to create session:', session);
        }
    };

    // 6) Intersection Observer (animations)
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

    // Helper to get the correct price ID
    const getPriceId = (planName, isYearly) => {
        if (planName === "Individual") {
            return isYearly
                ? priceIds.individualYearly
                : priceIds.individualMonthly;
        } else if (planName === "Corporate") {
            return isYearly
                ? priceIds.corporateYearly
                : priceIds.corporateMonthly;
        }
        return null; // For "Custom Solution" or unknown plan
    };

    return (
        <div className="homepage-main">
            {/* INTRO SECTION */}
            <section className="intro">
                <section className="intro1">
                    <h1 className="motto anim">The Smarter Way to Share Who You Are.</h1>
                    <p className="para anim">
                        Cardify is a modern digital business card and CRM platform designed to help professionals and
                        businesses network smarter. Create a personalized portfolio website, share your contact details
                        with a simple QR code, and manage your leads effortlessly—all in one place.
                    </p>
                    <section className="buttons">
                        <button className="signup-button" onClick={handleCreate}>GET STARTED</button>
                        <button className="login-button" onClick={login}>LOG IN</button>
                    </section>
                </section>
                <div className="portfolio-preview anim">
                    <img src="Picture1.png" alt="Portfolio Preview" className="portfolio-image" />
                </div>
            </section>

            {/* FEATURES SECTION */}
            <div className="features-section anim">
                <h2>WHY CHOOSE US?</h2>
                <div className="scroll-container">
                    <div className="scroll-row row1">
                        <ul className="features-list">
                            <li>Social media integration</li>
                            <li>Save contacts instantly</li>
                            <li>Easy sharing options</li>
                            <li>One-click call, text, and email</li>
                            <li>QR code support</li>
                            <li>Social media integration</li>
                            <li>Save contacts instantly</li>
                            <li>Easy sharing options</li>
                            <li>One-click call, text, and email</li>
                            <li>QR code support</li>
                        </ul>
                    </div>
                    <div className="scroll-row row2">
                        <ul className="features-list">
                            <li>No downloads needed</li>
                            <li>Display customer reviews</li>
                            <li>Customizable designs</li>
                            <li>Eco-friendly and paperless</li>
                            <li>Usage analytics</li>
                            <li>No downloads needed</li>
                            <li>Display customer reviews</li>
                            <li>Customizable designs</li>
                            <li>Eco-friendly and paperless</li>
                            <li>Usage analytics</li>
                        </ul>
                    </div>
                    <div className="scroll-row row3">
                        <ul className="features-list">
                            <li>Secure data sharing</li>
                            <li>Fast contact exchange</li>
                            <li>Real-time updates</li>
                            <li>Cross-platform support</li>
                            <li>Easy to use</li>
                            <li>Secure data sharing</li>
                            <li>Fast contact exchange</li>
                            <li>Real-time updates</li>
                            <li>Cross-platform support</li>
                            <li>Easy to use</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* PARTNER SECTION */}
            <div className="anim">
                <h2>YOUR PARTNER</h2>
                <img className="video" src="Video1.png" alt="video" />
            </div>

            {/* PRICING SECTION */}
            <div id="pricing" className="pricing-section anim">
                <h2 className="pricing-title">YOUR PRICING OPTIONS</h2>
                <p className="pricing-description">
                    Choose the perfect plan for your needs. Whether you're a freelancer, growing a business, or managing
                    a large team, our flexible pricing options offer the right features and scalability to help you succeed.
                </p>

                <div className="toggle-switch">
                    <span className="discount-badge">20% OFF</span>
                    <span>Yearly</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={!isYearly}
                            onChange={() => setIsYearly(!isYearly)}
                        />
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
                                {plan.monthlyPrice === "Contact Us" ? (
                                    <span className="new-price">Contact Us</span>
                                ) : (
                                    <>
                                        {/* If the Yearly plan is selected, show the discounted price */}
                                        {isYearly ? (
                                            <>
                    <span className="original-price">
                        ${plan.yearlyPrice} {/* Original Price */}
                    </span>
                                                <span className="discounted-price">
                        ${(plan.yearlyPrice * 0.8).toFixed(2)} {/* 20% off */}
                    </span>
                                            </>
                                        ) : (
                                            <span className="new-price">${plan.monthlyPrice}</span>
                                        )}
                                    </>
                                )}
                            </p>

                            <button
                                className="get-started-btn"
                                onClick={() => {
                                    if (plan.monthlyPrice === "Contact Us") {
                                        // Navigate to a contact page
                                        navigate("/support");
                                    } else {
                                        // Determine correct price ID for monthly or yearly
                                        const priceId = getPriceId(plan.name, isYearly);
                                        if (!priceId) {
                                            console.error("No price ID found for plan:", plan.name);
                                            return;
                                        }
                                        handleCheckout(priceId);
                                    }
                                }}
                            >
                                Get Started
                            </button>
                            <ul className="feature-list">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>✔ {feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Home;