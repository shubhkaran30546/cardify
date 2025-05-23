

import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./Sidebar.js";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

import "./Profile.css"; // Import separate CSS
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Footer from "./Footer";

function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [userName, setUserName] = useState(null);
    const [portfolioExists, setPortfolioExists] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const [visitData, setVisitData] = useState([]);
    const qrRef = useRef();
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    const handleShare = async () => {
        const canvas = document.getElementById("qrCanvas");
        if (!canvas) {
            console.error("Canvas not found");
            return;
        }

        canvas.toBlob(async (blob) => {
            if (!blob) {
                console.error("Failed to convert canvas to blob");
                return;
            }

            const file = new File([blob], "qr-code.png", { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: "My QR Code",
                        text: "Scan this QR code to connect with me!",
                        files: [file],
                    });
                } catch (err) {
                    if (err.name !== "AbortError") {
                        console.error("Sharing failed:", err);
                    }
                }
            } else {
                const url = URL.createObjectURL(blob);
                window.open(url, "_blank");
            }
        }, "image/png");
    };







    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };
    useEffect(() => {
        if (!userName) return;

        const fetchVisitAnalytics = async () => {
            try {
                const response = await axios.get(`${BACKEND_BASE_URL}/api/portfolio/visit/${userName}`);
                const formattedData = response.data.map(item => ({
                    date: item.visitDate,
                    visits: item.count
                }));
                setVisitData(formattedData);
            } catch (error) {
                console.error("Error fetching visit data", error);
            }
        };

        fetchVisitAnalytics();
    }, [userName]);



    useEffect(() => {
        const urlToken = searchParams.get("token");

        if (urlToken) {
            localStorage.setItem("token", urlToken);
            navigate(location.pathname, { replace: true });
        }

        const storedToken = localStorage.getItem("token");

        if (!storedToken || isTokenExpired(storedToken)) {
            // localStorage.removeItem("token");
            // localStorage.removeItem("role");
            localStorage.clear();
            localStorage.setItem("redirectAfterLogin", location.pathname);
            navigate("/login", { state: { from: location } });
        }

        const userRole = localStorage.getItem("role");
        setIsAdmin(userRole === "ADMIN");
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BACKEND_BASE_URL}/api/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserName(response.data.userName);
                localStorage.setItem("userName", response.data.userName);

                const portfolioResponse = await axios.get(`${BACKEND_BASE_URL}/api/portfolio/get/${response.data.userName}`);
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
        <div className="profile-container">
            {/* Hamburger icon for mobile */}



            {/* Main Content */}
            <div className="main-content">
                <div className="profile-header">
                    <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</button>
                    <Sidebar userName={userName} isAdmin={isAdmin} isOpen={isOpen} toggleSidebar={toggleSidebar}/>

                    <h1>Profile</h1>
                </div>
                <div className="profile-card">
                    {visitData.length > 0 && (
                        <div className="visit-graph">
                            <h3>Daily Visit Insights</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={visitData}>
                                    <XAxis dataKey="date"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Line type="monotone" dataKey="visits" stroke="#4caf50" strokeWidth={2}
                                          dot={{r: 4}}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
                <div className="profile-card">
                    {userName && (
                        <div className="button-group">
                            <a href={`http://localhost:3000/portfolio/${userName}`} target="_blank"
                               rel="noopener noreferrer"
                               className="profile-btn">View Portfolio</a>
                            <a href={`http://localhost:3000/create-ecard`} target="_blank" rel="noopener noreferrer"
                               className="profile-btn">
                                {portfolioExists ? "Edit Portfolio" : "Create Portfolio"}
                            </a>
                            <a href={`http://localhost:3000/api/leads/${userName}`} rel="noopener noreferrer"
                               className="profile-btn">View Leads</a>
                            <a href={`http://localhost:3000/api/broadcast/${userName}`} rel="noopener noreferrer"
                               className="profile-btn">Send Email</a>
                            {isAdmin && (
                                <a onClick={() => navigate("/admin")} className="admin-btn">
                                    View Admin Dashboard
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {/* QR Code Section */}
                <div className="qr-section">
                    <QRCodeCanvas
                        id="qrCanvas"
                        value={`http://localhost:3000/portfolio/${userName}`}
                        size={200}
                        className="qr-code"
                    />
                    <button onClick={handleShare} className="profile-btn">
                        Share QR Code
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Profile;
