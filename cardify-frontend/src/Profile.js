import "./Profile.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Profile() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [portfolioExists, setPortfolioExists] = useState(false);

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
        } catch (error) {
            return true; // Assume expired if there's an error
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token || isTokenExpired(token)) {
            alert("Session expired. Please log in again.");
            localStorage.removeItem('token'); // Clear token
            navigate("/signup"); // Redirect to login/signup
        }
    }, [navigate]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserId(response.data.userId);

                // Check if portfolio exists
                const portfolioResponse = await axios.get(`http://localhost:8080/api/portfolio/get/${response.data.userId}`);
                if (portfolioResponse.status === 200) {
                    setPortfolioExists(true);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <div className="profile1">
                <section className="profile">
                    {userId && (
                        <>
                            <button>
                                <a href={`http://localhost:3000/portfolio/${userId}`} target="_blank" rel="noopener noreferrer">
                                    View Portfolio
                                </a>
                            </button>
                            <button onClick={() => navigate(`/edit-portfolio/${userId}`)}>
                                {portfolioExists ? "Edit Portfolio" : "Create Portfolio"}
                            </button>
                        </>
                    )}
                </section>
                <div className="qrcode">
                    <section className="qrcode1">
                        <QRCodeSVG value={`http://localhost:3000/portfolio/${userId}`} size={200} />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Profile;
