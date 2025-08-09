import React, { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { AvatarModel } from '../components/AvatarModel'
import { portfolioAPI } from '../lib/supabase'

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
        
        {/* 3D Avatar Visual */}
        <Motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <AvatarModel />
        </Motion.div>
      </div>
    </section>
  )
}


