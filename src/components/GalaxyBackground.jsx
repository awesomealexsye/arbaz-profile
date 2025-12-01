import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Twinkling Stars
function TwinklingStars() {
    const starsRef = useRef();
    const count = 10000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 200;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (starsRef.current) {
            starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
            // Twinkling effect
            const time = state.clock.elapsedTime;
            starsRef.current.material.opacity = 0.6 + Math.sin(time * 2) * 0.4;
        }
    });

    return (
        <points ref={starsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

// Animated Planet Component
function Planet({ position, size, color, rotationSpeed, orbitSpeed, orbitRadius, hasRings = false }) {
    const planetRef = useRef();
    const orbitRef = useRef();

    useFrame((state) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y = state.clock.elapsedTime * orbitSpeed;
        }
        if (planetRef.current) {
            planetRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
        }
    });

    return (
        <group ref={orbitRef}>
            <group position={[orbitRadius, 0, 0]}>
                <mesh ref={planetRef}>
                    <sphereGeometry args={[size, 32, 32]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.2}
                        roughness={0.7}
                    />
                </mesh>
                {hasRings && (
                    <mesh rotation={[Math.PI / 2.2, 0, 0]}>
                        <torusGeometry args={[size * 1.8, size * 0.3, 2, 50]} />
                        <meshStandardMaterial
                            color="#d4a574"
                            transparent
                            opacity={0.6}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                )}
            </group>
        </group>
    );
}

// Shooting Star Effect
function ShootingStar() {
    const starRef = useRef();
    const [reset, setReset] = useState(false);

    useFrame((state) => {
        if (starRef.current) {
            starRef.current.position.x -= 0.5;
            starRef.current.position.y -= 0.3;

            if (starRef.current.position.x < -100) {
                starRef.current.position.x = 50 + Math.random() * 50;
                starRef.current.position.y = -20 + Math.random() * 40;
                starRef.current.position.z = -50 + Math.random() * 100;
            }
        }
    });

    return (
        <mesh ref={starRef} position={[50, 20, -30]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
        </mesh>
    );
}

// Galaxy Spiral
function GalaxySpiral() {
    const particlesRef = useRef();
    const count = 15000;

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color('#667eea'),
            new THREE.Color('#764ba2'),
            new THREE.Color('#f093fb'),
            new THREE.Color('#06b6d4'),
            new THREE.Color('#ec4899'),
            new THREE.Color('#8b5cf6'),
            new THREE.Color('#fbbf24'),
        ];

        for (let i = 0; i < count; i++) {
            const radius = Math.random() * 25;
            const spinAngle = radius * 3;
            const branchAngle = ((i % 6) / 6) * Math.PI * 2;

            const x = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 2;
            const z = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 2;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return [positions, colors];
    }, [count]);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Nebula Clouds
function NebulaClouds() {
    const nebula1 = useRef();
    const nebula2 = useRef();
    const nebula3 = useRef();

    useFrame((state) => {
        if (nebula1.current) nebula1.current.rotation.z = state.clock.elapsedTime * 0.01;
        if (nebula2.current) nebula2.current.rotation.z = -state.clock.elapsedTime * 0.015;
        if (nebula3.current) nebula3.current.rotation.z = state.clock.elapsedTime * 0.008;
    });

    return (
        <>
            <mesh ref={nebula1} position={[-15, 10, -20]}>
                <torusGeometry args={[8, 3, 16, 50]} />
                <meshBasicMaterial
                    color="#667eea"
                    transparent
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <mesh ref={nebula2} position={[15, -8, -25]}>
                <torusGeometry args={[10, 4, 16, 50]} />
                <meshBasicMaterial
                    color="#ec4899"
                    transparent
                    opacity={0.08}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <mesh ref={nebula3} position={[0, 0, -30]}>
                <torusGeometry args={[12, 2, 16, 50]} />
                <meshBasicMaterial
                    color="#8b5cf6"
                    transparent
                    opacity={0.12}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </>
    );
}

// Main Galaxy Background
export default function GalaxyBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'radial-gradient(ellipse at bottom, #0a0118 0%, #000000 100%)'
        }}>
            <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />

                {/* Background Stars */}
                <Stars
                    radius={150}
                    depth={80}
                    count={8000}
                    factor={6}
                    saturation={0.3}
                    fade
                    speed={0.5}
                />

                {/* Twinkling Stars */}
                <TwinklingStars />

                {/* Galaxy Spiral */}
                <GalaxySpiral />

                {/* Nebula Clouds */}
                <NebulaClouds />

                {/* Planets */}
                <Planet position={[0, 0, 0]} size={0.8} color="#4169e1" rotationSpeed={0.5} orbitSpeed={0.05} orbitRadius={15} />
                <Planet position={[0, 0, 0]} size={0.6} color="#ff4500" rotationSpeed={0.4} orbitSpeed={0.08} orbitRadius={20} />
                <Planet position={[0, 0, 0]} size={1.2} color="#daa520" rotationSpeed={0.3} orbitSpeed={0.03} orbitRadius={25} hasRings={true} />
                <Planet position={[0, 0, 0]} size={0.5} color="#a0522d" rotationSpeed={0.6} orbitSpeed={0.1} orbitRadius={12} />

                {/* Shooting Stars */}
                <ShootingStar />
            </Canvas>
        </div>
    );
}
