import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PortfoliosList.css"; // Create a CSS file for styling
import Footer from "./Footer";

const PortfoliosList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token for authentication
                if (!token) {
                    alert("No token found. Please log in first.");
                    navigate("/login");
                    return;
                }
                const response = await axios.get("http://localhost:8080/api/admin/portfolios", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Fetched Portfolios:", response.data); // Debugging line
                setPortfolios(response.data);
            } catch (error) {
                console.error("Error fetching portfolios:", error);
                if (error.response && error.response.status === 401) {
                    console.warn("Token expired or unauthorized. Redirecting to login.");
                    localStorage.removeItem("token"); // Remove invalid token
                    localStorage.removeItem("role");
                    navigate("/login"); // Redirect to login page
                }
            }
        };

        fetchPortfolios();
    }, []);

    const handleDelete = async (portfolioId) => {
        if (!window.confirm("Are you sure you want to delete this portfolio?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/admin/portfolios/${portfolioId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Remove deleted portfolio from the state
            setPortfolios(portfolios.filter(portfolio => portfolio.portfolioId !== portfolioId));
            alert("Portfolio deleted successfully.");
        } catch (error) {
            console.error("Error deleting portfolio:", error);
            alert("Failed to delete portfolio.");
        }
    };

    return (
        <div className="admin-portfolios">
            <h1>Portfolios List</h1>
            <button className="back-button1" onClick={() => navigate("/admin")}>Back to Dashboard</button>
            <ul className="portfolio-list">
                {portfolios.map((portfolio, index) => (
                    <li key={portfolio.portfolioId ? `portfolio-${portfolio.portfolioId}` : `index-${index}`}
                        className="portfolio-item"
                        style={{ cursor: "pointer" }}
                    >
                        <div className="portfolio-avatar" onClick={() => window.open(`/portfolio/${portfolio.username}`, "_blank")}>
                            {portfolio.imageData ? (
                                <img
                                    src={`data:image/png;base64,${portfolio.imageData}`}
                                    alt="Profile"
                                    className="portfolio-avatar"
                                    onError={(e) => console.error("Image Load Error:", e)}
                                />
                            ) : (
                                <div className="default-avatar">
                                    {portfolio.username ? portfolio.username[0].toUpperCase() : "P"}
                                </div>
                            )}
                        </div>
                        <div className="portfolio-details" onClick={() => window.open(`/portfolio/${portfolio.username}`, "_blank")}>
                            <span className="portfolio-name">{portfolio.firstName + " " + portfolio.lastName}</span>
                            <span className="portfolio-owner">{portfolio.title}</span>
                            <span className="portfolio-email">{portfolio.email}</span>
                        </div>
                        <button className="delete-button" onClick={() => handleDelete(portfolio.portfolioId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PortfoliosList;
