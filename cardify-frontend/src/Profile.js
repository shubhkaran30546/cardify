import "./Profile.css"
import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
function Profile() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
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
                    headers: { Authorization: `Bearer ${token}` }, // ✅ Send token
                });
                console.log("Profile response:", response.data); // Debugging
                setUserId(response.data.userId);
                console.log(response.data["lastName"]);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div><h1>Profile</h1>
    <div className="profile1">
            <section className="profile">
                {userId && (
                    <iframe src={`http://localhost:3000/portfolio/${userId}`} allowFullScreen loading="lazy"></iframe>
                )}

            </section>
            <div className="qrcode">
                <section className="qrcode1">
                    <QRCodeSVG value={`http://localhost.com/portfolio/${userId}`} size={200}/>

                </section></div>
            </div>
        </div>
            );
            }
            export default Profile;