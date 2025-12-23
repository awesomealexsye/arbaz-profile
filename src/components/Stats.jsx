import React, { useState, useEffect, useRef } from 'react';
import { stats } from '../data/resumeData';
import { FiBriefcase, FiFolder, FiDownload, FiUsers, FiSmartphone } from 'react-icons/fi';
import './Stats.css';

const iconMap = {
    briefcase: FiBriefcase,
    folder: FiFolder,
    download: FiDownload,
    users: FiUsers,
    smartphone: FiSmartphone
};

export default function Stats() {
    const [counters, setCounters] = useState(stats.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    // Animate each counter
                    stats.forEach((stat, index) => {
                        let currentValue = 0;
                        const increment = stat.value / 50; // 50 steps
                        const duration = 2000; // 2 seconds
                        const stepTime = duration / 50;

                        const timer = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= stat.value) {
                                currentValue = stat.value;
                                clearInterval(timer);
                            }
                            setCounters(prev => {
                                const newCounters = [...prev];
                                newCounters[index] = Math.floor(currentValue);
                                return newCounters;
                            });
                        }, stepTime);
                    });
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    return (
        <section id="stats" className="section stats-section" ref={sectionRef}>
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        Achievements <span className="gradient-text">& Stats</span>
                    </h2>
                    <p className="section-subtitle">
                        Numbers that speak for themselves
                    </p>
                </div>

                <div className="stats-grid">
                    {stats.map((stat, index) => {
                        const Icon = iconMap[stat.icon];
                        return (
                            <div
                                key={stat.id}
                                className="stat-card card fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="card-content">
                                    <div className={`stat-icon-wrapper bg-gradient-to-br ${stat.color}`}>
                                        <Icon className="stat-icon" />
                                    </div>
                                    <div className="stat-value">
                                        {counters[index]}{stat.suffix}
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
