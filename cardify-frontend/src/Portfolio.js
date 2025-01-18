import "./Portfolio.css"
import React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { AiFillInstagram } from "react-icons/ai";
import { RiFacebookBoxFill } from "react-icons/ri";
import { IoLogoLinkedin } from "react-icons/io";
const Portfolio = () => {
    return (
        <div className="app">
            {/* Header Section */}
            <div className="header">
                    <img
                    src="user.png"
                    alt="User Profile"
                    className="profile-picture"
                />
                <div className="main-intro">
                    <h1>Shubhkaran Dhillon</h1>
                    <h4>Software Engineer</h4>
                    <h4>shubh.karan30@gmail.com</h4>
                    <button className="latest-shots-button">Contact Me</button>
                </div>
            </div>

            {/* Services Section */}
            <div className="services">
                <div className="se1">
                    <AiFillInstagram />
                    <RiFacebookBoxFill />
                    <IoLogoLinkedin/>
                </div>
            </div>

            {/* Contact Section */}
            <div className="about">
                <section className="about1">
                    <h3 className='aboutheader1'>About Me</h3>
                    <p className="about2">I am a 4th-year Computing Science student at the University of Alberta with a keen interest in software development and a passion for building scalable, efficient, and user-centered applications. My academic journey has provided me with a solid foundation in programming, system design, and cloud computing, with recent hands-on experience in cloud services through the AWS Cloud Practitioner certification. This certification has equipped me with the skills to design and implement cloud-based solutions effectively, enhancing my software development abilities.

                        While software development is my primary focus, I am also dedicated to expanding my understanding of computer networks and security. Currently, I am preparing for the Cisco Certified Network Associate (CCNA) and cybersecurity exams to strengthen my grasp on secure network infrastructures. With a commitment to continuous learning, I look forward to contributing to innovative projects, leveraging both my software development skills and knowledge in security best practices to create reliable and secure applications that drive impactful results.</p>
                </section>
            </div>
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
                    <div className="contact-card">
                        <div className="contact-info">
                            <h2>Contact Us</h2>
                            <p><strong>Email:</strong> paula.burrows@exprealty.com</p>
                            <p><strong>Phone:</strong> (360) 520-4810</p>
                            <p><strong>Text:</strong> (360) 520-4810</p>
                            <p><strong>Company:</strong> eXp Realty</p>
                            <p><strong>Address:</strong> 2219 Rimland Drive, Suite 301, Bellingham, WA 98226, US</p>
                            <p><a href="#">Click Here For Driving Directions</a></p>
                        </div>
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
}
export default Portfolio;