import React, { useState } from "react";
import "./Form.css";

const SlidingForm = () => {
    const [step, setStep] = useState(0);
    const [urls, setUrls] = useState([""]);  // Dynamic URLs list

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        title: "",
        companyName: "",
        companyPicture: null,
        aboutMe: "",
        address: "",
        email: "",
        phoneNumber: "",
        website: "",
        businessCardPicture: null,
        testimonials: "",
        resumeLink: "",
    });

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleAddUrl = () => {
        setUrls([...urls, ""]);
    };

    const handleUrlChange = (index, value) => {
        const updatedUrls = [...urls];
        updatedUrls[index] = value;
        setUrls(updatedUrls);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Portfolio Information Submitted Successfully!");
        console.log("Submitted Data:", { ...formData, urls });
    };

    return (
        <div className="form-container">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${(step + 1) * 20}%` }}></div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="slides-wrapper" style={{ transform: `translateX(-${step * 100}%)` }}>

                    {/* Step 1: Personal Details */}
                    <div className="form-slide">
                        <h2>Step 1: Enter Your Name</h2>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>

                    {/* Step 2: Contact Information */}
                    <div className="form-slide">
                        <h2>Step 2: Contact Information</h2>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Your Address"
                            value={formData.address}
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

                    {/* Step 3: Professional Details */}
                    <div className="form-slide">
                        <h2>Step 3: Professional Title & Company</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Professional Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company Name (Optional)"
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            name="companyPicture"
                            onChange={handleFileChange}
                        />
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>

                    {/* Step 4: About Me */}
                    <div className="form-slide">
                        <h2>Step 4: About Me</h2>
                        <textarea
                            name="aboutMe"
                            placeholder="Tell us about yourself"
                            value={formData.aboutMe}
                            onChange={handleChange}
                            rows={4}
                        />
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>

                    {/* Step 5: Website & Additional Links */}
                    <div className="form-slide">
                        <h2>Step 5: Website & Additional Links</h2>
                        <input
                            type="url"
                            name="website"
                            placeholder="Main Website or Blog URL"
                            value={formData.website}
                            onChange={handleChange}
                        />

                        {urls.map((url, index) => (
                            <input
                                key={index}
                                type="url"
                                placeholder={`Additional URL ${index + 1}`}
                                value={url}
                                onChange={(e) => handleUrlChange(index, e.target.value)}
                            />
                        ))}

                        <button type="button" onClick={handleAddUrl}>
                            Add Another URL
                        </button>

                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="button" onClick={nextStep}>
                            Next
                        </button>
                    </div>

                    {/* Step 6: Testimonials & Resume */}
                    <div className="form-slide">
                        <h2>Step 6: Testimonials & Resume</h2>
                        <textarea
                            name="testimonials"
                            placeholder="Include Testimonials"
                            value={formData.testimonials}
                            onChange={handleChange}
                            rows={4}
                        ></textarea>
                        <input
                            type="url"
                            name="resumeLink"
                            placeholder="Link to Resume/CV"
                            value={formData.resumeLink}
                            onChange={handleChange}
                        />
                        <button type="button" onClick={prevStep}>
                            Back
                        </button>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SlidingForm;
