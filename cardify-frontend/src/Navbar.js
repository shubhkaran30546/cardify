import React from "react";
import './App.css';
import {useNavigate} from "react-router-dom";
const Navbar = ({ userId }) => {
    const navigate = useNavigate();
    // const handleOpenSignup = () => {
    //     navigate(`/portfolio/${userId}`);
    // };

    return (
        <nav>
            <ul className="navbar">
                <li><a href="/">Home</a></li>
                <li><a href="/support">Support</a></li>
                <li><a href="">Pricing</a></li>
                {/*<li className="logo">*/}
                {/*    <a><img onClick={handleOpenSignup} src="/portfolio.png" alt="Profile" className="profile-logo" /></a>*/}
                {/*</li>*/}
            </ul>
        </nav>
    );
};

export default Navbar;