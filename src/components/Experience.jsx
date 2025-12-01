import React from 'react';
import { experience } from '../data/resumeData';
import { FiBriefcase, FiMapPin, FiCalendar, FiCheck } from 'react-icons/fi';
import './Experience.css';

export default function Experience() {
    return (
        <section id="experience" className="section experience-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        Professional <span className="gradient-text">Journey</span>
                    </h2>
                    <p className="section-subtitle">
                        Building scalable solutions and leading technical excellence
                    </p>
                </div>

                <div className="timeline">
                    {experience.map((job, index) => (
                        <div key={index} className="timeline-item" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="timeline-marker">
                                <div className="marker-circle">
                                    <FiBriefcase />
                                </div>
                                {index < experience.length - 1 && <div className="timeline-line"></div>}
                            </div>

                            <div className="timeline-content card">
                                <div className="card-content">
                                    <div className="job-header">
                                        <div>
                                            <h3 className="job-title">{job.title}</h3>
                                            <h4 className="company-name">{job.company}</h4>
                                        </div>
                                    </div>

                                    <div className="job-meta">
                                        <div className="meta-item">
                                            <FiCalendar />
                                            <span>{job.period}</span>
                                        </div>
                                        <div className="meta-item">
                                            <FiMapPin />
                                            <span>{job.location}</span>
                                        </div>
                                    </div>

                                    <ul className="responsibilities-list">
                                        {job.responsibilities.map((resp, i) => (
                                            <li key={i}>
                                                <FiCheck className="check-icon" />
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
