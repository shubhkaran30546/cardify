import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CompanyList.css';

const CompanyList = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState("");

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        setIsAdmin(userRole === "ADMIN");

        // Fetch companies on load
        fetch("http://localhost:8080/api/company")
            .then(res => res.json())
            .then(data => setCompanies(data))
            .catch(err => console.error("Error fetching companies", err));
    }, []);

    const handleAddCompany = async () => {
        if (!newCompany.trim()) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/api/company", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name: newCompany })
            });

            const responseText = await response.text();

            if (response.ok) {
                const created = JSON.parse(responseText);
                setCompanies([...companies, created]);
                setNewCompany("");
                alert("✅ Company added successfully!");
            } else {
                console.error("❌ Failed to add company:", response.status, responseText);
                alert(`Error ${response.status}: ${responseText}`);
            }
        } catch (err) {
            console.error("❌ Exception while adding company:", err);
            alert("An unexpected error occurred.");
        }
    };


    return (
        <div className="admin-company-list">
            <div className="admin-section">
                <h2>Companies</h2>

                <div className="add-company">
                    <input
                        type="text"
                        placeholder="Enter company name"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                    />
                    <button onClick={handleAddCompany} className="add-company1">Add Company</button>
                </div>

                <ul className="company-list">
                    {companies.map(company => (
                        <li key={company.id}>{company.name}</li>
                    ))}
                </ul>
            </div>

            <div className="admin-section">
                <h2>Corporate Features</h2>
                <button onClick={() => navigate("/admin/assign-user")} className="add-company1">Assign Users to Company</button>
                <button onClick={() => navigate("/admin/subscriptions")} className="add-company1">Manage Subscription Types</button>
            </div>
        </div>
    );
};

export default CompanyList;
