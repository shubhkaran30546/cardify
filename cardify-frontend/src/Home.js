import React, { useEffect, useState, useRef } from 'react';
import Footer from './Footer';
import { useNavigate, useLocation } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { loadStripe } from '@stripe/stripe-js';
import {jwtDecode} from "jwt-decode";

// 1) Replace these with your real publishable key.
const stripePromise = loadStripe('pk_test_51R4pAYD8oruRmlHjNcig752oNyfhuwVtIm9smcVSjuAIyTl2XcWfHeCGwrUxw3pEBLDlNvD0gGE2AwduMq0IG7NQ00kPgWj0bJ');

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const videoRef = useRef(null);
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    // 2) Price ID map (for monthly/yearly)
    //    Replace these placeholders with your real Stripe price IDs:
    const priceIds = {
        individualMonthly: 'price_1R4qFGD8oruRmlHjPVvsbAGZ',
        individualYearly: 'price_1RP9yoD8oruRmlHjbPFVDloj',
        corporateMonthly:  'price_1R4qG0D8oruRmlHjOq2GNu0m',
        corporateYearly:   'price_1R4qSGD8oruRmlHjybN2PL0j',
    };
    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
        } catch (error) {
            return true; // Assume expired if there's an error
        }
    };

    // Create E-Card
    const handleCreate = () => {
        const token = localStorage.getItem('token');

        if (!token || isTokenExpired(token)) {
            localStorage.setItem("redirectAfterLogin", location.pathname);
            localStorage.removeItem('token'); // Clear token
            navigate("/login"); // Redirect to login/signup
        }
        navigate("/create-ecard");
    };
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleKeyDown = (e) => {
            e.preventDefault();
        };

        video.addEventListener('keydown', handleKeyDown);

        return () => {
            video.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    // Log In
    const login = () => {
        navigate("/login", { state: { from: location } });
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
        console.log("yearly price : " + priceIds.individualYearly );
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) {
            // If no token, redirect to login first
            navigate("/login", { state: { from: location, priceId } });
            return;
        }
        const response = await fetch('${BACKEND_BASE_URL}/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ priceId }),
        });
        if (response.status === 401) {
            // Token is invalid or expired — redirect to login
            navigate("/login", { state: { from: location, priceId } });
            return;
        }

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
                       <a
  href="#pricing"
  className="signup-button1"
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    padding: '0 2rem',
    fontSize: '1.2rem',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    lineHeight: 1,
  }}
>
  GET STARTED
</a>

                        <button className="login-button2" onClick={login}>LOG IN</button>
                    </section>
                </section>
                <div className="portfolio-preview anim">
                    <img src="Frame50.png" alt="Portfolio Preview" className="portfolio-image" />
                </div>
            </section>

            {/* FEATURES SECTION */}
            <div className="features-section anim" style={{ marginBottom: '2rem' }}>
  <h2 style={{ marginBottom: '2.5rem' }}>WHY CHOOSE US?</h2>
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: '2rem',
    flexWrap: 'wrap',
    maxWidth: 950,
    margin: '0 auto'
  }}>
    {[
      {
        title: "Hassle-free digital identity creation.",
        icon: "🌟"
      },
      {
        title: "E-portfolios without tech burden.",
        icon: "📁"
      },
      {
        title: "Scalable for teams & businesses.",
        icon: "👥"
      },
      {
        title: "Affordable, professional, and modern.",
        icon: "💸"
      }
    ].map((item, idx) => (
      <div
        key={idx}
        className="why-card"
        style={{
          flex: '1 1 200px',
          minWidth: 220,
          maxWidth: 270,
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 2px 12px rgba(44,62,80,0.08)',
          padding: '2.2rem 1.6rem 1.7rem 1.6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          transition: 'box-shadow 0.25s, transform 0.25s, border 0.25s',
          cursor: 'pointer',
          border: '2px solid transparent'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 6px 24px 0 rgba(231,76,60,0.15)';
          e.currentTarget.style.transform = 'translateY(-7px) scale(1.04)';
          e.currentTarget.style.border = '2px solid #e74c3c';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(44,62,80,0.08)';
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.border = '2px solid transparent';
        }}
      >
        <div style={{
          fontSize: '2.5rem',
          marginBottom: '1.1rem',
          userSelect: 'none'
        }}>{item.icon}</div>
        <div style={{
          fontWeight: 500,
          fontSize: '1.13rem',
          color: '#222'
        }}>{item.title}</div>
      </div>
    ))}
  </div>
</div>




            {/* PARTNER SECTION */}
            <div className="anim">
                <h2>WATCH HOW IT WORKS</h2>
                {/*<img className="video" src="Video1.png" alt="video" />*/}
                <video
                    ref={videoRef}
                    className="video"
                    src="clipping.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls={false} // disables default video controls
                    onContextMenu={e => e.preventDefault()} // disable right-click menu
                    onMouseDown={e => e.preventDefault()} // disable mouse down
                    onSelectStart={e => e.preventDefault()} // disable text selection
                    onDragStart={e => e.preventDefault()} // disable dragging
                    tabIndex={-1} // remove keyboard focus
                    style={{userSelect: 'none', pointerEvents: 'none'}} // prevent interaction
                />
            </div>

            {/* PRICING SECTION */}
            <div id="pricing" className="pricing-section anim">
                <h2 className="pricing-title">YOUR PRICING OPTIONS</h2>
                <p className="pricing-description">
                    Choose the perfect plan for your needs. Whether you're a freelancer, growing a business, or managing
                    a large team, our flexible pricing options offer the right features and scalability to help you
                    succeed.
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
