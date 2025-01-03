import React from "react";
import './App.css';
const Navbar = () => {
    return (
        <nav>
            <ul className="navbar">
                <li><a href="/">Home</a></li>
                <li><a href="/Support">Support</a></li>
                <li><a href="/Pricing">Pricing</a></li>
                <li className="logo">
                    <img src="user.png" alt="Profile" className="profile-logo"/>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
