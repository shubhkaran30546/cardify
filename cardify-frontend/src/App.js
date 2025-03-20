import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import {useEffect} from "react";
import Home from './Home';
import Navbar from "./Navbar";
import Signup from "./Signup";
import SignupForm from "./Email_signup";
import Login from "./Login";
import Portfolio from "./Portfolio"
import SlidingForm from "./Form";
import Profile from "./Profile";
import Navbar2 from "./Navbar2";
import Leads from "./Leads";
import BroadcastEmail from "./BroadcastEmail";
import Support from "./Support";
import Portfolio1 from "./Portfolio1"
import ForgotPassword from "./ForgotPassword";
import AdminDashboard from "./AdminDashboard";
import UsersList from "./UsersList";
import PortfoliosList from "./PortfoliosList";
import ResetPassword from "./ResetPassword";
function App() {
    return (
        <Router>
            <MainApp />
        </Router>
    );
}

function MainApp() {
    const location = useLocation();
    const isAdmin = localStorage.getItem("role") === "ADMIN";
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const scrollTo = params.get("scrollTo");

        if (scrollTo) {
            const section = document.getElementById(scrollTo);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);
    return (
        <div className="App">
            {/* Conditionally render different Navbars */}
            {location.pathname.startsWith("/portfolio") ? <Navbar2 /> : <Navbar />}
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/email-signup" element={<SignupForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-ecard" element={<SlidingForm />} />
                <Route path="/portfolio/:userId" element={<Portfolio />} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/edit-portfolio/:userId" element={<SlidingForm />} />
                <Route path="/api/leads/:userId" element={<Leads/>}/>
                <Route path="/api/broadcast/:userId" element={<BroadcastEmail/>}/>
                <Route path="/support" element={<Support/>}/>
                <Route path="/port1" element={<Portfolio1/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/profile" />} />
                <Route path="/admin/users" element={isAdmin ? <UsersList /> : <Navigate to="/profile" />} />
                <Route path="/admin/portfolios" element={isAdmin ? <PortfoliosList /> : <Navigate to="/profile" />} />
            </Routes>
        </div>
    );
}

export default App;