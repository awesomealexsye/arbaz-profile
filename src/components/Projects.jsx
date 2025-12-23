import React, { useState } from 'react';
import { projects } from '../data/resumeData';
import { FiStar, FiDownload, FiExternalLink, FiX } from 'react-icons/fi';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import './Projects.css';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="section-subtitle">
                        Independent projects showcasing full-stack expertise and end-to-end delivery
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="card-content">
                                <div className={`project-icon bg-gradient-to-br ${project.gradient}`}>
                                    {project.icon === 'activity' && '💪'}
                                    {project.icon === 'heart' && '❤️'}
                                    {project.icon === 'book' && '📚'}
                                    {project.icon === 'paw' && '🐾'}
                                    {project.icon === 'users' && '👥'}
                                    {project.icon === 'mic' && '🎙️'}
                                    {project.icon === 'database' && '📊'}
                                </div>

                                {project.rating && (
                                    <div className="project-rating">
                                        <FiStar /> {project.rating}
                                    </div>
                                )}

                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-subtitle">{project.subtitle}</p>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tech">
                                    {project.tech.slice(0, 4).map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>

                                <div className="project-stats">
                                    {project.downloads && (
                                        <div className="stat">
                                            <FiDownload />
                                            <span>{project.downloads}</span>
                                        </div>
                                    )}
                                    {project.users && (
                                        <div className="stat">
                                            <span>{project.users}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="project-links">
                                    {project.appStore && project.appStore !== '#' && (
                                        <a
                                            href={project.appStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaApple /> App Store
                                        </a>
                                    )}
                                    {project.playStore && project.playStore !== '#' && (
                                        <a
                                            href={project.playStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FaGooglePlay /> Play Store
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <div className="project-modal" onClick={() => setSelectedProject(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProject(null)}>
                            <FiX />
                        </button>

                        <div className={`modal-header bg-gradient-to-br ${selectedProject.gradient}`}>
                            <div className="modal-icon">
                                {selectedProject.icon === 'activity' && '💪'}
                                {selectedProject.icon === 'heart' && '❤️'}
                                {selectedProject.icon === 'book' && '📚'}
                                {selectedProject.icon === 'paw' && '🐾'}
                                {selectedProject.icon === 'users' && '👥'}
                                {selectedProject.icon === 'mic' && '🎙️'}
                                {selectedProject.icon === 'database' && '📊'}
                            </div>
                        </div>

                        <div className="modal-body">
                            <h2>{selectedProject.title}</h2>
                            <h3>{selectedProject.subtitle}</h3>
                            <p>{selectedProject.description}</p>

                            <div className="modal-section">
                                <h4>Technologies</h4>
                                <div className="project-tech">
                                    {selectedProject.tech.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-section">
                                <h4>Highlights</h4>
                                <ul className="highlights-list">
                                    {selectedProject.highlights.map((highlight, i) => (
                                        <li key={i}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>

                            {(selectedProject.appStore !== '#' || selectedProject.playStore !== '#') && (
                                <div className="modal-links">
                                    {selectedProject.appStore && selectedProject.appStore !== '#' && (
                                        <a
                                            href={selectedProject.appStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                        >
                                            <FaApple /> Download on App Store
                                        </a>
                                    )}
                                    {selectedProject.playStore && selectedProject.playStore !== '#' && (
                                        <a
                                            href={selectedProject.playStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline"
                                        >
                                            <FaGooglePlay /> Get it on Play Store
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
