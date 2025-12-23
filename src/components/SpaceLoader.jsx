import React, { useState, useEffect } from 'react';
import './SpaceLoader.css';

export default function SpaceLoader({ onComplete }) {
    const [phase, setPhase] = useState('warp'); // 'warp' -> 'reveal'

    useEffect(() => {
        // After 2.5 seconds, trigger the reveal phase
        const timer = setTimeout(() => {
            setPhase('reveal');
        }, 2500);

        // After 3 seconds, complete the loading
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className={`space-loader ${phase}`}>
            {/* Nebula Clouds */}
            <div className="nebula-clouds">
                <div className="nebula nebula-1"></div>
                <div className="nebula nebula-2"></div>
                <div className="nebula nebula-3"></div>
            </div>

            {/* Floating Planets */}
            <div className="planets">
                <div className="planet planet-1">🪐</div>
                <div className="planet planet-2">🌍</div>
                <div className="planet planet-3">🌙</div>
                <div className="planet planet-4">⭐</div>
            </div>

            {/* Floating Rocket */}
            <div className="floating-rocket">🚀</div>

            {/* Starfield Background */}
            <div className="starfield">
                {[...Array(200)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            '--delay': `${Math.random() * 2}s`,
                            '--duration': `${0.5 + Math.random() * 1}s`,
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                            '--size': `${1 + Math.random() * 3}px`,
                        }}
                    />
                ))}
            </div>

            {/* Warp Speed Lines */}
            <div className="warp-container">
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className="warp-line"
                        style={{
                            '--angle': `${(i * 360) / 60}deg`,
                            '--delay': `${Math.random() * 0.5}s`,
                            '--length': `${50 + Math.random() * 150}px`,
                        }}
                    />
                ))}
            </div>

            {/* Central Vortex */}
            <div className="vortex">
                <div className="vortex-ring ring-1"></div>
                <div className="vortex-ring ring-2"></div>
                <div className="vortex-ring ring-3"></div>
                <div className="vortex-core"></div>
            </div>

            {/* Rocket Window Frame */}
            <div className="rocket-window">
                <div className="window-frame">
                    <div className="frame-corner top-left"></div>
                    <div className="frame-corner top-right"></div>
                    <div className="frame-corner bottom-left"></div>
                    <div className="frame-corner bottom-right"></div>
                </div>
                <div className="window-reflection"></div>
            </div>

            {/* Loading Text */}
            <div className="loading-text">
                <span className="text-glow">Entering the cosmos...</span>
            </div>

            {/* Dashboard Elements */}
            <div className="dashboard">
                <div className="dashboard-light light-1"></div>
                <div className="dashboard-light light-2"></div>
                <div className="dashboard-light light-3"></div>
            </div>
        </div>
    );
}
