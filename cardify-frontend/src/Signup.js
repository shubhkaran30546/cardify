// import React, { useState } from "react";
// import "./Signup.css";
//
// const Signup = () => {
//     const [showEmailSignup, setShowEmailSignup] = useState(false);
//
//     const handleEmailSignupClick = () => {
//         setShowEmailSignup(true);
//     };
//
//     const handleBackClick = () => {
//         setShowEmailSignup(false);
//     };
//
//     return (
//         <div className="signup-container">
//             {!showEmailSignup ? (
//                 <div className="signup-card">
//                     <h2>Create an Account</h2>
//                     <button className="social-button facebook">
//                         <img src="fb.png" alt="Facebook" className="icon" />
//                         Continue with Facebook
//                     </button>
//                     <button className="social-button google">
//                         <img src="google.png" alt="Google" className="icon" />
//                         Continue with Google
//                     </button>
//                     <button
//                         className="social-button email"
//                         onClick={handleEmailSignupClick}
//                     >
//                         <img src="email.png" alt="Email" className="icon" />
//                         Continue with Email
//                     </button>
//                     <div className="divider" />
//                     <button className="login-button">Login</button>
//                 </div>
//             ) : (
//                 <div className="email-signup-card">
//                     <h2>Sign Up with Email</h2>
//                     <form className="email-signup-form">
//                         <input
//                             type="text"
//                             placeholder="Full Name"
//                             className="input-field"
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email Address"
//                             className="input-field"
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             className="input-field"
//                         />
//                         <button type="submit" className="signup-submit-button">
//                             Sign Up
//                         </button>
//                     </form>
//                     <button className="back-button" onClick={handleBackClick}>
//                         Back
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Signup;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const navigate = useNavigate();

    const handleEmailSignupClick = () => {
        navigate("/email-signup");
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2>Create an Account</h2>
                <button className="social-button facebook">
                    <img src="fb.png" alt="Facebook" className="icon" />
                    Continue with Facebook
                </button>
                <button className="social-button google">
                    <img src="google.png" alt="Google" className="icon" />
                    Continue with Google
                </button>
                <button
                    className="social-button email"
                    onClick={handleEmailSignupClick}
                >
                    <img src="email.png" alt="Email" className="icon" />
                    Continue with Email
                </button>
                <div className="divider" />
                <button className="login-button">Login</button>
            </div>
        </div>
    );
};

export default Signup;
