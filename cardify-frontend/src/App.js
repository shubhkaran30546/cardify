import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import {ScrollRestoration, BrowserRouter} from "react-router-dom";
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
            </Routes>
        </div>
    );
}

export default App;