import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './Home';
import Navbar from "./Navbar";
import Signup from "./Signup";
import EmailSignup from "./Email_signup";
import Login from "./Login";
import Portfolio from "./Portfolio"
import SlidingForm from "./Form";
import Profile from "./Profile";
import Navbar2 from "./Navbar2";
function App() {
    return (
        <Router>
            <MainApp />
        </Router>
    );
}

function MainApp() {
    const location = useLocation();

    return (
        <div className="App">
            {/* Conditionally render different Navbars */}
            {location.pathname.startsWith("/portfolio") ? <Navbar2 /> : <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/email-signup" element={<EmailSignup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-ecard" element={<SlidingForm />} />
                <Route path="/portfolio/:userId" element={<Portfolio />} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/edit-portfolio/:userId" element={<SlidingForm />} />
            </Routes>
        </div>
    );
}

export default App;