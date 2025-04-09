import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ManageBilling.css'
function ManageBilling() {
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState(null);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        // Fetch the current subscription
        const fetchSubscription = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/get-subscription", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response.data);
                setSubscription(response.data);
            } catch (error) {
                console.error("Error fetching subscription:", error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch available plans
        const fetchPlans = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/get-plans");
                setPlans(response.data);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };

        fetchSubscription();
        fetchPlans();
    }, [token]);

    const handleChangePlan = async (newPriceId) => {
        try {
            await axios.post("http://localhost:8080/api/change-plan",
                { subscriptionId: subscription.id, newPriceId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Plan changed successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error changing plan:", error);
        }
    };

    const handleCancelSubscription = async () => {
        try {
            await axios.delete("http://localhost:8080/api/cancel-subscription", {
                data: { subscriptionId: subscription.id, userName },
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Subscription cancelled and portfolio deleted.");
            navigate("/profile");
        } catch (error) {
            console.error("Error cancelling subscription:", error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="manage-billing">
            <h1>Manage Billing</h1>
            {subscription ? (
                <>
                    <p>Current Plan: {subscription.planName}</p>
                    <h3>Change Plan</h3>
                    {plans.map((plan) => (
                        <button key={plan.id} onClick={() => handleChangePlan(plan.priceId)}>
                            Switch to {plan.name}
                        </button>
                    ))}
                    <br /><br />
                    <button onClick={handleCancelSubscription} style={{ color: "red" }}>
                        Cancel Subscription
                    </button>
                </>
            ) : (
                <p>No active subscription found.</p>
            )}
        </div>
    );
}

export default ManageBilling;
