import React, { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { portfolioAPI } from '../lib/supabase'

export function About() {
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

  // Default highlights if no data available
  const highlights = [
    { icon: '🚀', text: `Delivered ${personalInfo?.projects_completed || 30}+ production projects across startups and agencies` },
    { icon: '⚡', text: 'Performance-focused: Lighthouse ≥ 90 targets met consistently' },
    { icon: '🎨', text: 'Strong UX eye: animations, micro-interactions, typography' },
    { icon: '🔧', text: `${personalInfo?.years_experience || 7}+ years mastering modern web technologies` },
  ]

  if (loading) {
    return (
      <section className="container-safe py-16 md:py-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container-safe py-16 md:py-24">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-black tracking-tight mb-6">
          <span className="gradient-text">About Me</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {personalInfo?.bio || `I'm ${personalInfo?.name || 'Arbaz'}, a passionate web developer with ${personalInfo?.years_experience || 7}+ years of experience 
          building scalable, beautiful, and performant web solutions. I specialize in React, Node.js, Laravel, 
          and modern tooling with a keen eye for design and user experience.`}
        </p>
      </Motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              ✨ <span className="gradient-text">Highlights</span>
            </h3>
            <div className="space-y-4">
              {highlights.map((highlight, i) => (
                <Motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-brand-50/50 to-accent-50/50 dark:from-brand-950/20 dark:to-accent-950/20 border border-brand-100/50 dark:border-brand-800/20"
                >
                  <span className="text-2xl flex-shrink-0">{highlight.icon}</span>
                  <p className="text-slate-700 dark:text-slate-300">{highlight.text}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              📍 <span className="gradient-text">Location</span>
            </h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
              Based in <span className="font-semibold text-brand-600">{personalInfo?.location || 'Ballabgarh, Faridabad'}</span>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Available for remote work and local collaborations in the Delhi NCR region.
            </p>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              💡 <span className="gradient-text">Philosophy</span>
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              I believe great web experiences come from the perfect blend of beautiful design, 
              clean code, and thoughtful user interactions. Every project is an opportunity 
              to create something amazing.
            </p>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}


