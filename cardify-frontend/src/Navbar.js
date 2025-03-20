import React from "react";
import './App.css';
import { useNavigate } from "react-router-dom";

const Navbar = ({ userId }) => {
    const navigate = useNavigate();

    const handleNavigateHome = (section) => {
        navigate(`/?scrollTo=${section}`);
    };

    return (
        <nav>
            <ul className="navbar">
                <li>
                    <a href="/"><img className="logo" src="/logo.png" alt=""/></a>
                </li>
                <li>
                    <a onClick={() => handleNavigateHome("support")} className="nav1">SUPPORT</a>
                </li>
                <li>
                    <a onClick={() => handleNavigateHome("pricing")} className="nav1">PRICING</a>
                </li>
                <li>
                    <a href="/profile" className="account">MY ACCOUNT</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
