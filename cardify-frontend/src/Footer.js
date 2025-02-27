import React from 'react';
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo">
                    <img src="logo.png" alt="Cardify Logo" />
                </div>
                <div className="footer-social">
                    <a href="#"><FaYoutube /></a>
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaLinkedinIn /></a>
                </div>
            </div>
            <hr className="footer-divider" />
            <div className="footer-bottom">
                <p>Cardify © 2025. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/">HOME</a>
                    <a href="#support">SUPPORT</a>
                    <a href="#pricing">PRICING</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
