import React from 'react';
import { processSteps } from '../data/resumeData';
import {
    FiSearch, FiPenTool, FiCode, FiCheckCircle,
    FiUploadCloud, FiSettings
} from 'react-icons/fi';
import './Process.css';

const iconMap = {
    search: FiSearch,
    'pen-tool': FiPenTool,
    code: FiCode,
    'check-circle': FiCheckCircle,
    'upload-cloud': FiUploadCloud,
    settings: FiSettings
};

export default function Process() {
    return (
        <section id="process" className="section process-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        How We <span className="gradient-text">Build Apps</span>
                    </h2>
                    <p className="section-subtitle">
                        A proven 6-step process from concept to deployment
                    </p>
                </div>

                <div className="process-timeline">
                    {processSteps.map((step, index) => {
                        const Icon = iconMap[step.icon];
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={step.id}
                                className={`process-step ${isEven ? 'step-left' : 'step-right'} fade-in`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                {/* Connector Line */}
                                {index < processSteps.length - 1 && (
                                    <div className="step-connector"></div>
                                )}

                                {/* Step Number Badge */}
                                <div className="step-number-wrapper">
                                    <div className={`step-number bg-gradient-to-br ${step.color}`}>
                                        {step.number}
                                    </div>
                                </div>

                                {/* Step Content Card */}
                                <div className="step-content card">
                                    <div className="card-content">
                                        <div className={`step-icon-wrapper bg-gradient-to-br ${step.color}`}>
                                            <Icon className="step-icon" />
                                        </div>

                                        <h3 className="step-title">{step.title}</h3>
                                        <p className="step-description">{step.description}</p>

                                        <div className="step-activities">
                                            <h4>Key Activities:</h4>
                                            <ul>
                                                {step.activities.map((activity, i) => (
                                                    <li key={i}>
                                                        <span className="activity-dot"></span>
                                                        <span>{activity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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
