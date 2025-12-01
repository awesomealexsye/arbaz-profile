import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { personalInfo } from '../data/resumeData';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // WhatsApp number (add country code without + or spaces)
    const whatsappNumber = '919625442725'; // Format: country code + number

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create WhatsApp message with form data
        const message = `*New Portfolio Contact* 📬%0A%0A` +
            `*Name:* ${formData.name}%0A` +
            `*Email:* ${formData.email}%0A` +
            `*Phone:* ${formData.phone}%0A%0A` +
            `*Message:*%0A${formData.message}`;

        // WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="section contact-section">
            {/* Floating Lottie Decorations */}
            <div className="contact-lottie-bg">
                <div className="lottie-contact-float float-1">
                    <div className="contact-symbol">@</div>
                </div>
                <div className="lottie-contact-float float-2">
                    <div className="contact-symbol">{'<>'}</div>
                </div>
                <div className="lottie-contact-float float-3">
                    <div className="contact-symbol">💬</div>
                </div>
            </div>

            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="section-subtitle">
                        Let's discuss how we can work together on your next project
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <h3 className="contact-info-title">Let's Connect</h3>
                        <p className="contact-info-text">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>

                        <div className="contact-details">
                            <a href={`mailto:${personalInfo.email}`} className="contact-detail-item glass-dark">
                                <div className="detail-icon email-icon">
                                    <FiMail />
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <p>{personalInfo.email}</p>
                                </div>
                            </a>

                            <a href={`tel:${personalInfo.phone}`} className="contact-detail-item glass-dark">
                                <div className="detail-icon phone-icon">
                                    <FiPhone />
                                </div>
                                <div>
                                    <h4>Phone</h4>
                                    <p>{personalInfo.phone}</p>
                                </div>
                            </a>

                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-detail-item glass-dark whatsapp-item"
                            >
                                <div className="detail-icon whatsapp-icon">
                                    <FaWhatsapp />
                                </div>
                                <div>
                                    <h4>WhatsApp</h4>
                                    <p>Chat with me directly</p>
                                </div>
                            </a>

                            <div className="contact-detail-item glass-dark">
                                <div className="detail-icon location-icon">
                                    <FiMapPin />
                                </div>
                                <div>
                                    <h4>Location</h4>
                                    <p>{personalInfo.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form glass-dark" onSubmit={handleSubmit}>
                            <div className="form-header">
                                <h3 className="form-title">Send Message via WhatsApp</h3>
                                <div className="whatsapp-badge">
                                    <FaWhatsapp />
                                    <span>Instant Reply</span>
                                </div>
                            </div>

                            <div className="card-content">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            <FiUser /> Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            <FiPhone /> Your Phone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+91 98765 43210"
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        <FiMail /> Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">
                                        <FiMessageSquare /> Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        placeholder="Tell me about your project..."
                                        className="form-input"
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary submit-btn whatsapp-btn">
                                    <FaWhatsapp /> Send to WhatsApp
                                </button>

                                <p className="form-notice">
                                    <FiMessageSquare /> Your message will open in WhatsApp for instant communication
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
