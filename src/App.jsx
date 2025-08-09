import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { portfolioAPI } from './lib/supabase'
import './App.css'

function App() {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [siteSettings, setSiteSettings] = useState({})

  useEffect(() => {
    fetchPersonalInfo()
    fetchSiteSettings()
  }, [])

  const fetchPersonalInfo = async () => {
    try {
      const { data, error } = await portfolioAPI.getPersonalInfo()
      if (!error && data) {
        setPersonalInfo(data)
      }
    } catch (error) {
      console.error('Error fetching personal info:', error)
    }
  }

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await portfolioAPI.getSiteSettings()
      if (!error && data) {
        const settingsMap = {}
        data.forEach(setting => {
          settingsMap[setting.key] = setting.value
        })
        setSiteSettings(settingsMap)
      }
    } catch (error) {
      console.error('Error fetching site settings:', error)
    }
  }
  return (
    <div className="min-h-dvh flex flex-col website-root">
      {/* Stunning animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-brand-50 to-accent-50 dark:from-slate-950 dark:via-brand-950 dark:to-accent-950" />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-brand-400/30 to-info-400/30 rounded-full blur-3xl animate-pulse floating" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-400/25 to-warning-400/25 rounded-full blur-3xl animate-pulse delay-1000 floating" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-success-400/20 to-info-400/20 rounded-full blur-3xl animate-pulse delay-2000 floating" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-warning-400/15 to-brand-400/15 rounded-full blur-3xl animate-pulse delay-3000 floating" style={{ animationDelay: '1s' }} />
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>
      
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/10 dark:border-slate-800/20 dark:bg-slate-900/10">
        <div className="container-safe flex h-20 items-center justify-between">
          <NavLink to="/" className="flex items-center">
            {siteSettings.site_logo ? (
              <img 
                src={siteSettings.site_logo} 
                alt="Logo" 
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="font-bold tracking-tight text-2xl gradient-text">
                Arbaz
              </span>
            )}
          </NavLink>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {[
              ['/', 'Home'],
              ['/about', 'About'],
              ['/projects', 'Work'],
              ['/skills', 'Skills'],
              ['/experience', 'Experience'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <NavLink 
                key={to} 
                to={to} 
                className={({ isActive }) => 
                  `transition-all duration-300 hover:text-brand-600 ${isActive ? 'text-brand-600 font-semibold' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle theme"
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="glass-card size-12 rounded-full p-0 hover:scale-110 transition-transform duration-300"
            >
              <span className="text-xl">🌓</span>
            </button>
            <NavLink to="/contact" className="btn-primary">
              ✨ Hire Me
            </NavLink>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-xl dark:border-slate-800/10 dark:bg-slate-900/5">
        <div className="container-safe py-12 text-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Arbaz. All rights reserved.</p>
          <div className="flex gap-6 text-slate-600 dark:text-slate-400">
            {personalInfo?.github_url && (
              <a 
                href={personalInfo.github_url} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-brand-600 transition-colors duration-300 hover:scale-110 transform"
              >
                🔗 GitHub
              </a>
            )}
            {personalInfo?.linkedin_url && (
              <a 
                href={personalInfo.linkedin_url} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-brand-600 transition-colors duration-300 hover:scale-110 transform"
              >
                💼 LinkedIn
              </a>
            )}
            <a 
              href={`mailto:${personalInfo?.email || 'ak.khanarbaz777@gmail.com'}`} 
              className="hover:text-brand-600 transition-colors duration-300 hover:scale-110 transform"
            >
              ✉️ Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
