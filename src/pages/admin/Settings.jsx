import React, { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Settings as SettingsIcon, Save, Globe, Mail, Shield, RefreshCw } from 'lucide-react'

const Settings = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen w-full bg-slate-900 p-6">
      <div className="space-y-8">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Settings ⚙️
              </h1>
              <p className="text-slate-300">
                Configure your portfolio website settings and preferences
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <SettingsIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </Motion.div>

        {/* Settings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">SEO Settings</h3>
            </div>
            <p className="text-slate-400 mb-4">Configure meta tags, descriptions, and social sharing</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Configure SEO
            </button>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Email Settings</h3>
            </div>
            <p className="text-slate-400 mb-4">Configure contact form and email notifications</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Setup Email
            </button>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Security</h3>
            </div>
            <p className="text-slate-400 mb-4">Manage admin access and security settings</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Security Panel
            </button>
          </Motion.div>
        </div>

        {/* Quick Actions */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl hover:bg-yellow-500/20 transition-colors text-left">
              <RefreshCw className="w-6 h-6 text-yellow-400" />
              <div>
                <h4 className="text-white font-medium">Clear Cache</h4>
                <p className="text-slate-400 text-sm">Clear browser cache and reload</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-colors text-left">
              <Save className="w-6 h-6 text-blue-400" />
              <div>
                <h4 className="text-white font-medium">Backup Data</h4>
                <p className="text-slate-400 text-sm">Export all portfolio data</p>
              </div>
            </button>
          </div>
        </Motion.div>

        {/* Status */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-white">System Status: All Good! ✅</h3>
          </div>
          <p className="text-green-100 mt-2">
            All systems are operational and your portfolio is running smoothly.
          </p>
        </Motion.div>
      </div>
    </div>
  )
}

export default Settings