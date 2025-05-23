import React, { useEffect, useState } from "react";
import "./Assign.css"
const AssignUserToCompany = () => {
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`${BACKEND_BASE_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Users fetched:", data); // 👈 Logs the user data
                setUsers(data);
            })

        fetch(`${BACKEND_BASE_URL}/api/company`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Users fetched:", data); // 👈 Logs the user data
                setCompanies(data);
            })
    }, []);

    const handleAssign = async () => {
        if (!selectedUser || !selectedCompany) return;

        const token = localStorage.getItem("token");

        const res = await fetch(
            `${BACKEND_BASE_URL}/api/company/${selectedCompany}/assign-user?userId=${selectedUser}&subscriptionType=CORPORATE`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (res.ok) {
            alert("✅ User assigned successfully!");
        } else {
            alert("❌ Failed to assign user");
        }
    };

    return (
        <div className="admin-section">
            <h2>Assign User to Company</h2>

            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user.userId} value={user.userId}>{user.email}</option>
                ))}
            </select>

            <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                <option value="">Select Company</option>
                {companies.map(company => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                ))}
            </select>

            <button onClick={handleAssign} className="submit2">Assign</button>
        </div>
    );
};

export default AssignUserToCompany;
