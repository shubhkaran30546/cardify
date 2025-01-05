import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleEmailSignup = () => {
        navigate("/email-signup"); // Navigate to the email signup page
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create an Account</h2>
                <button className="social-button facebook">
                    <img
                        src="fb.png"
                        alt="Facebook"
                        className="icon"
                    />
                    Continue with Facebook
                </button>
                <button className="social-button google">
                    <img
                        src="google.png"
                        alt="Google"
                        className="icon"
                    />
                    Continue with Google
                </button>
                <button
                    className="social-button email"
                    onClick={handleEmailSignup} // Add onClick handler
                >
                    <img
                        src="email.png"
                        alt="Email"
                        className="icon"
                    />
                    Continue with Email
                </button>
                <div className="divider" />
                <button className="login-button">Login</button>
            </div>
        </div>
    );
};

export default Signup;
