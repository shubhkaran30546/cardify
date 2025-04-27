import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css'

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        setIsAdmin(userRole === "ADMIN");
    }, []); // Only run once after component mounts

    return (
        <div className="admin">
            <h1>Admin Dashboard</h1>
            <button onClick={() => navigate("/admin/users")}>View Users</button>
            <button onClick={() => navigate("/admin/portfolios")}>View Portfolios</button>
            <button onClick={() => navigate("/admin/companies")}>View Companies</button>
        </div>
    );
};

export default AdminDashboard;
