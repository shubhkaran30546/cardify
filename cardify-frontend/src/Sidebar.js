import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Sidebar({ isAdmin, isOpen, toggleSidebar }) {
    const navigate = useNavigate();
    let userName = localStorage.getItem("userName");
    if (localStorage.getItem("role") === "admin") {
        isAdmin = true;
    }

    return (
        <>
            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>

                <button className="close-btn" onClick={toggleSidebar}>×</button>
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

            {/* Overlay for mobile */}
            {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
}

export default Sidebar;
