import React from 'react';
import { skills } from '../data/resumeData';
import Lottie from 'lottie-react';
import {
    FiCode, FiServer, FiDatabase, FiCloud, FiSmartphone, FiCpu, FiTool
} from 'react-icons/fi';
import './Skills.css';

const skillIcons = {
    frontend: FiCode,
    backend: FiServer,
    database: FiDatabase,
    devops: FiCloud,
    mobile: FiSmartphone,
    aiml: FiCpu,
    tools: FiTool
};

const skillColors = {
    frontend: 'from-blue-500 to-cyan-500',
    backend: 'from-purple-500 to-pink-500',
    database: 'from-green-500 to-emerald-500',
    devops: 'from-orange-500 to-red-500',
    mobile: 'from-indigo-500 to-purple-500',
    aiml: 'from-pink-500 to-rose-500',
    tools: 'from-cyan-500 to-teal-500'
};

const skillNames = {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps & Cloud',
    mobile: 'Mobile Development',
    aiml: 'AI/ML',
    tools: 'Tools'
};

// Simple Lottie animation data for skills
const skillLottieData = {
    "v": "5.7.4",
    "fr": 30,
    "ip": 0,
    "op": 90,
    "w": 100,
    "h": 100,
    "layers": []
};

export default function Skills() {
    return (
        <section id="skills" className="section skills-section">
            {/* Floating Lottie Decorations */}
            <div className="skills-lottie-bg">
                <div className="lottie-float lottie-float-1">
                    <div className="code-symbol">{'<>'}</div>
                </div>
                <div className="lottie-float lottie-float-2">
                    <div className="code-symbol">{'{ }'}</div>
                </div>
                <div className="lottie-float lottie-float-3">
                    <div className="code-symbol">{'[ ]'}</div>
                </div>
            </div>

            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        Technical <span className="gradient-text">Arsenal</span>
                    </h2>
                    <p className="section-subtitle">
                        Mastering technologies across the full development spectrum
                    </p>
                </div>

                <div className="skills-grid">
                    {Object.entries(skills).map(([category, skillList], index) => {
                        const Icon = skillIcons[category];
                        const gradient = skillColors[category];

                        return (
                            <div key={category} className="skill-category card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="card-content">
                                    <div className={`skill-icon-wrapper bg-gradient-to-br ${gradient}`}>
                                        <Icon className="skill-icon" />
                                    </div>
                                    <h3 className="skill-category-title">{skillNames[category]}</h3>
                                    <div className="skill-tags">
                                        {skillList.map((skill, i) => (
                                            <span key={i} className="skill-tag">
                                                {skill}
                                            </span>
                                        ))}
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
