import React from 'react';
import './Logo.css';

export default function Logo({ size = 'medium' }) {
    return (
        <div className={`logo-container logo-${size}`}>
            <div className="logo-wrapper">
                <div className="logo-brackets">
                    <span className="bracket-left">&lt;</span>
                    <div className="logo-content">
                        <span className="logo-slash">/</span>
                        <span className="logo-text">ARBAZ</span>
                        <span className="logo-slash">/</span>
                    </div>
                    <span className="bracket-right">&gt;</span>
                </div>
                <div className="logo-underline"></div>
            </div>
            <div className="logo-particles">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`} />
                ))}
            </div>
        </div>
    );
}
