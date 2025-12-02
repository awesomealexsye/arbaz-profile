import React from 'react';
import { aboutData } from '../data/resumeData';
import { FiCode, FiUsers, FiTrendingUp, FiZap } from 'react-icons/fi';
import './About.css';

const iconMap = {
    code: FiCode,
    users: FiUsers,
    'trending-up': FiTrendingUp,
    zap: FiZap
};

export default function About() {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle">
                        Full-Stack Developer | Problem Solver | Tech Enthusiast
                    </p>
                </div>

                {/* Introduction */}
                <div className="about-intro glass-dark fade-in">
                    <div className="intro-content">
                        <div className="intro-image">
                            <div className="image-wrapper">
                                <img src="/img/me.png" alt="Arbaz" />
                                <div className="image-glow"></div>
                            </div>
                        </div>
                        <div className="intro-text">
                            <p>{aboutData.introduction}</p>
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="mission-vision-grid">
                    <div className="card mission-card fade-in">
                        <div className="card-content">
                            <div className="mv-icon">🎯</div>
                            <h3>Mission</h3>
                            <p>{aboutData.mission}</p>
                        </div>
                    </div>
                    <div className="card vision-card fade-in">
                        <div className="card-content">
                            <div className="mv-icon">🚀</div>
                            <h3>Vision</h3>
                            <p>{aboutData.vision}</p>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="values-section">
                    <h3 className="subsection-title text-center">Core Values</h3>
                    <div className="values-grid">
                        {aboutData.values.map((value, index) => {
                            const Icon = iconMap[value.icon];
                            return (
                                <div key={index} className="value-card card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="card-content">
                                        <div className="value-icon">
                                            <Icon />
                                        </div>
                                        <h4>{value.title}</h4>
                                        <p>{value.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Highlights */}
                <div className="highlights-section">
                    <div className="highlights-grid">
                        {aboutData.highlights.map((highlight, index) => (
                            <div key={index} className="highlight-card glass-dark fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="highlight-value gradient-text">{highlight.value}</div>
                                <div className="highlight-label">{highlight.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
