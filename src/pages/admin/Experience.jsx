import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Briefcase,
  Calendar,
  Award,
  TrendingUp,
  Building,
  AlertCircle,
  CheckCircle,
  Search,
  Filter
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const experienceSchema = z.object({
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  period_start: z.string().min(1, 'Start date is required'),
  period_end: z.string().nullable().optional(),
  duration: z.string().min(1, 'Duration is required'),
  icon: z.string().min(1, 'Icon is required'),
  gradient_from: z.string().min(1, 'Gradient start color is required'),
  gradient_to: z.string().min(1, 'Gradient end color is required'),
  description: z.string().min(10, 'Description must be at least 10 characters')
})

const achievementSchema = z.object({
  icon: z.string().min(1, 'Icon is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  metric: z.string().min(1, 'Metric is required')
})

const Experience = () => {
  const [loading, setLoading] = useState(true)
  const [experiences, setExperiences] = useState([])
  const [showExperienceModal, setShowExperienceModal] = useState(false)
  const [showAchievementModal, setShowAchievementModal] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null)
  const [editingAchievement, setEditingAchievement] = useState(null)
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const experienceForm = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: '',
      title: '',
      period_start: '',
      period_end: '',
      duration: '',
      icon: '',
      gradient_from: 'from-brand-500',
      gradient_to: 'to-brand-600',
      description: ''
    }
  })

  const achievementForm = useForm({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      icon: '',
      description: '',
      metric: ''
    }
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('experiences')
        .select(`
          *,
          achievements:achievements(*)
        `)
        .eq('is_active', true)
        .order('order_index')

      if (error) {
        console.error('Error fetching experiences:', error)
        toast.error('Failed to load experiences')
      } else {
        setExperiences(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Experience Management Functions
  const handleExperienceSubmit = async (data) => {
    try {
      if (editingExperience) {
        // Update existing experience
        const { data: updatedExperience, error } = await supabase
          .from('experiences')
          .update({
            ...data,
            period_end: data.period_end || null
          })
          .eq('id', editingExperience.id)
          .select(`
            *,
            achievements:achievements(*)
          `)
          .single()

        if (error) throw error

        setExperiences(prev => prev.map(exp => 
          exp.id === editingExperience.id ? updatedExperience : exp
        ))
        toast.success('Experience updated successfully!')
      } else {
        // Create new experience
        const { data: newExperience, error } = await supabase
          .from('experiences')
          .insert({
            ...data,
            period_end: data.period_end || null
          })
          .select(`
            *,
            achievements:achievements(*)
          `)
          .single()

        if (error) throw error

        setExperiences(prev => [...prev, newExperience])
        toast.success('Experience created successfully!')
      }

      setShowExperienceModal(false)
      setEditingExperience(null)
      experienceForm.reset()
    } catch (error) {
      console.error('Error saving experience:', error)
      toast.error('Failed to save experience')
    }
  }

  const handleDeleteExperience = async (experienceId) => {
    if (!confirm('Are you sure you want to delete this experience? All associated achievements will also be deleted.')) return

    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', experienceId)

      if (error) throw error

      setExperiences(prev => prev.filter(exp => exp.id !== experienceId))
      toast.success('Experience deleted successfully!')
    } catch (error) {
      console.error('Error deleting experience:', error)
      toast.error('Failed to delete experience')
    }
  }

  // Achievement Management Functions
  const handleAchievementSubmit = async (data) => {
    try {
      if (editingAchievement) {
        // Update existing achievement
        const { data: updatedAchievement, error } = await supabase
          .from('achievements')
          .update(data)
          .eq('id', editingAchievement.id)
          .select()
          .single()

        if (error) throw error

        setExperiences(prev => prev.map(exp => 
          exp.id === selectedExperience.id ? {
            ...exp,
            achievements: exp.achievements.map(ach => 
              ach.id === editingAchievement.id ? updatedAchievement : ach
            )
          } : exp
        ))
        toast.success('Achievement updated successfully!')
      } else {
        // Create new achievement
        const { data: newAchievement, error } = await supabase
          .from('achievements')
          .insert({
            ...data,
            experience_id: selectedExperience.id
          })
          .select()
          .single()

        if (error) throw error

        setExperiences(prev => prev.map(exp => 
          exp.id === selectedExperience.id ? {
            ...exp,
            achievements: [...(exp.achievements || []), newAchievement]
          } : exp
        ))
        toast.success('Achievement created successfully!')
      }

      setShowAchievementModal(false)
      setEditingAchievement(null)
      achievementForm.reset()
    } catch (error) {
      console.error('Error saving achievement:', error)
      toast.error('Failed to save achievement')
    }
  }

  const handleDeleteAchievement = async (achievementId) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return

    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', achievementId)

      if (error) throw error

      setExperiences(prev => prev.map(exp => 
        exp.id === selectedExperience.id ? {
          ...exp,
          achievements: exp.achievements.filter(ach => ach.id !== achievementId)
        } : exp
      ))
      toast.success('Achievement deleted successfully!')
    } catch (error) {
      console.error('Error deleting achievement:', error)
      toast.error('Failed to delete achievement')
    }
  }

  // Filter experiences based on search
  const filteredExperiences = experiences.filter(exp => 
    exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openExperienceModal = (experience = null) => {
    setEditingExperience(experience)
    if (experience) {
      experienceForm.reset({
        company: experience.company,
        title: experience.title,
        period_start: experience.period_start,
        period_end: experience.period_end || '',
        duration: experience.duration,
        icon: experience.icon,
        gradient_from: experience.gradient_from,
        gradient_to: experience.gradient_to,
        description: experience.description
      })
    } else {
      experienceForm.reset()
    }
    setShowExperienceModal(true)
  }

  const openAchievementModal = (experience, achievement = null) => {
    setSelectedExperience(experience)
    setEditingAchievement(achievement)
    if (achievement) {
      achievementForm.reset({
        icon: achievement.icon,
        description: achievement.description,
        metric: achievement.metric
      })
    } else {
      achievementForm.reset()
    }
    setShowAchievementModal(true)
  }

  const iconOptions = [
    { value: '🚀', label: '🚀 Rocket' },
    { value: '💻', label: '💻 Computer' },
    { value: '⭐', label: '⭐ Star' },
    { value: '🏢', label: '🏢 Building' },
    { value: '🎯', label: '🎯 Target' },
    { value: '📊', label: '📊 Chart' },
    { value: '👥', label: '👥 Team' },
    { value: '⚡', label: '⚡ Lightning' },
    { value: '🌐', label: '🌐 Globe' },
    { value: '🔗', label: '🔗 Link' }
  ]

  const gradientOptions = [
    { from: 'from-brand-500', to: 'to-brand-600', label: 'Brand Blue' },
    { from: 'from-accent-500', to: 'to-accent-600', label: 'Accent Pink' },
    { from: 'from-success-500', to: 'to-success-600', label: 'Success Green' },
    { from: 'from-warning-500', to: 'to-warning-600', label: 'Warning Amber' },
    { from: 'from-info-500', to: 'to-info-600', label: 'Info Cyan' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading experiences...</p>
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Experience Management</h1>
            <p className="text-slate-300">
              Manage your work experience, roles, and achievements
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <span className="text-white font-semibold">{experiences.length}</span>
              <span className="text-slate-400 text-sm">Experiences</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <button
          onClick={() => openExperienceModal()}
          className="px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </motion.div>

      {/* Experiences List */}
      <div className="space-y-6">
        {filteredExperiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300"
          >
            {/* Experience Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${experience.gradient_from} ${experience.gradient_to} flex items-center justify-center text-white text-2xl`}>
                  {experience.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{experience.title}</h3>
                  <p className="text-lg text-slate-300 mb-1">{experience.company}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {experience.period_start} - {experience.period_end || 'Present'}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {experience.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => openExperienceModal(experience)}
                  className="p-2 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteExperience(experience.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 mb-6 leading-relaxed">{experience.description}</p>

            {/* Achievements Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning-400" />
                  Key Achievements ({experience.achievements?.length || 0})
                </h4>
                <button
                  onClick={() => openAchievementModal(experience)}
                  className="px-4 py-2 bg-gradient-to-r from-success-500 to-success-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Achievement
                </button>
              </div>

              {experience.achievements && experience.achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.achievements.map((achievement, achIndex) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: achIndex * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors group"
                    >
                      <span className="text-xl flex-shrink-0">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-slate-300 leading-relaxed mb-2">
                          {achievement.description}
                        </p>
                        <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white">
                          {achievement.metric}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                          onClick={() => openAchievementModal(experience, achievement)}
                          className="p-1 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteAchievement(achievement.id)}
                          className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-700/20 rounded-xl border-2 border-dashed border-slate-600">
                  <Award className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No achievements added yet</p>
                  <button
                    onClick={() => openAchievementModal(experience)}
                    className="mt-3 text-sm text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Add your first achievement
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {filteredExperiences.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No experiences found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first work experience'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => openExperienceModal()}
                className="px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add Experience
              </button>
            )}
          </div>
        )}
      </div>

      {/* Experience Modal */}
      <AnimatePresence>
        {showExperienceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                </h2>
                <button
                  onClick={() => {
                    setShowExperienceModal(false)
                    setEditingExperience(null)
                    experienceForm.reset()
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={experienceForm.handleSubmit(handleExperienceSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Company Name *
                    </label>
                    <input
                      {...experienceForm.register('company')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., TechCorp Solutions"
                    />
                    {experienceForm.formState.errors.company && (
                      <p className="text-red-400 text-sm mt-1">{experienceForm.formState.errors.company.message}</p>
                    )}
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Job Title *
                    </label>
                    <input
                      {...experienceForm.register('title')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., Senior Frontend Engineer"
                    />
                    {experienceForm.formState.errors.title && (
                      <p className="text-red-400 text-sm mt-1">{experienceForm.formState.errors.title.message}</p>
                    )}
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Start Date *
                    </label>
                    <input
                      {...experienceForm.register('period_start')}
                      type="date"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    {experienceForm.formState.errors.period_start && (
                      <p className="text-red-400 text-sm mt-1">{experienceForm.formState.errors.period_start.message}</p>
                    )}
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      End Date (Optional)
                    </label>
                    <input
                      {...experienceForm.register('period_end')}
                      type="date"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <p className="text-xs text-slate-400 mt-1">Leave empty if currently working here</p>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Duration *
                    </label>
                    <input
                      {...experienceForm.register('duration')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., 2 years, 6 months"
                    />
                    {experienceForm.formState.errors.duration && (
                      <p className="text-red-400 text-sm mt-1">{experienceForm.formState.errors.duration.message}</p>
                    )}
                  </div>

                  {/* Icon */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Icon *
                    </label>
                    <select
                      {...experienceForm.register('icon')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Select an icon</option>
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {experienceForm.formState.errors.icon && (
                      <p className="text-red-400 text-sm mt-1">{experienceForm.formState.errors.icon.message}</p>
                    )}
                  </div>

                  {/* Gradient Colors */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Gradient Start *
                    </label>
                    <select
                      {...experienceForm.register('gradient_from')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {gradientOptions.map(option => (
                        <option key={option.from} value={option.from}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Gradient End *
                    </label>
                    <select
                      {...experienceForm.register('gradient_to')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {gradientOptions.map(option => (
                        <option key={option.to} value={option.to}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description *
                    </label>
                    <textarea
                      {...experienceForm.register('description')}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      placeholder="Describe your role, responsibilities, and key contributions..."
                    />
                    {experienceForm.formState.errors.description && (
                      <p className="text-red-400 text-sm mt-1">{experienceForm.formState.errors.description.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowExperienceModal(false)
                      setEditingExperience(null)
                      experienceForm.reset()
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={experienceForm.formState.isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {experienceForm.formState.isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingExperience ? 'Update Experience' : 'Create Experience'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Modal */}
      <AnimatePresence>
        {showAchievementModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingAchievement ? 'Edit Achievement' : 'Add Achievement'}
                </h2>
                <button
                  onClick={() => {
                    setShowAchievementModal(false)
                    setEditingAchievement(null)
                    achievementForm.reset()
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedExperience && (
                <div className="mb-6 p-4 bg-slate-800/30 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Adding achievement for:</p>
                  <p className="text-white font-semibold">{selectedExperience.title} at {selectedExperience.company}</p>
                </div>
              )}

              <form onSubmit={achievementForm.handleSubmit(handleAchievementSubmit)} className="space-y-6">
                <div className="space-y-6">
                  {/* Icon */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Icon *
                    </label>
                    <select
                      {...achievementForm.register('icon')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Select an icon</option>
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {achievementForm.formState.errors.icon && (
                      <p className="text-red-400 text-sm mt-1">{achievementForm.formState.errors.icon.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Achievement Description *
                    </label>
                    <textarea
                      {...achievementForm.register('description')}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      placeholder="Describe your achievement and its impact..."
                    />
                    {achievementForm.formState.errors.description && (
                      <p className="text-red-400 text-sm mt-1">{achievementForm.formState.errors.description.message}</p>
                    )}
                  </div>

                  {/* Metric */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Key Metric *
                    </label>
                    <input
                      {...achievementForm.register('metric')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., 95%, $50K saved, 4 devs, etc."
                    />
                    {achievementForm.formState.errors.metric && (
                      <p className="text-red-400 text-sm mt-1">{achievementForm.formState.errors.metric.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAchievementModal(false)
                      setEditingAchievement(null)
                      achievementForm.reset()
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={achievementForm.formState.isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {achievementForm.formState.isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingAchievement ? 'Update Achievement' : 'Create Achievement'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

export default Experience
