import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ManageBilling.css';
import Sidebar from "./Sidebar";

function ManageBilling() {
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState(null);
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const res = await fetch(`${BACKEND_BASE_URL}/api/get-subscription`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Failed to fetch subscription");
                const data = await res.json();
                setSubscription(data);
                console.log("subscription" + JSON.stringify(data));
            } catch (error) {
                console.error("Error fetching subscription:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPlans = async () => {
            try {
                const res = await fetch(`${BACKEND_BASE_URL}/api/get-plans`);
                if (!res.ok) throw new Error("Failed to fetch plans");
                const data = await res.json();
                setPlans(data);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };

        fetchSubscription();
        fetchPlans();
    }, [token]);


    const handleCancelSubscription = async () => {
        try {
            const res = await fetch(`${BACKEND_BASE_URL}/api/cancel-subscription`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ subscriptionId: subscription.id, userName })
            });

            if (!res.ok) {
                throw new Error("Failed to cancel subscription");
            }

            alert("Subscription cancelled and portfolio deleted.");
            navigate("/profile");
        } catch (error) {
            console.error("Error cancelling subscription:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="manage-billing">
            <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</button>
            <Sidebar userName={userName} isAdmin={isAdmin} isOpen={isOpen} toggleSidebar={toggleSidebar}/>
            <h1 className="billing-title">Manage Billing</h1>

            {subscription ? (
                <div className="subscription-card">
                    <h2>Current Plan</h2>
                    <div className="plan-details">
                        <p><strong>Plan Name:</strong> {subscription.planName}</p>
                        <p><strong>Amount:</strong> ${subscription.amount} {subscription.currency?.toUpperCase()}</p>
                        <p><strong>Billing Cycle:</strong> {subscription.interval}</p>
                    </div>

                    <button onClick={handleCancelSubscription} className="cancel-button">
                        Cancel Subscription
                    </button>
                </div>
            ) : (
                <p>No active subscription found.</p>
            )}
        </div>
    );
}

export default ManageBilling;