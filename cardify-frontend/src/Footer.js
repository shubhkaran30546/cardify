import React from 'react';
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import './Footer.css';
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const handleNavigateHome = (section) => {
        navigate(`/?scrollTo=${section}`);
    };
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
                    <a onClick={() => handleNavigateHome("support")}>SUPPORT</a>
                    <a onClick={() => handleNavigateHome("pricing")}>PRICING</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
