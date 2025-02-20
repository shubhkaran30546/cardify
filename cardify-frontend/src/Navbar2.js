import React from "react";
import './App.css';
import {useNavigate} from "react-router-dom";
const Navbar2 = ({ userId }) => {
    const navigate = useNavigate();
    // const handleOpenSignup = () => {
    //     navigate(`/portfolio/${userId}`);
    // };

    return (
        <nav>
            <ul className="navbar">
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
};

export default Navbar2;