import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Leads.css";

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/contact/leads/${userId}`
                );
                setLeads(response.data);
            } catch (error) {
                console.error("Error fetching leads:", error);
            }
        };

        fetchLeads();
    }, [userId]);

    return (
        <div className="leads-container">
            {/* Header Section */}
            <div className="leads-header">
                {/*<div className="leads-date">MAR'24</div>*/}
                <h2 className="leads-title">Leads</h2>
                <div className="leads-actions">
                    <input
                        type="text"
                        placeholder="Search"
                        className="leads-search-input"
                    />
                    <button className="leads-add-button">+</button>
                </div>
            </div>

            {/* Table Section */}
            <table className="leads-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {leads.length > 0 ? (
                    leads.map((lead) => (
                        <tr key={lead.id}>
                            <td>{lead.leadId}</td>
                            <td>{lead.company}</td>
                            <td>{lead.email}</td>
                            <td>
                                {lead.firstName} {lead.lastName}
                            </td>
                            <td>{lead.phone}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No leads found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Leads;
