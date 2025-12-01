import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import './Navigation.css';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '#home' },
        { name: 'About', path: '#about' },
        { name: 'Skills', path: '#skills' },
        { name: 'Experience', path: '#experience' },
        { name: 'Projects', path: '#projects' },
        { name: 'Contact', path: '#contact' }
    ];

    const handleLinkClick = (path) => {
        setMobileMenuOpen(false);
        if (path.startsWith('#')) {
            const element = document.querySelector(path);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleDownloadCV = () => {
        // Direct download link from Google Drive
        window.open('https://drive.google.com/uc?export=download&id=1Mug2GiCe2r65SPA_ywTRG1zae5UGog20', '_blank');
    };

    return (
        <>
            <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
                <div className="container nav-container">
                    <div className="nav-logo" onClick={() => handleLinkClick('#home')}>
                        <Logo size="small" />
                    </div>

                    {/* Desktop Menu */}
                    <ul className="nav-links desktop-menu">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.path}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLinkClick(link.path);
                                    }}
                                    className="nav-link"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            />

            {/* Galaxy-Themed Mobile Drawer */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <button
                        className="mobile-menu-close"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <FiX />
                    </button>
                </div>

                <ul className="mobile-nav-links">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <a
                                href={link.path}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLinkClick(link.path);
                                }}
                                className="mobile-nav-link"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    className="download-cv-btn"
                    onClick={handleDownloadCV}
                >
                    <FiDownload />
                    <span>Download CV</span>
                </button>
            </div>
        </>
    );
}
