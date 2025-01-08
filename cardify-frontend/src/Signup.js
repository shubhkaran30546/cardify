import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleEmailSignup = () => {
        navigate("/email-signup"); // Navigate to the email signup page
    };const handleGoogleSignup = () => {
        navigate("https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=632656753280-mlqvu6hvm9tdi6voallkspr03diat6qt.apps.googleusercontent.com&scope=openid%20profile%20email&state=jea1_TnW5Dx1yKQD5K-nnJ854yzlc_yekO3AadljLZ0%3D&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fgoogle&nonce=3sxJaEJP4V-VWZoqubb63Qo9uIrn0tSGbFdikmhzEw8&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow"); // Navigate to the email signup page
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
                <button className="social-button google" onClick={handleGoogleSignup}>
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
