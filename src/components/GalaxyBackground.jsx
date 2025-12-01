import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Galaxy Particles Component
function GalaxyParticles() {
    const particlesRef = useRef();
    const count = 8000; // Increased particle count

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
        ];

        for (let i = 0; i < count; i++) {
            // Spiral galaxy shape with more spread
            const radius = Math.random() * 20;
            const spinAngle = radius * 2.5;
            const branchAngle = ((i % 5) / 5) * Math.PI * 2;

            const x = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 3;
            const y = (Math.random() - 0.5) * 4;
            const z = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 3;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Random color from palette with more vibrant colors
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return [positions, colors];
    }, [count]);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
            particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.15;
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
                size={0.12}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Nebula effect - Enhanced
function Nebula() {
    const meshRef = useRef();
    const meshRef2 = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
        }
        if (meshRef2.current) {
            meshRef2.current.rotation.z = -state.clock.elapsedTime * 0.015;
        }
    });

    return (
        <>
            <mesh ref={meshRef} position={[0, 0, -8]}>
                <torusGeometry args={[12, 4, 16, 100]} />
                <meshBasicMaterial
                    color="#667eea"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <mesh ref={meshRef2} position={[0, 0, -10]}>
                <torusGeometry args={[15, 3, 16, 100]} />
                <meshBasicMaterial
                    color="#ec4899"
                    transparent
                    opacity={0.1}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </>
    );
}

// Floating orbs
function FloatingOrbs() {
    const orbsRef = useRef();

    useFrame((state) => {
        if (orbsRef.current) {
            orbsRef.current.children.forEach((orb, i) => {
                orb.position.y = Math.sin(state.clock.elapsedTime + i * 2) * 2;
                orb.position.x = Math.cos(state.clock.elapsedTime * 0.5 + i * 2) * 10;
            });
        }
    });

    return (
        <group ref={orbsRef}>
            <mesh position={[-10, 5, -5]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="#667eea" transparent opacity={0.6} />
            </mesh>
            <mesh position={[10, -5, -5]}>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshBasicMaterial color="#ec4899" transparent opacity={0.6} />
            </mesh>
            <mesh position={[0, 8, -8]}>
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
            </mesh>
        </group>
    );
}

// Main Galaxy Background Component
export default function GalaxyBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            background: 'radial-gradient(ellipse at bottom, #0a0118 0%, #050010 100%)'
        }}>
            <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                <ambientLight intensity={0.6} />
                <Stars
                    radius={150}
                    depth={60}
                    count={7000}
                    factor={5}
                    saturation={0.2}
                    fade
                    speed={1.5}
                />
                <GalaxyParticles />
                <Nebula />
                <FloatingOrbs />
            </Canvas>
        </div>
    );
}
