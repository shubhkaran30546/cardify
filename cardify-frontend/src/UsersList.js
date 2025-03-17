import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UsersList.css";
import Footer from "./Footer";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token for authentication
                const response = await axios.get("http://localhost:8080/api/admin/users", {
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


    return (
        <div className="admin-users">
            <h1>Users List</h1>
            <button className="back-button1" onClick={() => navigate("/admin")}>Back to Dashboard</button>
            <ul className="user-list">
                {users.map((user, index) => (
                    <li key={user.id ? `user-${user.id}` : `index-${index}`} className="user-item">
                        <div className="user-avatar">
                            {user.profilePicture ? (
                                <img src={user.profilePicture} alt={user.username || "User"}/>
                            ) : (
                                <div className="default-avatar">
                                    {user.username ? user.username[0].toUpperCase() : "U"}
                                </div>
                            )}
                        </div>
                        <span className="user-name">{user.firstName + " " +  user.lastName|| "New User"}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
