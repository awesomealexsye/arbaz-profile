import React, { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { portfolioAPI } from './lib/supabase'
import { 
  Menu, 
  X, 
  Home, 
  User, 
  FolderOpen, 
  Code, 
  Briefcase, 
  Mail,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react'
import './App.css'

function App() {
  const [personalInfo, setPersonalInfo] = useState(null)
  const [siteSettings, setSiteSettings] = useState({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    fetchPersonalInfo()
    fetchSiteSettings()
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }

    // Keyboard navigation for mobile menu
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    // Listen for logo updates from admin panel
    const handleLogoUpdate = (event) => {
      console.log('Logo update event received:', event.detail)
      const { logoUrl } = event.detail
      setSiteSettings(prev => ({ ...prev, site_logo: logoUrl }))
      // Also refresh the settings to be sure
      fetchSiteSettings()
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('logoUpdated', handleLogoUpdate)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('logoUpdated', handleLogoUpdate)
    }
  }, [isMobileMenuOpen])

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

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navigationItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About', icon: User },
    { to: '/projects', label: 'Work', icon: FolderOpen },
    { to: '/skills', label: 'Skills', icon: Code },
    { to: '/experience', label: 'Experience', icon: Briefcase },
    { to: '/contact', label: 'Contact', icon: Mail },
  ]

  return (
    <div className="min-h-dvh flex flex-col website-root">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-brand-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
      >
        Skip to main content
      </a>
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
      
      {/* Enhanced Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/5 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 dark:border-slate-800/20 dark:bg-slate-900/5 transition-all duration-300">
        <div className="container-safe flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center group transition-all duration-300 hover:scale-105"
            onClick={closeMobileMenu}
          >
            {siteSettings.site_logo ? (
              <img 
                src={siteSettings.site_logo} 
                alt="Logo" 
                className="h-12 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:shadow-brand-500/50 transition-all duration-300">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold tracking-tight text-2xl gradient-text">
                  Arbaz
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigationItems.map((item, index) => (
              <NavLink 
                key={item.to} 
                to={item.to} 
                className={({ isActive }) => 
                  `nav-item group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-500/20 to-accent-500/20 text-brand-600 dark:text-brand-400 shadow-lg backdrop-blur-sm border border-brand-200/30 dark:border-brand-800/30' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white/10 dark:hover:bg-slate-800/20'
                  }`
                }
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-4 h-4 transition-all duration-300 group-hover:scale-110" />
                <span className="hidden xl:block">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDarkMode}
              onClick={toggleDarkMode}
              className="glass-card size-11 rounded-xl p-0 hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/20 group focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Hire Me Button - Desktop */}
            <NavLink 
              to="/contact" 
              className="hidden md:flex btn-primary items-center gap-2 group"
              onClick={closeMobileMenu}
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span>Hire Me</span>
            </NavLink>

            {/* Mobile Menu Toggle */}
            <button
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMobileMenu}
              className="lg:hidden glass-card size-11 rounded-xl p-0 hover:scale-110 transition-all duration-300 hover:shadow-lg group focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="border-t border-white/10 dark:border-slate-800/20 bg-white/5 dark:bg-slate-900/5 backdrop-blur-xl">
            <nav className="container-safe py-6 space-y-2">
              {navigationItems.map((item, index) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `nav-item group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-500/20 to-accent-500/20 text-brand-600 dark:text-brand-400 shadow-lg border border-brand-200/30 dark:border-brand-800/30'
                        : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white/10 dark:hover:bg-slate-800/20'
                    }`
                  }
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isMobileMenuOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                  }}
                >
                  <item.icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
              
              {/* Mobile Hire Me Button */}
              <NavLink
                to="/contact"
                onClick={closeMobileMenu}
                className="btn-primary w-full mt-4 group justify-center"
                style={{ 
                  animationDelay: `${navigationItems.length * 100}ms`,
                  animation: isMobileMenuOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                }}
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>Hire Me</span>
              </NavLink>
            </nav>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] lg:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </header>

      <main id="main-content" className="flex-1" tabIndex="-1">
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