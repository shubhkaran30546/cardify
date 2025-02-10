import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleEmailSignup = () => {
        navigate("/email-signup");
    };

    useEffect(() => {
        console.log("Current URL:", window.location.href);
        console.log("React Router location object:", location);

        const query = new URLSearchParams(location.search);
        const token = query.get("token");

        if (token) {
            console.log("✅ Token received from URL:", token);
            localStorage.setItem("token", token);
            console.log("🔄 Token stored in localStorage:", localStorage.getItem("token"));

            navigate("/", { replace: true });  // Use replace to prevent back button issues
        } else {
            console.log("❌ No token in the URL.");
        }
    }, [location, navigate]);


    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };


    const handleFacebookLogin = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users/auth/facebook");
            window.location.href = response.data.redirectUrl;
        } catch (error) {
            console.error("Error initiating Facebook login:", error);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create an Account</h2>
                <button className="social-button facebook" onClick={handleFacebookLogin}>
                    <img src="fb.png" alt="Facebook" className="icon" />
                    Continue with Facebook
                </button>
                <button className="social-button google" onClick={handleGoogleLogin}>
                    <img src="google.png" alt="Google" className="icon" />
                    Continue with Google
                </button>
                <button className="social-button email" onClick={handleEmailSignup}>
                    <img src="email.png" alt="Email" className="icon" />
                    Continue with Email
                </button>
                <div className="divider" />
                <button className="login-button" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Signup;