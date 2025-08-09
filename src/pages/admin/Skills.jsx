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
  Code, 
  Tag,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  MoreHorizontal,
  Palette,
  Server,
  Database,
  Settings
} from 'lucide-react'
import { portfolioAPI, supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const skillSchema = z.object({
  name: z.string().min(2, 'Skill name must be at least 2 characters'),
  icon: z.string().min(1, 'Icon is required'),
  level: z.number().min(0, 'Level cannot be negative').max(100, 'Level cannot exceed 100'),
  years_experience: z.number().min(0, 'Experience cannot be negative').max(50, 'Experience seems too high'),
  description: z.string().optional(),
  category_id: z.string().min(1, 'Category is required')
})

const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon: z.string().min(1, 'Icon is required'),
  gradient_from: z.string().min(1, 'Gradient start color is required'),
  gradient_to: z.string().min(1, 'Gradient end color is required')
})

const Skills = () => {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [skills, setSkills] = useState([])
  const [activeTab, setActiveTab] = useState('skills')
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const skillForm = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: '',
      icon: '',
      level: 0,
      years_experience: 0,
      description: '',
      category_id: ''
    }
  })

  const categoryForm = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
      icon: '',
      gradient_from: 'from-brand-500',
      gradient_to: 'to-brand-600'
    }
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [categoriesResult, skillsResult] = await Promise.all([
        portfolioAPI.getSkillCategories(),
        portfolioAPI.getSkills()
      ])

      if (categoriesResult.error) {
        console.error('Error fetching categories:', categoriesResult.error)
        toast.error('Failed to load categories')
      } else {
        setCategories(categoriesResult.data || [])
      }

      if (skillsResult.error) {
        console.error('Error fetching skills:', skillsResult.error)
        toast.error('Failed to load skills')
      } else {
        setSkills(skillsResult.data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Skill Management Functions
  const handleSkillSubmit = async (data) => {
    try {
      if (editingSkill) {
        // Update existing skill
        const { data: updatedSkill, error } = await supabase
          .from('skills')
          .update(data)
          .eq('id', editingSkill.id)
          .select('*, category:skill_categories(*)')
          .single()

        if (error) throw error

        setSkills(prev => prev.map(skill => 
          skill.id === editingSkill.id ? updatedSkill : skill
        ))
        toast.success('Skill updated successfully!')
      } else {
        // Create new skill
        const { data: newSkill, error } = await supabase
          .from('skills')
          .insert(data)
          .select('*, category:skill_categories(*)')
          .single()

        if (error) throw error

        setSkills(prev => [...prev, newSkill])
        toast.success('Skill created successfully!')
      }

      setShowSkillModal(false)
      setEditingSkill(null)
      skillForm.reset()
    } catch (error) {
      console.error('Error saving skill:', error)
      toast.error('Failed to save skill')
    }
  }

  const handleDeleteSkill = async (skillId) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', skillId)

      if (error) throw error

      setSkills(prev => prev.filter(skill => skill.id !== skillId))
      toast.success('Skill deleted successfully!')
    } catch (error) {
      console.error('Error deleting skill:', error)
      toast.error('Failed to delete skill')
    }
  }

  // Category Management Functions
  const handleCategorySubmit = async (data) => {
    try {
      if (editingCategory) {
        // Update existing category
        const { data: updatedCategory, error } = await supabase
          .from('skill_categories')
          .update(data)
          .eq('id', editingCategory.id)
          .select()
          .single()

        if (error) throw error

        setCategories(prev => prev.map(cat => 
          cat.id === editingCategory.id ? updatedCategory : cat
        ))
        toast.success('Category updated successfully!')
      } else {
        // Create new category
        const { data: newCategory, error } = await supabase
          .from('skill_categories')
          .insert(data)
          .select()
          .single()

        if (error) throw error

        setCategories(prev => [...prev, newCategory])
        toast.success('Category created successfully!')
      }

      setShowCategoryModal(false)
      setEditingCategory(null)
      categoryForm.reset()
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error('Failed to save category')
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    const skillsInCategory = skills.filter(skill => skill.category_id === categoryId)
    
    if (skillsInCategory.length > 0) {
      toast.error('Cannot delete category with existing skills')
      return
    }

    if (!confirm('Are you sure you want to delete this category?')) return

    try {
      const { error } = await supabase
        .from('skill_categories')
        .delete()
        .eq('id', categoryId)

      if (error) throw error

      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
      toast.success('Category deleted successfully!')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  // Filter skills based on search and category
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !filterCategory || skill.category_id === filterCategory
    return matchesSearch && matchesCategory
  })

  const openSkillModal = (skill = null) => {
    setEditingSkill(skill)
    if (skill) {
      skillForm.reset({
        name: skill.name,
        icon: skill.icon,
        level: skill.level,
        years_experience: skill.years_experience,
        description: skill.description || '',
        category_id: skill.category_id
      })
    } else {
      skillForm.reset()
    }
    setShowSkillModal(true)
  }

  const openCategoryModal = (category = null) => {
    setEditingCategory(category)
    if (category) {
      categoryForm.reset({
        name: category.name,
        description: category.description,
        icon: category.icon,
        gradient_from: category.gradient_from,
        gradient_to: category.gradient_to
      })
    } else {
      categoryForm.reset()
    }
    setShowCategoryModal(true)
  }

  const iconOptions = [
    { value: 'Palette', label: '🎨 Palette' },
    { value: 'Server', label: '🖥️ Server' },
    { value: 'Code', label: '💻 Code' },
    { value: 'Database', label: '🗃️ Database' },
    { value: 'Settings', label: '⚙️ Settings' },
    { value: 'react', label: '⚛️ React' },
    { value: 'nodejs', label: '🟢 Node.js' },
    { value: 'javascript', label: '🟨 JavaScript' },
    { value: 'python', label: '🐍 Python' },
    { value: 'php', label: '🐘 PHP' }
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
          <p className="text-slate-400">Loading skills...</p>
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
            <h1 className="text-3xl font-bold text-white mb-2">Skills Management</h1>
            <p className="text-slate-300">
              Manage your skills, categories, and proficiency levels
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-slate-800/50 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'skills'
                  ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Skills ({skills.length})
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'categories'
                  ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Categories ({categories.length})
            </button>
          </div>
        </div>
      </motion.div>

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <>
          {/* Skills Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-64"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none w-full md:w-48"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => openSkillModal()}
              className="px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Skill
            </button>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.category?.gradient_from} ${skill.category?.gradient_to} flex items-center justify-center text-white text-xl`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{skill.name}</h3>
                      <p className="text-sm text-slate-400">{skill.category?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => openSkillModal(skill)}
                      className="p-2 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Skill Level */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-300">Proficiency</span>
                    <span className="text-sm font-semibold text-white">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.category?.gradient_from} ${skill.category?.gradient_to} transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Experience</span>
                  <span className="text-white font-medium">{skill.years_experience} years</span>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <>
          {/* Category Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-end"
          >
            <button
              onClick={() => openCategoryModal()}
              className="px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.gradient_from} ${category.gradient_to} flex items-center justify-center text-white text-2xl`}>
                      {category.icon === 'Palette' ? '🎨' : 
                       category.icon === 'Server' ? '🖥️' : 
                       category.icon === 'Code' ? '💻' : 
                       category.icon === 'Database' ? '🗃️' : '⚙️'}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{category.name}</h3>
                      <p className="text-slate-400 text-sm">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => openCategoryModal(category)}
                      className="p-2 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Skills Count */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Skills in category</span>
                  <span className="text-white font-medium">
                    {skills.filter(skill => skill.category_id === category.id).length}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Skill Modal */}
      <AnimatePresence>
        {showSkillModal && (
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
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h2>
                <button
                  onClick={() => {
                    setShowSkillModal(false)
                    setEditingSkill(null)
                    skillForm.reset()
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={skillForm.handleSubmit(handleSkillSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skill Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Skill Name *
                    </label>
                    <input
                      {...skillForm.register('name')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., React"
                    />
                    {skillForm.formState.errors.name && (
                      <p className="text-red-400 text-sm mt-1">{skillForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Category *
                    </label>
                    <select
                      {...skillForm.register('category_id')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {skillForm.formState.errors.category_id && (
                      <p className="text-red-400 text-sm mt-1">{skillForm.formState.errors.category_id.message}</p>
                    )}
                  </div>

                  {/* Icon */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Icon *
                    </label>
                    <select
                      {...skillForm.register('icon')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Select an icon</option>
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {skillForm.formState.errors.icon && (
                      <p className="text-red-400 text-sm mt-1">{skillForm.formState.errors.icon.message}</p>
                    )}
                  </div>

                  {/* Proficiency Level */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Proficiency Level (%) *
                    </label>
                    <input
                      {...skillForm.register('level', { valueAsNumber: true })}
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="0-100"
                    />
                    {skillForm.formState.errors.level && (
                      <p className="text-red-400 text-sm mt-1">{skillForm.formState.errors.level.message}</p>
                    )}
                  </div>

                  {/* Years of Experience */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Years of Experience *
                    </label>
                    <input
                      {...skillForm.register('years_experience', { valueAsNumber: true })}
                      type="number"
                      min="0"
                      max="50"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Years of experience"
                    />
                    {skillForm.formState.errors.years_experience && (
                      <p className="text-red-400 text-sm mt-1">{skillForm.formState.errors.years_experience.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      {...skillForm.register('description')}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      placeholder="Brief description of your experience with this skill..."
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSkillModal(false)
                      setEditingSkill(null)
                      skillForm.reset()
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={skillForm.formState.isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {skillForm.formState.isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingSkill ? 'Update Skill' : 'Create Skill'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {showCategoryModal && (
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
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button
                  onClick={() => {
                    setShowCategoryModal(false)
                    setEditingCategory(null)
                    categoryForm.reset()
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Category Name *
                    </label>
                    <input
                      {...categoryForm.register('name')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., Frontend Development"
                    />
                    {categoryForm.formState.errors.name && (
                      <p className="text-red-400 text-sm mt-1">{categoryForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  {/* Icon */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Icon *
                    </label>
                    <select
                      {...categoryForm.register('icon')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="">Select an icon</option>
                      <option value="Palette">🎨 Palette</option>
                      <option value="Server">🖥️ Server</option>
                      <option value="Code">💻 Code</option>
                      <option value="Database">🗃️ Database</option>
                      <option value="Settings">⚙️ Settings</option>
                    </select>
                    {categoryForm.formState.errors.icon && (
                      <p className="text-red-400 text-sm mt-1">{categoryForm.formState.errors.icon.message}</p>
                    )}
                  </div>

                  {/* Gradient Colors */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Gradient Start *
                    </label>
                    <select
                      {...categoryForm.register('gradient_from')}
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
                      {...categoryForm.register('gradient_to')}
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
                      {...categoryForm.register('description')}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      placeholder="Brief description of this skill category..."
                    />
                    {categoryForm.formState.errors.description && (
                      <p className="text-red-400 text-sm mt-1">{categoryForm.formState.errors.description.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryModal(false)
                      setEditingCategory(null)
                      categoryForm.reset()
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={categoryForm.formState.isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {categoryForm.formState.isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingCategory ? 'Update Category' : 'Create Category'}
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

export default Skills
