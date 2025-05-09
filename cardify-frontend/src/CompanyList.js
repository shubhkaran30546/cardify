import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CompanyList.css';
import Company_component from "./Company_component";
const CompanyList = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState("");

    useEffect(() => {
        const userRole = localStorage.getItem("role");
        setIsAdmin(userRole === "ADMIN");
        const token = localStorage.getItem("token");
        // Fetch companies on load
        fetch("http://localhost:8080/api/company", {
            headers: {
                "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
            },})
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => {
                setCompanies(data);
                console.log("Fetched companies:", data); // Debug
            })
            .catch(err => console.error("❌ Error fetching companies:", err));
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
                    {companies.map((company, index) => (
                        <li key={company.id || index}>{company.name}</li>
                    ))}
                </ul>
            </div>

            <div className="admin-section">
                <h2>Corporate Features</h2>
                <button onClick={() => navigate("/admin/assign-user")} className="add-company1">Assign Users to Company</button>
                <button onClick={() => navigate("/admin/subscriptions")} className="add-company1">Manage Subscription Types</button>
            </div>
            {/* ✅ Pass the full company objects to the component */}
            <Company_component companies={companies} />

        </div>
    );
};

export default CompanyList;
