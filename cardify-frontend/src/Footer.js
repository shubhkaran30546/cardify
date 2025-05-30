import React from 'react';
import { FaYoutube, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import './Footer.css';
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const XIcon = ({ size = 22, color = "white", style = {} }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 1200 1227"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", ...style, verticalAlign: "middle" }}
        >
            <path
            d="M854.5 0H1108L698.5 524.5L1167 1227H807.5L525.5 812.5L203.5 1227H-55L388.5 661.5L-34 0H334L587.5 381.5L854.5 0ZM789 1105.5H885.5L282.5 114.5H180.5L789 1105.5Z"
            fill={color}
            />
        </svg>
        );


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
                <div className="footer-social" style={{ display: "flex", gap: "18px", alignItems: "center" }}>
                    {/* <a href="#"><FaYoutube /></a> */}
                    {/* <a href="#"><FaFacebookF /></a> */}
                    {/* <a href="#"><FaTwitter /></a> */}
                    {/* <a href="#" style={{ display: "flex", alignItems: "center" }}>
                        <XIcon size={18} color="white" />
                    </a> */}
                    {/* <a href="#"><FaInstagram /></a>? */}
                    <a href="#"><FaLinkedinIn /></a>
                </div>
            </div>
            <hr className="footer-divider" />
            <div className="footer-bottom">
                <p>Cardify © 2025. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/">HOME</a>
                    <a href="/support">SUPPORT</a>
                    <a onClick={() => handleNavigateHome("pricing")}>PRICING</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
