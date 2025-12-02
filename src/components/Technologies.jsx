import React from 'react';
import { technologiesShowcase } from '../data/resumeData';
import './Technologies.css';

const proficiencyLevels = {
    expert: { label: 'Expert', width: '95%', color: 'from-green-500 to-emerald-500' },
    advanced: { label: 'Advanced', width: '80%', color: 'from-blue-500 to-cyan-500' },
    intermediate: { label: 'Intermediate', width: '65%', color: 'from-purple-500 to-pink-500' }
};

export default function Technologies() {
    return (
        <section id="technologies" className="section technologies-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        Technology <span className="gradient-text">Stack</span>
                    </h2>
                    <p className="section-subtitle">
                        Tools and technologies I've mastered over the years
                    </p>
                </div>

                <div className="tech-categories">
                    {Object.entries(technologiesShowcase).map(([key, category], index) => (
                        <div
                            key={key}
                            className="tech-category card fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="card-content">
                                <h3 className="category-name">{category.name}</h3>
                                <div className="tech-list">
                                    {category.techs.map((tech, i) => {
                                        const proficiency = proficiencyLevels[tech.proficiency];
                                        return (
                                            <div key={i} className="tech-item">
                                                <div className="tech-header">
                                                    <div className="tech-name">
                                                        <span className="tech-icon">{tech.icon}</span>
                                                        <span>{tech.name}</span>
                                                    </div>
                                                    <span className="proficiency-label">{proficiency.label}</span>
                                                </div>
                                                <div className="proficiency-bar">
                                                    <div
                                                        className={`proficiency-fill bg-gradient-to-r ${proficiency.color}`}
                                                        style={{ width: proficiency.width }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
