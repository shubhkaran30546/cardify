import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UsersList.css";
import Footer from "./Footer";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token for authentication
                const response = await axios.get(`${BACKEND_BASE_URL}/api/admin/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Fetched Users:", response.data); // Debugging line
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);
    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${BACKEND_BASE_URL}/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUsers(users.filter(user => user.userId !== userId)); // Update state after deletion
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again.");
        }
    };
    const handleSetActive = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`${BACKEND_BASE_URL}/api/admin/users/${userId}/subscription/active`,
                { status: "active" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Optionally update user in state to reflect new status
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.userId === userId ? { ...user, subscriptionStatus: "active" } : user
                )
            );
            alert("User subscription set to active.");
        } catch (error) {
            console.error("Error setting subscription to active:", error);
            alert("Failed to set subscription. Please try again.");
        }
    };




    return (
        <div className="admin-users">
            <h1>Users List</h1>
            <button className="back-button1" onClick={() => navigate("/admin")}>Back to Dashboard</button>
            <ul className="user-list">
                {users.map((user, index) => (
                    <li key={user.userId ? `user-${user.userId}` : `index-${index}`} className="user-item">
                        <div className="user-avatar">
                            {user.profilePicture ? (
                                <img src={user.profilePicture} alt={user.username || "User"}/>
                            ) : (
                                <div className="default-avatar1">
                                    {user.username ? user.username[0].toUpperCase() : "U"}
                                </div>
                            )}
                        </div>
                        <span className="user-name">{user.firstName + " " + user.lastName + " | " || "New User"}</span>
                        <span className="user-email">{user.email}</span>
                        <span className="subscription-status">
        {user.subscriptionStatus || "No Status"}
    </span>
                        <button className="delete-user" onClick={() => handleDelete(user.userId)}>DELETE</button>
                        <button className="delete-user" onClick={() => handleSetActive(user.userId)}>
                            Set Active
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
