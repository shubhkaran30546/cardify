import "./Portfolio.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoShareSocial } from "react-icons/io5";  // Importing IoShareSocial icon
import { useParams } from 'react-router-dom';

const Portfolio = () => {
    const { userId } = useParams(); // Extract userId from the URL

    const [portfolio, setPortfolio] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

// Fetch portfolio data when the component mounts
    useEffect(() => {
        if (!userId) return;  // Ensure userId is valid before making requests

        const fetchImage = async (userId) => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/portfolio/get/${userId}/image`,
                    { responseType: "blob" }
                );
                setImageUrl(URL.createObjectURL(response.data));
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        (async () => {  // IIFE to handle async inside useEffect
            try {
                console.log("Fetching portfolio for userId:", userId);
                const response = await axios.get(`http://localhost:8080/api/portfolio/get/${userId}`);
                console.log("Portfolio response:", response.data); // Debugging
                setPortfolio(response.data);
                console.log("AAAAAAAAA");
                console.log(response.data["lastName"]);

                if (response.data?.imageName) {
                    await fetchImage(userId);
                }
            } catch (error) {
                console.error("Error fetching portfolio:", error);
            }
        })();  // Immediately execute the function

    }, [userId]);



    // Display loading if portfolio is not yet fetched
    if (!portfolio) {
        return <div>Loading...</div>;
    }

    return (

        <div className="app">
            {/* Header Section */}
            <div className="header">
                <img
                    src={imageUrl || "/linkedin.png"}
                    alt="User Profile"
                    className="profile-picture"
                />

                <div className="main-intro">
                    <h1>{portfolio.firstName} {portfolio.lastName}</h1>
                    <h4>{portfolio.title}</h4>
                    <h4>{portfolio.email}</h4>
                    <button className="latest-shots-button">Contact Me</button>
                </div>
            </div>

            Social Links Section
            <div className="services">
                {portfolio.socialLinks && portfolio.socialLinks.length > 0 ? (
                    portfolio.socialLinks.map((link, index) => (
                        <div key={index} className="se1">
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                <IoShareSocial/> {/* Just the icon */}
                            </a>
                        </div>
                    ))
                ) : (
                    <p>No social links available.</p>
                )}
            </div>


            {/* About Section */}
            <div className="about">
                <section className="about1">
                    <h3 className="aboutheader1">About Me</h3>
                    <p className="about2">{portfolio.about}</p>
                </section>
            </div>

            {/* Contact Section */}
            <section className="contact">
                <div className="contact1">
                    <h2>Contact Us</h2>
                    <form action="/submit" method="post">
                        <div className="form-row">
                            <input type="text" name="firstName" placeholder="First Name" required/>
                            <input type="text" name="lastName" placeholder="Last Name" required/>
                        </div>
                        <div className="form-row">
                            <input type="email" name="email" placeholder="Email" required/>
                            <input type="tel" name="phone" placeholder="Phone"/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="title" placeholder="Title"/>
                            <input type="text" name="company" placeholder="Company"/>
                        </div>
                        <div className="form-group">
                            <textarea name="notes" placeholder="Notes"></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit">Submit</button>
                        </div>
                    </form>

                    {/* Contact Information */}
                    <div className="contact-card">
                        <div className="contact-info">
                            <h2>Contact Us</h2>
                            <p><strong>Email:</strong>{portfolio.email}</p>
                            <p><strong>Phone:</strong>{portfolio.phoneNumber}</p>
                            <p><strong>Text:</strong>{portfolio.phoneNumber}</p>
                            <p><strong>Company:</strong> eXp Realty</p>
                            <p><strong>Address:</strong>{portfolio.address}</p>
                            <p><a href="#">Click Here For Driving Directions</a></p>
                        </div>

                        {/* Map */}
                        <div className="map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.567130807472!2d-122.4524505!3d48.7604237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485a2e2528f03c3%3A0x9417cfe5da5a7f7!2s2219%20Rimland%20Dr%20Suite%20301%2C%20Bellingham%2C%20WA%2098226%2C%20USA!5e0!3m2!1sen!2sin!4v1617135556005!5m2!1sen!2sin"
                                allowFullScreen=""
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Portfolio;