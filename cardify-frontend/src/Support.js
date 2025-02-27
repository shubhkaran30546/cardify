import React, { useState } from 'react';
import "./Support.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
const Support = ()=> {
    return (
        <div className="support">
            <div className="support-container">
                <h2>Get In Touch</h2>
                <p>
                    Fill in the form below and someone from our customer service will get back to you within 24
                    hours.</p>
                <form type="submit" className="support-form">
                    <label> First Name</label>
                    <input placeholder="First Name"/>
                    <label> Last Name</label>
                    <input placeholder="Last Name"/>
                    <label>Email</label>
                    <input placeholder="Email"/>
                    <label>Message</label>
                    <input placeholder="Message"/>
                </form>
                <div className="support-send">
                <button className="support-button1">Send</button></div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
}
export default Support;