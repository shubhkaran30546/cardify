import React, { useState } from "react";
import "./UsersList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Company_component({ companies }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();

    const handleViewCompany = async (companyName) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:8080/api/admin/company-users/${companyName}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const users = Array.isArray(response.data) ? response.data : [];
            setSelectedUsers(users);
            setSelectedCompany(companyName);
        } catch (error) {
            console.error("Error fetching users for company:", error);
            setSelectedUsers([]);
        }
    };

    return (
        <div className="admin-users">
            <h1 style={{ color: "black" }}>Company List</h1>
            <ul className="user-list">
                {companies.map((company, index) => (
                    <li key={index} className="user-item">
                        <div className="user-avatar">
                            <div className="default-avatar1">
                                {company[0] ? company[0].toUpperCase() : "?"}
                            </div>
                        </div>
                        <span className="user-name">{company.name || "Unnamed Company"}</span>
                        <button className="delete-user">DELETE</button>
                        <button className="delete-user" onClick={() => handleViewCompany(company)}>View Users</button>
                        <button className="delete-user"
                                onClick={() => navigate(`/admin/${company}/billing-info`)}>Billing
                        </button>
                    </li>
                ))}
            </ul>

            {selectedCompany && Array.isArray(selectedUsers) && (
                <>
                    <h2 style={{ color: "black" }}>Users in {selectedCompany}</h2>
                    <ul className="user-list">
                        {selectedUsers.map((user, idx) => (
                            <li key={user.userId || idx} className="user-item">
                                {/* render user card */}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Company_component;