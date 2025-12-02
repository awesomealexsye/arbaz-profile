import React from 'react';
import './Logo.css';

export default function Logo({ size = 'medium' }) {
    return (
        <div className={`logo-container logo-${size}`}>
            <img
                src="/img/logo.png"
                alt="Arbaz Portfolio Logo"
                className="logo-image"
            />
        </div>
    );
}
