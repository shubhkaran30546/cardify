// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Form.css";
//
// const SlidingForm = () => {
//     const [step, setStep] = useState(0);
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         title: "",
//         aboutMe: "",
//         address: "",
//         email: "",
//         phoneNumber: "",
//         // socialLinks: [], // Array of { platform: string, url: string }
//         // profileImage: null,
//     });
//
//     const [file, setFile] = useState(null);
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         console.log("Token in SlidingForm:", token); // Debugging
//         if (!token) {
//             console.warn("Token not found, redirecting to login.");
//             navigate("/login");
//         } else {
//             setIsLoggedIn(true);
//         }
//     }, [navigate]);
//
//     const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
//     const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };
//
//     const [urls, setUrls] = useState([""]); // Start with one input field
//
//     const addInputField = () => {
//         const newUrls = [...urls, ""];
//         setUrls(newUrls);
//         setFormData({ ...formData, socialLinks: newUrls }); // Update socialLinks in formData
//     };
//
//     const handleInputChange = (index, value) => {
//         const updatedUrls = [...urls];
//         updatedUrls[index] = value;
//         setUrls(updatedUrls);
//         // setFormData({ ...formData, socialLinks: updatedUrls }); // Update socialLinks in formData
//     };
//
//     const removeInputField = (index) => {
//         const updatedUrls = urls.filter((_, i) => i !== index);
//         setUrls(updatedUrls);
//         setFormData({ ...formData, socialLinks: updatedUrls }); // Update socialLinks in formData
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         // const formDataObj = new FormData();
//         // formDataObj.append("firstName", formData.firstName);
//         // formDataObj.append("lastName", formData.lastName);
//         // formDataObj.append("title", formData.title);
//         // formDataObj.append("aboutMe", formData.aboutMe);
//         // formDataObj.append("address", formData.address);
//         // formDataObj.append("email", formData.email);
//         // formDataObj.append("phoneNumber", formData.phoneNumber);
//         // formData.socialLinks.forEach((link, index) => {
//         //     formDataObj.append(`socialLinks[${index}]`, link);
//         // });
//         // if (file) {
//         //     formDataObj.append("profileImage", file);
//         // }
//
//         console.log("FormData being sent:");
//         for (let [key, value] of formData.entries()) {
//             console.log(key, value);
//         }
//
//         try {
//             const token = localStorage.getItem("token");
//             console.log("Token used:", token);
//             if (!token) {
//                 alert("You are not logged in. Please log in to continue.");
//                 navigate("/email-signup");
//                 return;
//             }
//
//             const response = await fetch("http://localhost:8080/api/portfolio", {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: formData,
//             });
//             console.log("Response Status:", response.status);
//             if (response.status === 401) {
//                 console.error("Unauthorized: Invalid or expired token.");
//                 alert("Session expired. Please log in again.");
//                 navigate("/email-signup");
//                 return;
//             }
//
//             if (response.ok) {
//                 const text = await response.text();
//                 console.log("Response text:", text);
//                 if (text) {
//                     try {
//                         const responseBody = JSON.parse(text);
//                         console.log("Portfolio generated successfully!");
//                         navigate(responseBody.path);
//                     } catch (e) {
//                         console.error("Error parsing response:", e);
//                         alert("Error generating portfolio.");
//                     }
//                 } else {
//                     alert("No response body received from the server.");
//                 }
//             } else {
//                 alert("Server responded with an error status: " + response.status);
//             }
//         } catch (error) {
//             console.error("Error:", error);
//             alert("Error connecting to the server");
//         }
//     };
//
//
//     if (!isLoggedIn) {
//         return <div>Please log in to access the form.</div>;
//     }
//
//     return (
//         <div className="form-container">
//             <div className="progress-bar">
//                 <div className="progress" style={{ width: `${(step + 1) * 25}%` }}></div>
//             </div>
//
//             <form onSubmit={handleSubmit}>
//                 <div className="slides-wrapper">
//                     {/* Step 1: Basic Info */}
//                     <div className={`form-slide ${step === 0 ? "active" : ""}`}>
//                         <h2>Step 1: Basic Info</h2>
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 name="firstName"
//                                 placeholder="First Name"
//                                 value={formData.firstName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="lastName"
//                                 placeholder="Last Name"
//                                 value={formData.lastName}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//
//                         {/*<div className="form-group">*/}
//                         {/*    <label htmlFor="profileImage" className="file-label">Profile Image</label>*/}
//                         {/*    <input*/}
//                         {/*        type="file"*/}
//                         {/*        id="profileImage"*/}
//                         {/*        name="profileImage"*/}
//                         {/*        onChange={handleFileChange}*/}
//                         {/*    />*/}
//                         {/*</div>*/}
//
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 name="title"
//                                 placeholder="Title (e.g., Web Developer)"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//
//                         <button type="button" onClick={nextStep}>
//                             Next
//                         </button>
//                     </div>
//
//                     {/* Step 2: About Me */}
//                     <div className={`form-slide ${step === 1 ? "active" : ""}`}>
//                         <h2>Step 2: About Me</h2>
//                         <textarea
//                             name="aboutMe"
//                             placeholder="Tell us about yourself"
//                             value={formData.aboutMe}
//                             onChange={handleChange}
//                             required
//                         ></textarea>
//                         <button type="button" onClick={prevStep}>
//                             Back
//                         </button>
//                         <button type="button" onClick={nextStep}>
//                             Next
//                         </button>
//                     </div>
//
//                     {/* Step 3: Contact Info */}
//                     <div className={`form-slide ${step === 2 ? "active" : ""}`}>
//                         <h2>Step 3: Contact Info</h2>
//                         <input
//                             type="text"
//                             name="address"
//                             placeholder="Address"
//                             value={formData.address}
//                             onChange={handleChange}
//                             required
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                         <input
//                             type="text"
//                             name="phoneNumber"
//                             placeholder="Phone Number"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                             required
//                         />
//                         <button type="button" onClick={prevStep}>
//                             Back
//                         </button>
//                         <button type="button" onClick={nextStep}>
//                             Next
//                         </button>
//                         <button type="submit">Generate Portfolio</button>
//                     </div>
//
//                     {/*/!* Step 4: Social Links *!/*/}
//                     {/*<div className={`form-slide ${step === 3 ? "active" : ""}`}>*/}
//                     {/*    <h2>Step 4: Social Links</h2>*/}
//                     {/*    {urls.map((url, index) => (*/}
//                     {/*        <div*/}
//                     {/*            key={index}*/}
//                     {/*            style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}*/}
//                     {/*        >*/}
//                     {/*            <input*/}
//                     {/*                type="url"*/}
//                     {/*                placeholder={`Enter URL ${index + 1}`}*/}
//                     {/*                value={url}*/}
//                     {/*                onChange={(e) => handleInputChange(index, e.target.value)}*/}
//                     {/*                required*/}
//                     {/*                style={{ marginRight: "10px" }}*/}
//                     {/*            />*/}
//                     {/*            <button*/}
//                     {/*                type="button"*/}
//                     {/*                onClick={() => removeInputField(index)}*/}
//                     {/*                style={{ marginRight: "10px" }}*/}
//                     {/*            >*/}
//                     {/*                Remove*/}
//                     {/*            </button>*/}
//                     {/*        </div>*/}
//                     {/*    ))}*/}
//                     {/*    <button type="button" onClick={addInputField}>*/}
//                     {/*        Add New Link*/}
//                     {/*    </button>*/}
//                     {/*    <button type="button" onClick={prevStep}>*/}
//                     {/*        Back*/}
//                     {/*    </button>*/}
//                     {/*</div>*/}
//                 </div>
//             </form>
//         </div>
//     );
// };
//
// export default SlidingForm;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import axios from "axios";

const SlidingForm = () => {
    const [step, setStep] = useState(0);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState({
        firstName: '',
        lastName: '',
        title: '',
        about: '',
        email: '',
        address: '',
        phoneNumber: '',
        profileImage: null,
        socialLinks: []  // Optional, you can extend as needed
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPortfolio({
            ...portfolio,
            [name]: value
        });
    };
    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
    const [urls, setUrls] = useState([{ url: "" }]); // Start with one input field

    const addInputField = () => {
        const newUrls = [...urls, ""];
        setUrls(newUrls);
        setPortfolio({ ...portfolio, socialLinks: newUrls }); // Update socialLinks in formData
    };
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (index, value) => {
        const updatedUrls = [...urls];
        updatedUrls[index] = { url: value };  // Ensure it's an object
        setUrls(updatedUrls);
    };

    const removeInputField = (index) => {
        const updatedUrls = urls.filter((_, i) => i !== index);
        setUrls(updatedUrls);
        setPortfolio({ ...portfolio, socialLinks: updatedUrls }); // Update socialLinks in formData
    };
    // Handle form submission
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //
    //     // Get the JWT token from localStorage
    //     const token = localStorage.getItem('token')?.trim();
    //     console.log(token);
    //     if (!token) {
    //
    //         alert("No token found. Please log in first.");
    //         navigate("/signup");
    //     }
    //     console.log(JSON.stringify(portfolio));
    //
    //     // Send portfolio data with token in the Authorization header
    //     const response = await fetch("http://localhost:8080/api/portfolio/save", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(portfolio),
    //     });
    //     if (response.status === 401) {
    //         localStorage.removeItem("token");
    //             console.error("Unauthorized: Invalid or expired token.");
    //             alert("Session expired. Please log in again.");
    //             navigate("/signup");
    //             return;
    //         }
    //     if (response.ok) {
    //         alert("Portfolio saved successfully!");
    //     } else {
    //         alert("Failed to save portfolio");
    //     }
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert("No token found. Please log in first.");
            navigate("/signup");
            return;
        }

        const formData = new FormData();

        // Ensure social links are updated
        portfolio.socialLinks = urls.map(link => ({ url: link.url }));

        // Append portfolio JSON data
        formData.append('portfolio', new Blob([JSON.stringify(portfolio)], { type: "application/json" }));

        // Append profile image if available
        if (file) {
            formData.append('profileImage', file);
        } else {
            alert("Please upload a profile image.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/portfolio/save", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`, // Do NOT add Content-Type manually
                },
                body: formData,
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                alert("Session expired. Please log in again.");
                navigate("/signup");
                return;
            }

            if (response.ok) {
                alert("Portfolio saved successfully!");
            } else {
                const errorMsg = await response.text();
                console.error("Failed to save portfolio:", errorMsg);
                alert("Failed to save portfolio: " + errorMsg);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting portfolio");
        }
    };



    return (
        <div className="form-container">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${(step + 1) * 25}%` }}></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="slides-wrapper">
                    {/* Step 1: Basic Info */}
                    <div className={`form-slide ${step === 0 ? "active" : ""}`}>
                        <h2>Step 1: Basic Info</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={portfolio.firstName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={portfolio.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="profileImage" className="file-label">Profile Image</label>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title (e.g., Web Developer)"
                                value={portfolio.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>

                    {/* Step 2: About Me */}
                    <div className={`form-slide ${step === 1 ? "active" : ""}`}>
                        <h2>Step 2: About Me</h2>
                        <textarea
                            name="about"
                            placeholder="Tell us about yourself"
                            value={portfolio.about}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>

                    {/* Step 3: Contact Info */}
                    <div className={`form-slide ${step === 2 ? "active" : ""}`}>
                        <h2>Step 3: Contact Info</h2>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={portfolio.address}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={portfolio.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={portfolio.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>

                    </div>

                    {/* Step 4: Social Links */}
                    <div className={`form-slide ${step === 3 ? "active" : ""}`}>
                        <h2>Step 4: Social Links</h2>
                        {urls.map((entry, index) => (
                            <div key={index} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                                <input
                                    type="url"
                                    placeholder={`Enter URL ${index + 1}`}
                                    value={entry.url}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    required
                                    style={{ marginRight: "10px" }}
                                />
                                <button type="button" onClick={() => removeInputField(index)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addInputField}>
                            Add New Link
                        </button>
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SlidingForm;