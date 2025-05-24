import React, { useState } from "react";
import "./UsersList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Company_component({ companies }) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080';

    const deleteCompany = async (name) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BACKEND_BASE_URL}/api/company/delete/${name}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                alert("Successfully deleted!");
                window.location.reload(); // Optional: to refresh list
            }
        } catch (error) {
            console.error("Error deleting company:", error);
        }
    }

    const handleViewCompany = async (companyName) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BACKEND_BASE_URL}/api/admin/company-users/${companyName}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSelectedUsers(response.data);
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
                        <span className="user-name">{company.name || "Unnamed Company"}</span>
                        <button className="delete-user" onClick={() => deleteCompany(company.name)}>DELETE</button>
                        <button className="delete-user" onClick={() => handleViewCompany(company.name)}>View Users</button>
                        <button className="delete-user" onClick={() => navigate(`/admin/${company.name}/billing-info`)}>Billing</button>
                    </li>
                ))}
            </ul>

            {selectedCompany && Array.isArray(selectedUsers) && (
                <>
                    <h2 style={{ color: "black" }}>Users in {selectedCompany}</h2>
                    <ul className="user-list">
                        {selectedUsers.map((user, idx) => (
                            <li key={user.userId || idx} className="user-item">
                                <span className="user-name">{user.firstName} {user.lastName} ({user.email})</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Company_component;
