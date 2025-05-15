import React, { useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, matchPath } from "react-router-dom";
import Home from './Home';
import Navbar from "./Navbar";
import SignupForm from "./Email_signup";
import Login from "./Login";
import SlidingForm from "./Form";
import Profile from "./Profile";
import Navbar2 from "./Navbar2";
import Leads from "./Leads";
import BroadcastEmail from "./BroadcastEmail";
import Support from "./Support";
import Portfolio1 from "./Portfolio1";
import ForgotPassword from "./ForgotPassword";
import AdminDashboard from "./AdminDashboard";
import UsersList from "./UsersList";
import PortfoliosList from "./PortfoliosList";
import ResetPassword from "./ResetPassword";
import Sidebar from "./Sidebar"; // Import Sidebar
import ManageBilling from "./ManageBilling";
import CompanyBilling from "./CompanyBilling";
import CompanyList from "./CompanyList";
import AssignUserToCompany from "./AssignUserToCompany";
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

    // ✅ Define paths where the Sidebar should be visible
    const sidebarRoutes = [
        "/profile",
        "/api/leads/",
        "/api/broadcast/",
        "/billing",
        "/admin",
        "/admin/users",
        "/admin/portfolios"
    ];
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    // ✅ Check if current path starts with any sidebar route
    const showSidebar = sidebarRoutes.some(route => location.pathname.startsWith(route));

    // ✅ Define paths where the Navbar should not be visible (like Portfolio1)
    const hideNavbarRoutes = ["/port1"];

    // ✅ Use `matchPath` to check if the current path matches `/portfolio/:userId`
    const showNavbar = !(
        hideNavbarRoutes.some(route => matchPath(route, location.pathname)) ||
        matchPath("/portfolio/:userId", location.pathname)
    );

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
            {/* ✅ Conditionally Render Navbar (Hide on Portfolio1) */}
            {showNavbar && !showSidebar && <Navbar />}

            {/*<div className="dashboard-layout">*/}
                {/* ✅ Sidebar only appears when `showSidebar` is true */}
            {showSidebar && (
                <>
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}
                </>
            )}

                {/* ✅ Main Content (Shifts Right When Sidebar is Present) */}
                <div className={showSidebar ? "main-content1" : ""}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/create-ecard" element={<SlidingForm />} />
                        <Route path="/portfolio/:userId" element={<Portfolio1 />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/edit-portfolio/:userId" element={<SlidingForm />} />
                        <Route path="/api/leads/:userId" element={<Leads />} />
                        <Route path="/api/broadcast/:userId" element={<BroadcastEmail />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/billing" element={<ManageBilling />} />
                        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/profile" />} />
                        <Route path="/admin/users" element={isAdmin ? <UsersList /> : <Navigate to="/profile" />} />
                        <Route path="/admin/companies" element={isAdmin ? <CompanyList /> : <Navigate to="/profile" />} />
                        <Route path="/admin/portfolios" element={isAdmin ? <PortfoliosList /> : <Navigate to="/profile" />} />
                        <Route path="/admin/assign-user" element={isAdmin ? <AssignUserToCompany /> : <Navigate to="/profile" />} />
                        <Route
                            path="/admin/:company/billing-info"
                            element={isAdmin ? <CompanyBilling /> : <Navigate to="/profile" />}
                        />
                    </Routes>
                {/*</div>*/}
            </div>
        </div>
    );
}

export default App;
