import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Confirming your subscription...");
    const [userData, setUserData] = useState(null);
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const confirmSubscription = async () => {
            if (!sessionId) {
                setMessage("❌ No session ID found in URL.");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/confirm-subscription?session_id=${sessionId}`
                );

                const { username, email, planName, subscriptionId } = response.data;

                setUserData({ username, email, planName, subscriptionId });
                setMessage(`✅ Subscription confirmed for ${username}! Redirecting...`);

                setTimeout(() => navigate("/create-ecard"), 3000);
            } catch (error) {
                console.error("Error confirming subscription:", error);
                setMessage("❌ Failed to confirm subscription. Please contact support.");
            }
        };

        confirmSubscription();
    }, [sessionId, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <h2>{message}</h2>

            {userData && (
                <div style={{ marginTop: "2rem", textAlign: "left", display: "inline-block" }}>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Plan:</strong> {userData.planName}</p>
                    <p><strong>Subscription ID:</strong> {userData.subscriptionId}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
