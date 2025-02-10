import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from "./Navbar";
import Signup from "./Signup";
import EmailSignup from "./Email_signup";
import Login from "./Login";
import Portfolio from "./Portfolio"
import SlidingForm from "./Form";
function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/email-signup" element={<EmailSignup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-ecard" element={<SlidingForm />} />
                    <Route path="/portfolio/:userId" element={<Portfolio />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;