import React from 'react';
import { services } from '../data/resumeData';
import {
    FiSmartphone, FiGlobe, FiServer, FiCloud, FiShield,
    FiCpu, FiCheck
} from 'react-icons/fi';
import './Services.css';

const iconMap = {
    smartphone: FiSmartphone,
    globe: FiGlobe,
    server: FiServer,
    cloud: FiCloud,
    shield: FiShield,
    brain: FiCpu
};

export default function Services() {
    return (
        <section id="services" className="section services-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        Services <span className="gradient-text">I Offer</span>
                    </h2>
                    <p className="section-subtitle">
                        Full-stack development solutions tailored to your needs
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon];
                        return (
                            <div
                                key={service.id}
                                className="service-card card fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="card-content">
                                    <div className={`service-icon-wrapper bg-gradient-to-br ${service.gradient}`}>
                                        <Icon className="service-icon" />
                                    </div>
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>

                                    <div className="service-features">
                                        <h4>What's Included:</h4>
                                        <ul>
                                            {service.features.map((feature, i) => (
                                                <li key={i}>
                                                    <FiCheck className="check-icon" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
