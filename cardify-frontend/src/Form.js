import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Form.css";
import Footer from "./Footer";

const SlidingForm = () => {
    const { userName } = useParams(); // Get userId from the URL
    const [step, setStep] = useState(0);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8080';
    const [portfolio, setPortfolio] = useState({
        firstName: '',
        lastName: '',
        title: '',
        about: '',
        email: '',
        address: '',
        phoneNumber: '',
        companyName: '',
        profileImage: null,
        socialLinks: []
    });
    const [urls, setUrls] = useState([{ url: "" }]); // For social links

    // Check if the token is expired
    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
        } catch (error) {
            return true; // Assume expired if there's an error
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token || isTokenExpired(token)) {
            localStorage.setItem("redirectAfterLogin", location.pathname);
            localStorage.removeItem('token'); // Clear token
            navigate("/login"); // Redirect to login/signup
        }

        if (userName) {
            // Fetch the existing portfolio if userId is present (for editing)
            const fetchPortfolio = async () => {
                try {
                    const response = await axios.get(`${BACKEND_BASE_URL}/api/portfolio/get/${userName}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    });
                    const data = response.data;

                    // Set portfolio data
                    setPortfolio(data);
                    console.log(data);

                    // Populate socialLinks
                    setUrls(data.socialLinks.map(link => ({ url: link.url })));
                } catch (error) {
                    console.error("Error fetching portfolio:", error);
                    alert("Failed to fetch portfolio.");
                }
            };
            fetchPortfolio();
        }
    }, [navigate, userName]);

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

    const addInputField = () => {
        const newUrls = [...urls, ""];
        setUrls(newUrls);
        setPortfolio({ ...portfolio, socialLinks: newUrls });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleInputChange = (index, value) => {
        const updatedUrls = [...urls];
        updatedUrls[index] = { url: value }; // Ensure it's an object
        setUrls(updatedUrls);
    };

    const removeInputField = (index) => {
        const updatedUrls = urls.filter((_, i) => i !== index);
        setUrls(updatedUrls);
        setPortfolio({ ...portfolio, socialLinks: updatedUrls });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Show loader
        const token = localStorage.getItem('token');
        if (!token) {
            alert("No token found. Please log in first.");
            navigate("/login");
            return;
        }

        const formData = new FormData();

        portfolio.socialLinks = urls.map(link => ({ url: link.url }));

        formData.append('portfolio', new Blob([JSON.stringify(portfolio)], { type: "application/json" }));

        if (file) {
            formData.append('profileImage', file);
        }

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/portfolio/save`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (response.ok) {
                const responseData = await response.json(); // Get response data
                const savedUserName = responseData?.userName || userName; // Ensure we have a username

                if (!savedUserName) {
                    alert("Error: Username is undefined.");
                    setIsLoading(false);
                    return;
                }

                alert("Portfolio saved successfully!");
                navigate(`/portfolio/${savedUserName}`); // Navigate to the correct URL
            } else {
                const errorMsg = await response.text();
                console.error("Failed to save portfolio:", errorMsg);
                alert("Failed to save portfolio: " + errorMsg);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting portfolio");
        }
        finally {
            setIsLoading(false); // Hide loader
        }
    };

    return (
        <div className="portfolio-form">
        <div className="form-container1">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${(step + 1) * 25}%` }}></div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Loader */}
                {isLoading && <div className="loader"></div>}
                <div className="slides-wrapper">
                    {/* Step 1: Basic Info */}
                    <div className={`form-slide ${step === 0 ? "active" : ""}`}>
                        <h2>Step 1: Basic Info</h2>
                        <div className="form-group1">
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
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                value={portfolio.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group1">
                            <label htmlFor="profileImage" className="file-label">Profile Image</label>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="form-group1">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title (e.g., Web Developer)"
                                value={portfolio.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="next" type="button" onClick={nextStep}>
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
                        <button className="next" type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button className="next" type="button" onClick={nextStep}>
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
                        <button className="next" type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button className="next" type="button" onClick={nextStep}>
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
                                <button className="next" type="button" onClick={() => removeInputField(index)}>Remove</button>
                            </div>
                        ))}
                        <button className="next" type="button" onClick={addInputField}>
                            Add New Link
                        </button>
                        <button className="next" type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="submit" onClick={handleSubmit}>
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div>
            <Footer />
         </div>
        </div>
    );
};

export default SlidingForm;
