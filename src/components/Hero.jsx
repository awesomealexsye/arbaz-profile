import React, { useEffect, useRef } from 'react';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiPhone, FiInstagram, FiDownload } from 'react-icons/fi';
import { personalInfo } from '../data/resumeData';
import './Hero.css';
import LottieReact from 'lottie-react';
import animationData from '../assets/lottie/astranaut.json';

// Handle potential default export mismatch
const Lottie = LottieReact.default || LottieReact;

export default function Hero() {
    const imageRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (imageRef.current) {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                const xPos = (clientX / innerWidth - 0.5) * 20;
                const yPos = (clientY / innerHeight - 0.5) * 20;

                imageRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="home" className="hero section">
            {/* Animated Background Elements */}
            <div className="hero-bg-elements">
                <div className="floating-orb orb-1"></div>
                <div className="floating-orb orb-2"></div>
                <div className="floating-orb orb-3"></div>
            </div>

            <div className="container">
                <div className="hero-grid">
                    {/* Left Side - Text Content */}
                    <div className="hero-content">
                        <div className="hero-badge fade-in">
                            <span className="badge-dot"></span>
                            <span>Available for opportunities</span>
                        </div>

                        <h1 className="hero-title fade-in">
                            Hi, I'm <span className="gradient-text gradient-animate">{personalInfo.name}</span>
                        </h1>

                        <h2 className="hero-subtitle fade-in">
                            <span className="typing-effect">{personalInfo.title}</span>
                        </h2>

                        <p className="hero-description fade-in">{personalInfo.summary}</p>

                        {/* Contact Info */}
                        <div className="hero-contact fade-in">
                            <a href={`mailto:${personalInfo.email}`} className="contact-item">
                                <FiMail /> {personalInfo.email}
                            </a>
                            <a href={`tel:${personalInfo.phone}`} className="contact-item">
                                <FiPhone /> {personalInfo.phone}
                            </a>
                            <div className="contact-item">
                                <FiMapPin /> {personalInfo.location}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="hero-actions fade-in">
                            <button className="btn btn-primary" onClick={() => {
                                window.open('https://drive.google.com/uc?export=download&id=1Mug2GiCe2r65SPA_ywTRG1zae5UGog20', '_blank');
                            }}>
                                <FiDownload style={{ marginRight: '0.5rem' }} />
                                Download CV
                            </button>
                            <button className="btn btn-outline" onClick={() => {
                                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                            }}>
                                Get In Touch
                            </button>
                        </div>

                        {/* Social Links */}
                        <div className="hero-social fade-in">
                            <a
                                href={`https://github.com/${personalInfo.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <FiGithub />
                            </a>
                            <a
                                href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <FiLinkedin />
                            </a>
                            <a
                                href={`https://instagram.com/${personalInfo.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <FiInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="hero-image-container fade-in">
                        <div className="hero-image-wrapper" ref={imageRef}>
                            <div className="image-glow"></div>
                            <Lottie
                                animationData={animationData}
                                loop={true}
                                className="hero-image"
                            />
                            <div className="image-border"></div>
                        </div>

                        {/* Floating Stats */}
                        <div className="floating-stat stat-1 glass-dark">
                            <div className="stat-value">5+</div>
                            <div className="stat-label">Years Exp</div>
                        </div>
                        <div className="floating-stat stat-2 glass-dark">
                            <div className="stat-value">20+</div>
                            <div className="stat-label">Projects</div>
                        </div>
                        <div className="floating-stat stat-3 glass-dark">
                            <div className="stat-value">50K+</div>
                            <div className="stat-label">Downloads</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-icon"></div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
}
