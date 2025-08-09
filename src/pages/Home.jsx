import React, { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { portfolioAPI } from '../lib/supabase'
import profileImage from '../assets/ 3d/me.png'

export function Home() {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPersonalInfo()
  }, [])

  const fetchPersonalInfo = async () => {
    try {
      const { data, error } = await portfolioAPI.getPersonalInfo()
      if (!error && data) {
        setPersonalInfo(data)
      }
    } catch (error) {
      console.error('Error fetching personal info:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="container-safe py-24 md:py-32 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </section>
    )
  }
  return (
    <section className="container-safe py-24 md:py-32 relative">
      {/* Hero Content */}
      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <Motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-100 to-accent-100 text-brand-800 text-sm font-medium mb-6 dark:from-brand-900/50 dark:to-accent-900/50 dark:text-brand-200"
          >
            ✨ Available for hire
          </Motion.div>
          
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-6xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6"
          >
            <span className="gradient-text">{personalInfo?.name || 'Arbaz'}</span>
            <br />
            <span className="text-slate-800 dark:text-slate-200">{personalInfo?.title || 'Senior Web Developer'}</span>
          </Motion.h1>
          
          <Motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
          >
            {personalInfo?.tagline || 'I craft beautiful, performant, and accessible web experiences that users love.'}
            {personalInfo?.location && (
              <>
                <br />
                <span className="font-semibold text-brand-600">📍 {personalInfo.location}</span>
              </>
            )}
          </Motion.p>
          
          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <NavLink to="/contact" className="btn-primary text-lg px-8 py-4">
              🚀 Let's Work Together
            </NavLink>
            <NavLink to="/projects" className="btn-outline text-lg px-8 py-4">
              👁️ View My Work
            </NavLink>
          </Motion.div>
          
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">Technologies I love</p>
            <div className="flex flex-wrap gap-3">
              {['⚛️ React', '🟢 Node.js', '🐘 Laravel', '🎨 Tailwind CSS', '🔗 GraphQL', '⚡ Supabase'].map((tech, i) => (
                <Motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                  className="badge hover:scale-110 transition-transform duration-300 cursor-default"
                >
                  {tech}
                </Motion.span>
              ))}
            </div>
          </Motion.div>
        </Motion.div>
        
        {/* Profile Image - Transparent Background */}
        <Motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Main profile image - No box, preserve transparency */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <img
                src={personalInfo?.avatar_url || profileImage}
                alt={personalInfo?.name || "Arbaz Khan"}
                className="w-auto h-[500px] md:h-[600px] max-w-full object-contain drop-shadow-2xl"
                style={{ 
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))'
                }}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='none'/%3E%3Ctext x='200' y='300' text-anchor='middle' dy='0.3em' font-family='system-ui' font-size='80' fill='%2364748b'%3E👤%3C/text%3E%3C/svg%3E"
                }}
              />
              
              {/* Floating elements positioned around the character */}
              <Motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute top-8 -right-4 w-12 h-12 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full flex items-center justify-center shadow-xl animate-float"
              >
                <span className="text-white text-lg font-bold">✨</span>
              </Motion.div>
              
              <Motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute top-1/3 -left-6 w-10 h-10 bg-gradient-to-r from-success-500 to-info-500 rounded-full flex items-center justify-center shadow-xl animate-float"
                style={{ animationDelay: '1s' }}
              >
                <span className="text-white text-sm">🚀</span>
              </Motion.div>

              <Motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="absolute bottom-20 -right-8 w-8 h-8 bg-gradient-to-r from-warning-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-float"
                style={{ animationDelay: '2s' }}
              >
                <span className="text-white text-xs">⚡</span>
              </Motion.div>
              
              {/* Status indicator - positioned at top right */}
              <Motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="absolute -top-4 right-4 flex items-center gap-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-full px-4 py-2 shadow-xl border border-white/20"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Available</span>
              </Motion.div>
            </Motion.div>
            
            {/* Enhanced background decorative elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
              <Motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.8 }}
                className="absolute top-1/4 -right-12 w-24 h-24 bg-gradient-to-r from-brand-200/20 to-accent-200/20 rounded-full blur-2xl animate-pulse"
              />
              <Motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.2 }}
                className="absolute bottom-1/3 -left-16 w-32 h-32 bg-gradient-to-r from-info-200/20 to-success-200/20 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: '1000ms' }}
              />
              <Motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.6 }}
                className="absolute top-1/2 right-0 w-20 h-20 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: '2000ms' }}
              />
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}


