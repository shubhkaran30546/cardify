import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CompanyBilling.css";
import {useParams} from "react-router-dom"; // External CSS file

const CompanyBilling = () => {
    const { company: companyName } = useParams();
    const [userCount, setUserCount] = useState(0);
    const [billingAmount, setBillingAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080';
    const COST_PER_USER = 500; // ₹500 per user/month

    useEffect(() => {
        const fetchCompanyUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${BACKEND_BASE_URL}/api/admin/company-users/${companyName}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const users = Array.isArray(response.data) ? response.data : [];
                setUserCount(users.length);
                setBillingAmount(users.length * COST_PER_USER);
            } catch (error) {
                console.error("Error fetching users for company:", error);
                setUserCount(0);
                setBillingAmount(0);
            } finally {
                setLoading(false);
            }
        };

        if (companyName) {
            fetchCompanyUsers();
        }
    }, [companyName]);

    if (loading) return <div className="billing-container">Loading billing information...</div>;

    return (
        <div className="billing-container">
            <div className="billing-card">
                <h2>Billing Summary</h2>
                <div className="billing-row">
                    <span className="label">Company:</span>
                    <span className="value">{companyName}</span>
                </div>
                <div className="billing-row">
                    <span className="label">Number of Users:</span>
                    <span className="value">{userCount}</span>
                </div>
                <div className="billing-row">
                    <span className="label">Subscription Cost:</span>
                    <span className="value">${COST_PER_USER} / user / month</span>
                </div>
                <div className="billing-total">
                    <span>Total Due This Month:</span>
                    <strong>${billingAmount}</strong>
                </div>
            </div>
        </div>
    );
};

export default CompanyBilling;