import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/resumeData';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Testimonials.css';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="section testimonials-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        Client <span className="gradient-text">Testimonials</span>
                    </h2>
                    <p className="section-subtitle">
                        What clients say about working with me
                    </p>
                </div>

                <div className="testimonials-wrapper">
                    <div className="testimonial-carousel">
                        {/* Navigation Arrows */}
                        <button className="nav-arrow arrow-left" onClick={goToPrev}>
                            <FiChevronLeft />
                        </button>
                        <button className="nav-arrow arrow-right" onClick={goToNext}>
                            <FiChevronRight />
                        </button>

                        {/* Testimonial Card */}
                        <div className={`testimonial-card card glass-dark bg-gradient-to-br ${currentTestimonial.gradient}`}>
                            <div className="card-content">
                                {/* Rating Stars */}
                                <div className="rating">
                                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                                        <FiStar key={i} className="star filled" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <div className="quote-icon">"</div>
                                <p className="testimonial-text">{currentTestimonial.text}</p>

                                {/* Client Info */}
                                <div className="client-info">
                                    <div className="client-details">
                                        <h4 className="client-name">{currentTestimonial.name}</h4>
                                        <p className="client-role">{currentTestimonial.role}</p>
                                        <p className="client-company">{currentTestimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dots Navigation */}
                        <div className="dots-navigation">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
