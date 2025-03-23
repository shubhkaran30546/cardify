import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Sidebar({isAdmin }) {
    const navigate = useNavigate();
    let userName = localStorage.getItem("userName");
    console.log("userName from localStorage: ", userName); // Add this line to log the userName
    if (localStorage.getItem("role") === "admin") {
        isAdmin = true;
    }

    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <nav>
                <ul>
                    <li><button className="sidebar-btn" onClick={() => navigate("/")}>Home</button></li>
                    <li><button className="sidebar-btn" onClick={() => navigate("/profile")}>Profile</button></li>
                    <li><button className="sidebar-btn" onClick={() => navigate(`/api/leads/${userName}`)}>Leads</button></li>
                    <li><button className="sidebar-btn" onClick={() => navigate(`/api/broadcast/${userName}`)}>Broadcast</button></li>
                    <li><button className="sidebar-btn" onClick={() => navigate("/billing")}>Manage Billing</button></li>
                    {isAdmin && <li><button className="sidebar-btn" onClick={() => navigate("/admin")}>Admin Dashboard</button></li>}
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
