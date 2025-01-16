import "./Portfolio.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";

const Portfolio = () => {
    return (
        <div className="app">
            {/* Header Section */}
            <header className="header">
                <div className="contact-links">
                    <img
                    src="user.png"
                    alt="User Profile"
                    className="profile-picture"
                />
                </div>
                <div className="main-intro">
                    <h1>Shubhkaran Dhillon</h1>
                    <h4>Software Engineer</h4>
                    <h4>shubh.karan30@gmail.com</h4>
                    <button className="latest-shots-button">Latest Shots</button>
                </div>
            </header>

            {/* Services Section */}
            <section className="services">
                <h2>Collaborate with brands and agencies to create impactful results.</h2>
                <div className="service-cards">
                    <div className="card">
                        <h3>UX & UI</h3>
                        <p>Designing interfaces that are intuitive, efficient, and enjoyable.</p>
                    </div>
                    <div className="card">
                        <h3>Web & Mobile App</h3>
                        <p>Transforming ideas into exceptional web and mobile experiences.</p>
                    </div>
                    <div className="card">
                        <h3>Design & Creative</h3>
                        <p>Crafting visually stunning designs that connect with your audience.</p>
                    </div>
                    <div className="card">
                        <h3>Development</h3>
                        <p>Bringing your vision to life with the latest technology and design trends.</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <h2>Tell me about your next project</h2>
                <div className="contact-buttons">
                    <button>Email Me</button>
                    <button>WhatsApp</button>
                </div>
            </section>

            {/* Footer */}
            <footer>© 2025 All rights reserved.</footer>
        </div>
    );
}
export default Portfolio;