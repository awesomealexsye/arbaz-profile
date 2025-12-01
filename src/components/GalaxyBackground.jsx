import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Shooting Stars Component
function ShootingStars() {
    const [shootingStars, setShootingStars] = useState([]);

    useEffect(() => {
        const createShootingStar = () => {
            const id = Date.now();
            setShootingStars(prev => [...prev, { id, top: Math.random() * 100, left: Math.random() * 100 }]);
            setTimeout(() => {
                setShootingStars(prev => prev.filter(star => star.id !== id));
            }, 2000);
        };

        const interval = setInterval(createShootingStar, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {shootingStars.map(star => (
                <div
                    key={star.id}
                    className="shooting-star"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                    }}
                />
            ))}
        </>
    );
}

// Animated Comets
function Comets() {
    const groupRef = useRef();
    const isMobile = window.innerWidth < 768;
    const cometCount = isMobile ? 3 : 5;

    const comets = useMemo(() => {
        const temp = [];
        for (let i = 0; i < cometCount; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100
                ],
                velocity: [
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.5
                ]
            });
        }
        return temp;
    }, [cometCount]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
            groupRef.current.children.forEach((comet, i) => {
                const vel = comets[i].velocity;
                comet.position.x += vel[0];
                comet.position.y += vel[1];
                comet.position.z += vel[2];

                // Reset position if out of bounds
                if (Math.abs(comet.position.x) > 50) comet.position.x *= -1;
                if (Math.abs(comet.position.y) > 50) comet.position.y *= -1;
                if (Math.abs(comet.position.z) > 50) comet.position.z *= -1;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {comets.map((comet, i) => (
                <mesh key={i} position={comet.position}>
                    <sphereGeometry args={[0.2, 8, 8]} />
                    <meshBasicMaterial color="#4fd1c5" emissive="#4fd1c5" emissiveIntensity={2} />
                </mesh>
            ))}
        </group>
    );
}

// Floating Asteroids
function Asteroids() {
    const groupRef = useRef();
    const isMobile = window.innerWidth < 768;
    const asteroidCount = isMobile ? 20 : 40;

    const asteroids = useMemo(() => {
        const temp = [];
        for (let i = 0; i < asteroidCount; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 80,
                    (Math.random() - 0.5) * 80,
                    (Math.random() - 0.5) * 80
                ],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
                scale: 0.1 + Math.random() * 0.3
            });
        }
        return temp;
    }, [asteroidCount]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
            groupRef.current.children.forEach((asteroid) => {
                asteroid.rotation.x += 0.001;
                asteroid.rotation.y += 0.002;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {asteroids.map((asteroid, i) => (
                <mesh key={i} position={asteroid.position} rotation={asteroid.rotation} scale={asteroid.scale}>
                    <dodecahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#6b7280" roughness={0.8} metalness={0.2} />
                </mesh>
            ))}
        </group>
    );
}

// Enhanced Planets with Orbits
function Planets() {
    const planetsRef = useRef();

    useFrame((state) => {
        if (planetsRef.current) {
            planetsRef.current.rotation.y += 0.0003;
        }
    });

    return (
        <group ref={planetsRef}>
            {/* Planet 1 - Blue */}
            <mesh position={[-20, 10, -30]}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial color="#3b82f6" emissive="#1e40af" emissiveIntensity={0.3} />
            </mesh>

            {/* Planet 2 - Purple */}
            <mesh position={[25, -15, -40]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshStandardMaterial color="#8b5cf6" emissive="#6d28d9" emissiveIntensity={0.4} />
            </mesh>

            {/* Planet 3 - Pink */}
            <mesh position={[-30, -20, -35]}>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.3} />
            </mesh>

            {/* Planet 4 - Saturn-like with Rings */}
            <group position={[30, 20, -50]}>
                <mesh>
                    <sphereGeometry args={[3.5, 32, 32]} />
                    <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.3} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[5, 0.3, 16, 100]} />
                    <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.2} />
                </mesh>
            </group>

            {/* Planet 5 - Teal */}
            <mesh position={[15, 25, -45]}>
                <sphereGeometry args={[1.8, 32, 32]} />
                <meshStandardMaterial color="#14b8a6" emissive="#0d9488" emissiveIntensity={0.3} />
            </mesh>
        </group>
    );
}

// Pulsing Nebula Clouds
function NebulaClouds() {
    const cloudsRef = useRef();

    useFrame((state) => {
        if (cloudsRef.current) {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            cloudsRef.current.scale.set(scale, scale, scale);
            cloudsRef.current.rotation.z += 0.0002;
        }
    });

    return (
        <group ref={cloudsRef}>
            <mesh position={[-40, 30, -60]}>
                <sphereGeometry args={[15, 16, 16]} />
                <meshBasicMaterial color="#667eea" transparent opacity={0.1} />
            </mesh>
            <mesh position={[40, -30, -70]}>
                <sphereGeometry args={[20, 16, 16]} />
                <meshBasicMaterial color="#ec4899" transparent opacity={0.08} />
            </mesh>
            <mesh position={[0, 0, -80]}>
                <sphereGeometry args={[25, 16, 16]} />
                <meshBasicMaterial color="#8b5cf6" transparent opacity={0.06} />
            </mesh>
        </group>
    );
}

// Cosmic Dust Particles
function CosmicDust() {
    const dustRef = useRef();
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 500 : 1000;

    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
        return positions;
    }, [particleCount]);

    useFrame((state) => {
        if (dustRef.current) {
            dustRef.current.rotation.y += 0.0001;
        }
    });

    return (
        <points ref={dustRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.4} />
        </points>
    );
}

// Galaxy Spiral
function GalaxySpiral() {
    const galaxyRef = useRef();
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 5000 : 15000;

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorInside = new THREE.Color('#667eea');
        const colorOutside = new THREE.Color('#ec4899');

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 50;
            const spinAngle = radius * 0.3;
            const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
            positions[i3 + 1] = (Math.random() - 0.5) * 2;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / 50);

            colors[i3] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        return { positions, colors };
    }, [count]);

    useFrame((state) => {
        if (galaxyRef.current) {
            galaxyRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={galaxyRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.1} vertexColors sizeAttenuation />
        </points>
    );
}

export default function GalaxyBackground() {
    const isMobile = window.innerWidth < 768;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 50], fov: isMobile ? 80 : 75 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />

                {/* Twinkling Stars */}
                <Stars radius={100} depth={50} count={isMobile ? 3000 : 10000} factor={4} saturation={0} fade speed={1} />

                {/* Custom Components */}
                <GalaxySpiral />
                <Planets />
                <NebulaClouds />
                <CosmicDust />
                <Asteroids />
                <Comets />
            </Canvas>

            {/* CSS Shooting Stars */}
            <ShootingStars />

            {/* Additional CSS animations */}
            <style>{`
                .shooting-star {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
                    animation: shoot 2s linear;
                }

                @keyframes shoot {
                    0% {
                        transform: translate(0, 0);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(200px, 200px);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
