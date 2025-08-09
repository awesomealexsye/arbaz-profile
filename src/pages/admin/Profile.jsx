import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter,
  Save,
  Upload,
  AlertCircle,
  CheckCircle,
  Camera,
  FileText,
  Award,
  Calendar
} from 'lucide-react'
import { portfolioAPI } from '../../lib/supabase'
import toast from 'react-hot-toast'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  title: z.string().min(2, 'Title must be at least 2 characters'),
  tagline: z.string().min(10, 'Tagline must be at least 10 characters'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  location: z.string().min(5, 'Location must be at least 5 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  email: z.string().email('Please enter a valid email'),
  linkedin_url: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  github_url: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal('')),
  twitter_url: z.string().url('Please enter a valid Twitter URL').optional().or(z.literal('')),
  website_url: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  years_experience: z.number().min(0, 'Experience cannot be negative').max(50, 'Experience seems too high'),
  projects_completed: z.number().min(0, 'Projects cannot be negative'),
  clients_satisfied: z.number().min(0, 'Satisfaction rate cannot be negative').max(100, 'Cannot exceed 100%')
})

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: zodResolver(profileSchema)
  })

  useEffect(() => {
    fetchPersonalInfo()
  }, [])

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true)
      const { data, error } = await portfolioAPI.getPersonalInfo()
      
      if (error) {
        console.error('Error fetching personal info:', error)
        toast.error('Failed to load profile data')
        return
      }

      if (data) {
        setPersonalInfo(data)
        // Populate form with existing data
        Object.keys(data).forEach(key => {
          if (key in profileSchema.shape) {
            setValue(key, data[key] || '')
          }
        })
        setValue('years_experience', data.years_experience || 0)
        setValue('projects_completed', data.projects_completed || 0)
        setValue('clients_satisfied', data.clients_satisfied || 0)
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      setSaving(true)
      const { data: updatedData, error } = await portfolioAPI.updatePersonalInfo(data)
      
      if (error) {
        console.error('Error updating profile:', error)
        toast.error('Failed to update profile')
        return
      }

      setPersonalInfo(updatedData)
      reset(data) // Reset form dirty state
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setSaving(false)
    }
  }

  const formFields = [
    {
      section: 'Basic Information',
      fields: [
        { name: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'Enter your full name' },
        { name: 'title', label: 'Professional Title', icon: Award, type: 'text', placeholder: 'e.g., Senior Web Developer' },
        { name: 'tagline', label: 'Tagline', icon: FileText, type: 'text', placeholder: 'Your professional tagline' },
        { name: 'bio', label: 'Bio', icon: FileText, type: 'textarea', placeholder: 'Tell us about yourself...', rows: 4 }
      ]
    },
    {
      section: 'Contact Information',
      fields: [
        { name: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'your@email.com' },
        { name: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+1 (555) 123-4567' },
        { name: 'location', label: 'Location', icon: MapPin, type: 'text', placeholder: 'City, Country' }
      ]
    },
    {
      section: 'Social Links',
      fields: [
        { name: 'linkedin_url', label: 'LinkedIn Profile', icon: Linkedin, type: 'url', placeholder: 'https://linkedin.com/in/username' },
        { name: 'github_url', label: 'GitHub Profile', icon: Github, type: 'url', placeholder: 'https://github.com/username' },
        { name: 'twitter_url', label: 'Twitter Profile', icon: Twitter, type: 'url', placeholder: 'https://twitter.com/username' },
        { name: 'website_url', label: 'Personal Website', icon: Globe, type: 'url', placeholder: 'https://yourwebsite.com' }
      ]
    },
    {
      section: 'Professional Stats',
      fields: [
        { name: 'years_experience', label: 'Years of Experience', icon: Calendar, type: 'number', placeholder: '0' },
        { name: 'projects_completed', label: 'Projects Completed', icon: Award, type: 'number', placeholder: '0' },
        { name: 'clients_satisfied', label: 'Client Satisfaction (%)', icon: CheckCircle, type: 'number', placeholder: '0' }
      ]
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 p-6">
      <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-500/10 via-accent-500/10 to-info-500/10 rounded-3xl p-8 border border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Profile Management</h1>
            <p className="text-slate-300">
              Update your personal information and professional details
            </p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                {personalInfo?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <button className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <button className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
              Change Avatar
            </button>
          </div>
        </div>
      </motion.div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((section, sectionIndex) => (
          <motion.div
            key={section.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">{sectionIndex + 1}</span>
              </div>
              {section.section}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field) => (
                <div 
                  key={field.name} 
                  className={field.type === 'textarea' ? 'md:col-span-2' : ''}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {field.label}
                  </label>
                  
                  <div className="relative">
                    <field.icon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    
                    {field.type === 'textarea' ? (
                      <textarea
                        {...register(field.name)}
                        rows={field.rows || 3}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-700/50 border ${
                          errors[field.name] ? 'border-red-500' : 'border-slate-600'
                        } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300 resize-none`}
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        {...register(field.name, field.type === 'number' ? { valueAsNumber: true } : {})}
                        type={field.type}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-700/50 border ${
                          errors[field.name] ? 'border-red-500' : 'border-slate-600'
                        } rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-300`}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>

                  {errors[field.name] && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm mt-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors[field.name].message}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-end gap-4 pt-6"
        >
          <div className="flex items-center gap-2 text-sm text-slate-400">
            {isDirty && (
              <>
                <AlertCircle className="w-4 h-4 text-warning-400" />
                You have unsaved changes
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={saving || !isDirty}
            className="px-8 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* File Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8"
      >
        <h2 className="text-xl font-semibold text-white mb-6">File Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Resume/CV</h3>
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-brand-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 mb-2">Upload your resume</p>
              <p className="text-sm text-slate-500">PDF, DOC, DOCX (max 5MB)</p>
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Profile Picture</h3>
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-brand-500 transition-colors cursor-pointer">
              <Camera className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 mb-2">Upload profile picture</p>
              <p className="text-sm text-slate-500">JPG, PNG (max 2MB)</p>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  )
}

export default Profile
