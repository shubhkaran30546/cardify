import React from "react";
import './App.css';
import {useNavigate} from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const handleOpenSignup = () => {
        navigate("/signup");
    };
    return (
        <nav>
            <ul className="navbar">
                <li><a href="/">Home</a></li>
                <li><a href="/support">Support</a></li>
                <li><a href="/Pricing">Pricing</a></li>
                <li className="logo">
                    <a href= "/Profile"><img onClick={handleOpenSignup} src="user.png" alt="Profile" className="profile-logo"/></a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
