import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
    FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram,
    FaGlobe, FaPhone, FaEnvelope, FaMapMarkerAlt, FaYoutube
} from "react-icons/fa";
import axios from "axios";
import "./Portfolio1.css";

const getSocialIcon = (url) => {
    if (url.includes("linkedin.com")) return <FaLinkedin />;
    if (url.includes("github.com")) return <FaGithub />;
    if (url.includes("twitter.com")) return <FaTwitter />;
    if (url.includes("facebook.com")) return <FaFacebook />;
    if (url.includes("instagram.com")) return <FaInstagram />;
    if (url.includes("youtube.com")) return <FaYoutube />;
    return <FaGlobe />; // Default icon for unknown links
};

const Portfolio1 = () => {
    const qrRef = useRef();
    const BACKEND_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    const { userId } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleSaveContact = () => {
        const vCardData = `
BEGIN:VCARD
VERSION:3.0
N:${portfolio?.lastName || ""};${portfolio?.firstName || ""}
FN:${portfolio?.firstName || ""} ${portfolio?.lastName || ""}
ORG:${portfolio?.companyName || ""}
TITLE:${portfolio?.title || ""}
TEL;TYPE=WORK,VOICE:${portfolio?.phoneNumber || ""}
EMAIL:${portfolio?.email || ""}
ADR;TYPE=WORK:;;${portfolio?.address || ""}
END:VCARD
    `.trim();

        const blob = new Blob([vCardData], { type: "text/vcard" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${portfolio?.firstName || "contact"}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    // Handle Contact Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            title: e.target.title.value,
            company: e.target.company.value,
            notes: e.target.notes.value,
            recipientEmail: portfolio?.email || "", // Ensure it doesn't break
        };

        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/contact/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.text();
            alert(result);
            if (response.ok) {
                e.target.reset();
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message.");
        }
    };
    useEffect(() => {
        const recordVisit = async () => {
            try {
                await axios.post(`${BACKEND_BASE_URL}/api/portfolio/visit/${userId}`);
            } catch (err) {
                console.error("Error recording visit:", err);
            }
        };

        recordVisit();
    }, [userId]);

    // Fetch Portfolio Data
    useEffect(() => {
        if (!userId) return;

        const fetchImage = async (userId) => {
            try {
                const response = await axios.get(
                    `${BACKEND_BASE_URL}/api/portfolio/get/${userId}/image`,
                    { responseType: "blob" }
                );
                setImageUrl(URL.createObjectURL(response.data));
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        (async () => {
            try {
                const response = await axios.get(`${BACKEND_BASE_URL}/api/portfolio/get/${userId}`);
                setPortfolio(response.data);

                if (response.data?.imageName) {
                    await fetchImage(userId);
                }
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId]);

    const downloadQR = () => {
        const canvas = qrRef.current;
        if (!canvas) return;

        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Loading portfolio...</p>
            </div>
        );
    }

    // Show message if no portfolio found
    if (!portfolio) {
        return <div>No portfolio found.</div>;
    }

    return (
        <div className="container12">
            <div className="intro12">
                {/* Navbar */}
                <nav className="navbar-port">
                    <h1 className="logo1">{portfolio?.firstName || "User"}<span className="dot">.</span></h1>
                    <ul className="nav-links12">
                        <li>Home</li>
                        <li><a href="#about12">About</a></li>
                        <li className="active12">
                            <a href="#contact-container1"><button className="contact-btn12">Contact Me</button></a>
                        </li>
                    </ul>
                </nav>

                {/* Main Section */}
                <div className="content">
                    <div className="text-section">
                        <div className="hi-section">
                            <img
                                src={imageUrl || "/linkedin.png"}
                                alt="User Profile"
                                className="profile-picture1"
                            />
                            <h1>
                                Hi! I Am <br/> {portfolio?.firstName || "User"} {portfolio?.lastName || ""}
                            </h1>
                        </div>
                        <p>{portfolio?.title || ""} in {portfolio?.companyName || ""}</p>
                        <div className="buttons">
                            <button className="hire-btn" onClick={handleSaveContact}>Save Contact</button>
                            <button className="know-btn" onClick={downloadQR}>Download QR Code</button>
                        </div>

                        {/* Social Links */}
                        {portfolio?.socialLinks?.length > 0 ? (
                            <div className="socials12">
                                {portfolio.socialLinks.map((link, index) => (
                                    <a key={index} href={link.url.startsWith('http') ? link.url : `https://${link.url}`} className="se2" target="_blank" rel="noopener noreferrer">
                                        {getSocialIcon(link.url)}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p>No social links available.</p>
                        )}
                    </div>
                </div>
            </div>

                {/* About Section */}
                <div className="about12" id="about12">
                    <div className="about-left">
                        <QRCodeCanvas ref={qrRef} value={`${BACKEND_BASE_URL}/portfolio/${userId}`} size={200}/>
                    </div>
                    <div className="about-right">
                        <h1>About Me</h1>
                        <p>{portfolio?.about || "No information available."}</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-container1" id="contact-container1">
                    <div className="contact-info1">
                        <h2>Contact Information</h2>
                        <p>Fill up the form and I will get back to you within 24 hours.</p>
                        <div className="contact-details1">
                            <p><FaPhone/> {portfolio?.phoneNumber || "N/A"}</p>
                            <p><FaEnvelope/> {portfolio?.email || "N/A"}</p>
                            <p><FaMapMarkerAlt/> {portfolio?.address || "N/A"}</p>
                        </div>
                    </div>

                    <div className="contact-form1">
                        <h2>Contact Me</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row1">
                                <input type="text" name="firstName" placeholder="First Name" required/>
                                <input type="text" name="lastName" placeholder="Last Name" required/>
                            </div>
                            <div className="form-row1">
                                <input type="email" name="email" placeholder="Email" required/>
                                <input type="tel" name="phone" placeholder="Phone"/>
                            </div>
                            <div className="form-row1">
                                <input type="text" name="title" placeholder="Title"/>
                                <input type="text" name="company" placeholder="Company"/>
                            </div>
                            <div className="form-group1">
                                <textarea name="notes" placeholder="Notes"></textarea>
                            </div>
                            <div className="form-group1">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="footer1">
                    <p>Powered By</p>
                    <a href="/" target="_blank"><img src="/logo.png" alt="Logo"/></a>
                </div>
            </div>
            );
            };

            export default Portfolio1;
