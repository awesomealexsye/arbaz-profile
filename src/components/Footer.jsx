import React from 'react';
import Logo from './Logo';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { personalInfo } from '../data/resumeData';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Logo and Description */}
                    <div className="footer-section">
                        <div onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                            <Logo size="medium" />
                        </div>
                        <p className="footer-description">
                            Senior Full-Stack Engineer crafting scalable solutions and delivering exceptional digital experiences.
                        </p>
                        <div className="footer-social">
                            <a
                                href={`https://github.com/${personalInfo.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                <FiGithub />
                            </a>
                            <a
                                href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                            >
                                <FiLinkedin />
                            </a>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="footer-social-link"
                            >
                                <FiMail />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#skills">Skills</a></li>
                            <li><a href="#experience">Experience</a></li>
                        </ul>
                    </div>

                    {/* Projects */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Explore</h4>
                        <ul className="footer-links">
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Get In Touch</h4>
                        <ul className="footer-contact">
                            <li>{personalInfo.email}</li>
                            <li>{personalInfo.phone}</li>
                            <li>{personalInfo.location}</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} {personalInfo.name}. All rights reserved.
                    </p>
                    <p className="footer-made-with">
                        Made with <FiHeart className="heart-icon" /> using React, Three.js & Lottie
                    </p>
                </div>
            </div>
        </footer>
    );
}
