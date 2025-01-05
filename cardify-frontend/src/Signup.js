import React from "react";
import "./Signup.css";

const Signup = () => {
    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create an Account</h2>
                <button className="social-button facebook">
                    <img
                        src="linkedin.png"
                        alt="Facebook"
                        className="icon"
                    />
                    Continue with LinkedIn
                </button>
                <button className="social-button google">
                    <img
                        src="google.png"
                        alt="Google"
                        className="icon"
                    />
                    Continue with Google
                </button>
                <button className="social-button email">
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
