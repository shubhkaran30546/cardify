import React from "react";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css'
const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="admin">
            <h1>Admin Dashboard</h1>
            <button onClick={() => navigate("/admin/users")}>View Users</button>
            <button onClick={() => navigate("/admin/portfolios")}>View Portfolios</button>
        </div>
    );
};

export default AdminDashboard;
