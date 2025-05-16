import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("Confirming your subscription...");
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const confirmSubscription = async () => {
            if (!sessionId) {
                setMessage("No session ID found in URL.");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/confirm-subscription?session_id=${sessionId}`
                );
                setMessage("✅ Subscription confirmed! Redirecting...");
                setTimeout(() => navigate("/create-ecard"), 2000); // or wherever you want
            } catch (error) {
                console.error(error);
                setMessage("❌ Failed to confirm subscription. Please contact support.");
            }
        };

        confirmSubscription();
    }, [sessionId, navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <h2>{message}</h2>
        </div>
    );
};

export default PaymentSuccess;
