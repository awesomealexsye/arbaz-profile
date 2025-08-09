import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { motion as Motion } from 'framer-motion'

// 3D Avatar Model Component
function Avatar({ ...props }) {
  const group = useRef()
  const { scene } = useGLTF('/src/assets/ 3d/my-avatar.glb')
  
  // Subtle rotation animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  return (
    <group ref={group} {...props}>
      <primitive object={scene} scale={1.2} position={[0, -1.5, 0]} />
    </group>
  )
}

// Loading fallback component
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Loading 3D Avatar...</p>
      </div>
    </div>
  )
}

// Error fallback component
function ErrorFallback() {
  return (
    <div className="aspect-square surface relative overflow-hidden flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">👤</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">3D Avatar</p>
      </div>
      <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/30" />
    </div>
  )
}

// Main Avatar Model Component
export function AvatarModel() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set loading timeout
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (error) {
    return <ErrorFallback />
  }

  return (
    <Motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-full h-full"
    >
      <div className="aspect-square surface relative overflow-hidden">
        {loading && <Loader />}
        
        <Canvas
          camera={{ 
            position: [0, 0, 5], 
            fov: 50,
            near: 0.1,
            far: 1000 
          }}
          style={{ background: 'transparent' }}
          onCreated={() => setLoading(false)}
          onError={() => setError(true)}
        >
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          {/* Environment for realistic reflections */}
          <Environment preset="studio" />
          
          {/* 3D Avatar */}
          <Suspense fallback={null}>
            <Avatar />
            <ContactShadows 
              position={[0, -1.5, 0]} 
              opacity={0.3} 
              scale={3} 
              blur={2} 
              far={2} 
            />
          </Suspense>
          
          {/* Interactive controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
        
        {/* Gradient overlay for better integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
        
        {/* Professional accent elements */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          3D Avatar
        </div>
      </div>
    </Motion.div>
  )
}

// Preload the model for better performance
useGLTF.preload('/src/assets/ 3d/my-avatar.glb')
