import React, { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { Settings as SettingsIcon, Save, Globe, Mail, Shield, RefreshCw, Upload, X, Image } from 'lucide-react'
import { supabase, portfolioAPI } from '../../lib/supabase'
import toast from 'react-hot-toast'

const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [siteSettings, setSiteSettings] = useState({})
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [selectedLogoFile, setSelectedLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  useEffect(() => {
    fetchSiteSettings()
  }, [])

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await portfolioAPI.getSiteSettings()
      if (!error && data) {
        const settingsMap = {}
        data.forEach(setting => {
          settingsMap[setting.key] = setting.value
        })
        setSiteSettings(settingsMap)
        
        // Set logo preview if exists
        if (settingsMap.site_logo) {
          setLogoPreview(settingsMap.site_logo)
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const handleLogoSelect = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo size should be less than 2MB')
      return
    }

    setSelectedLogoFile(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => setLogoPreview(e.target?.result)
    reader.readAsDataURL(file)
  }

  const uploadLogoToSupabase = async (file) => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session:', session ? 'Authenticated' : 'Not authenticated')

      const fileExt = file.name.split('.').pop()
      const fileName = `logo-${Date.now()}.${fileExt}`
      const filePath = `branding/${fileName}`

      console.log('Uploading logo to:', filePath)

      const { data, error } = await supabase.storage
        .from('my-bucket')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Logo upload error:', error)
        throw error
      }

      console.log('Logo upload successful:', data)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('my-bucket')
        .getPublicUrl(filePath)

      console.log('Logo public URL:', publicUrl)
      return publicUrl
    } catch (error) {
      console.error('Error uploading logo:', error)
      throw error
    }
  }

  const handleLogoUpload = async () => {
    if (!selectedLogoFile) return

    try {
      setUploadingLogo(true)
      
      // Check authentication first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        toast.error('You must be logged in to upload files')
        console.error('Authentication error:', sessionError)
        return
      }
      
      console.log('User authenticated, proceeding with upload...')
      const logoUrl = await uploadLogoToSupabase(selectedLogoFile)
      
      // Update site settings
      await portfolioAPI.updateSiteSettings('site_logo', logoUrl)
      
      toast.success('Logo uploaded successfully!')
      setSelectedLogoFile(null)
      await fetchSiteSettings()
    } catch (error) {
      toast.error(`Failed to upload logo: ${error.message}`)
      console.error('Logo upload error:', error)
    } finally {
      setUploadingLogo(false)
    }
  }

  const clearLogoSelection = () => {
    setSelectedLogoFile(null)
    setLogoPreview(siteSettings.site_logo || null)
  }

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

        {/* Logo Upload Section */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Image className="w-6 h-6 text-brand-400" />
            Brand Logo
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Logo */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Current Logo</h3>
              <div className="aspect-video rounded-xl bg-slate-700/50 border border-slate-600 flex items-center justify-center">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Site logo" 
                    className="max-h-full max-w-full object-contain p-4"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <Image className="w-12 h-12 mx-auto mb-2" />
                    <p>No logo uploaded</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload New Logo */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Upload New Logo</h3>
              
              <div className="space-y-4">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-brand-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoSelect}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer block">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 mb-2">Upload your logo</p>
                    <p className="text-sm text-slate-500">PNG, JPG, SVG (max 2MB)</p>
                    <p className="text-xs text-slate-600 mt-1">Recommended: 200x60px</p>
                  </label>
                </div>

                {/* Upload Actions */}
                {selectedLogoFile && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleLogoUpload}
                      disabled={uploadingLogo}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {uploadingLogo ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Logo
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearLogoSelection}
                      className="px-4 py-2 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
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