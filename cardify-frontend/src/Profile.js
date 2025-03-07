import "./Profile.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [userName, setUserName] = useState(null);
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
        // 1️⃣ Extract token from URL if present
        const urlToken = searchParams.get("token");

        if (urlToken) {
            console.log("Token received from URL:", urlToken);
            localStorage.setItem("token", urlToken); // Save token to localStorage
            navigate(location.pathname, { replace: true }); // Remove token from URL
        }

        // 2️⃣ Check for token in localStorage
        const storedToken = localStorage.getItem("token");

        if (!storedToken || isTokenExpired(storedToken)) {
            localStorage.removeItem("token"); // Clear token
            localStorage.setItem("redirectAfterLogin", location.pathname);
            navigate("/login", { state: { from: location } }); // Redirect to login/signup
        }
    }, [navigate, searchParams, location]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserName(response.data.userName);

                // Check if portfolio exists
                const portfolioResponse = await axios.get(`http://localhost:8080/api/portfolio/get/${response.data.userName}`);
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
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="profile1">
                <section className="profile">
                    {userName && (
                        <>
                            <button>
                                <a href={`http://localhost:3000/portfolio/${userName}`} target="_blank"
                                   rel="noopener noreferrer">
                                    View Portfolio
                                </a>
                            </button>
                            <button onClick={() => navigate(`/edit-portfolio/${userName}`)}>
                                {portfolioExists ? "Edit Portfolio" : "Create Portfolio"}
                            </button>
                            <button><a href={`http://localhost:3000/api/leads/${userName}`} target="_blank"
                                       rel="noopener noreferrer">
                                View Leads
                            </a></button>
                            <button><a href={`http://localhost:3000/api/broadcast/${userName}`} target="_blank"
                                       rel="noopener noreferrer">
                                Send email
                            </a></button>
                        </>
                    )}
                </section>
                <div className="qrcode">
                    <section className="qrcode1">
                        <QRCodeSVG value={`http://localhost:3000/portfolio/${userName}`} size={200} />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Profile;
