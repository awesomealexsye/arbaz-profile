import React, { useState, useEffect } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  FolderOpen,
  ExternalLink,
  Github,
  Image,
  Tag,
  Star,
  Eye,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  Upload
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const projectSchema = z.object({
  title: z.string().min(2, 'Project title must be at least 2 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  outcome: z.string().min(10, 'Outcome must be at least 10 characters'),
  demo_url: z.string().url('Please enter a valid demo URL').optional().or(z.literal('')),
  github_url: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal('')),
  image_url: z.string().url('Please enter a valid image URL').optional().or(z.literal('')),
  is_featured: z.boolean().optional()
})

const technologySchema = z.object({
  technology: z.string().min(1, 'Technology name is required'),
  icon: z.string().min(1, 'Icon is required')
})

const Projects = () => {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showTechModal, setShowTechModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFeatured, setFilterFeatured] = useState('')

  const projectForm = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      role: '',
      outcome: '',
      demo_url: '',
      github_url: '',
      image_url: '',
      is_featured: false
    }
  })

  const techForm = useForm({
    resolver: zodResolver(technologySchema),
    defaultValues: {
      technology: '',
      icon: ''
    }
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          technologies:project_technologies(*)
        `)
        .eq('is_active', true)
        .order('order_index')

      if (error) {
        console.error('Error fetching projects:', error)
        toast.error('Failed to load projects')
      } else {
        setProjects(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Project Management Functions
  const handleProjectSubmit = async (data) => {
    try {
      const projectData = {
        ...data,
        demo_url: data.demo_url || null,
        github_url: data.github_url || null,
        image_url: data.image_url || null,
        gradient_colors: ["from-blue-400/20", "via-cyan-400/20", "to-teal-400/20"]
      }

      if (editingProject) {
        // Update existing project
        const { data: updatedProject, error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)
          .select(`
            *,
            technologies:project_technologies(*)
          `)
          .single()

        if (error) throw error

        setProjects(prev => prev.map(project => 
          project.id === editingProject.id ? updatedProject : project
        ))
        toast.success('Project updated successfully!')
      } else {
        // Create new project
        const { data: newProject, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select(`
            *,
            technologies:project_technologies(*)
          `)
          .single()

        if (error) throw error

        setProjects(prev => [...prev, newProject])
        toast.success('Project created successfully!')
      }

      setShowProjectModal(false)
      setEditingProject(null)
      projectForm.reset()
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error('Failed to save project')
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project? All associated technologies will also be deleted.')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) throw error

      setProjects(prev => prev.filter(project => project.id !== projectId))
      toast.success('Project deleted successfully!')
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project')
    }
  }

  // Technology Management Functions
  const handleTechSubmit = async (data) => {
    try {
      const { data: newTech, error } = await supabase
        .from('project_technologies')
        .insert({
          ...data,
          project_id: selectedProject.id
        })
        .select()
        .single()

      if (error) throw error

      setProjects(prev => prev.map(project => 
        project.id === selectedProject.id ? {
          ...project,
          technologies: [...(project.technologies || []), newTech]
        } : project
      ))

      toast.success('Technology added successfully!')
      setShowTechModal(false)
      techForm.reset()
    } catch (error) {
      console.error('Error adding technology:', error)
      toast.error('Failed to add technology')
    }
  }

  const handleDeleteTechnology = async (techId) => {
    if (!confirm('Are you sure you want to remove this technology?')) return

    try {
      const { error } = await supabase
        .from('project_technologies')
        .delete()
        .eq('id', techId)

      if (error) throw error

      setProjects(prev => prev.map(project => 
        project.id === selectedProject.id ? {
          ...project,
          technologies: project.technologies.filter(tech => tech.id !== techId)
        } : project
      ))
      toast.success('Technology removed successfully!')
    } catch (error) {
      console.error('Error removing technology:', error)
      toast.error('Failed to remove technology')
    }
  }

  // Toggle featured status
  const toggleFeatured = async (project) => {
    try {
      const { data: updatedProject, error } = await supabase
        .from('projects')
        .update({ is_featured: !project.is_featured })
        .eq('id', project.id)
        .select(`
          *,
          technologies:project_technologies(*)
        `)
        .single()

      if (error) throw error

      setProjects(prev => prev.map(p => 
        p.id === project.id ? updatedProject : p
      ))
      
      toast.success(`Project ${updatedProject.is_featured ? 'featured' : 'unfeatured'}`)
    } catch (error) {
      console.error('Error toggling featured status:', error)
      toast.error('Failed to update featured status')
    }
  }

  // Filter projects based on search and featured status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFeatured = filterFeatured === '' || 
                           (filterFeatured === 'featured' && project.is_featured) ||
                           (filterFeatured === 'regular' && !project.is_featured)
    return matchesSearch && matchesFeatured
  })

  const openProjectModal = (project = null) => {
    setEditingProject(project)
    if (project) {
      projectForm.reset({
        title: project.title,
        description: project.description,
        role: project.role,
        outcome: project.outcome,
        demo_url: project.demo_url || '',
        github_url: project.github_url || '',
        image_url: project.image_url || '',
        is_featured: project.is_featured || false
      })
    } else {
      projectForm.reset()
    }
    setShowProjectModal(true)
  }

  const openTechModal = (project) => {
    setSelectedProject(project)
    techForm.reset()
    setShowTechModal(true)
  }

  const techIcons = [
    { value: '⚛️', label: '⚛️ React' },
    { value: '🟢', label: '🟢 Node.js' },
    { value: '🐘', label: '🐘 PHP' },
    { value: '🐍', label: '🐍 Python' },
    { value: '🟨', label: '🟨 JavaScript' },
    { value: '💙', label: '💙 TypeScript' },
    { value: '🎨', label: '🎨 Tailwind' },
    { value: '📊', label: '📊 MySQL' },
    { value: '🐘', label: '🐘 PostgreSQL' },
    { value: '🌿', label: '🌿 MongoDB' },
    { value: '🔗', label: '🔗 GraphQL' },
    { value: '⚡', label: '⚡ Supabase' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 p-6">
      <div className="space-y-8">
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-brand-500/10 via-accent-500/10 to-info-500/10 rounded-3xl p-8 border border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects Management</h1>
            <p className="text-slate-300">
              Manage your portfolio projects, technologies, and showcase
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <FolderOpen className="w-5 h-5 text-slate-400" />
              <span className="text-white font-semibold">{projects.length}</span>
              <span className="text-slate-400 text-sm">Projects</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <Star className="w-5 h-5 text-warning-400" />
              <span className="text-white font-semibold">{projects.filter(p => p.is_featured).length}</span>
              <span className="text-slate-400 text-sm">Featured</span>
            </div>
          </div>
        </div>
      </Motion.div>

      {/* Controls */}
      <Motion.div
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
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-64"
            />
          </div>

          {/* Featured Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value)}
              className="pl-12 pr-8 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none w-full md:w-48"
            >
              <option value="">All Projects</option>
              <option value="featured">Featured Only</option>
              <option value="regular">Regular Only</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => openProjectModal()}
          className="px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </Motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project, index) => (
          <Motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800/70 transition-all duration-300 group"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.is_featured && (
                    <Star className="w-6 h-6 text-warning-400 fill-current" />
                  )}
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>
              
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => toggleFeatured(project)}
                  className={`p-2 rounded-lg transition-colors ${
                    project.is_featured 
                      ? 'text-warning-400 bg-warning-500/10 hover:bg-warning-500/20' 
                      : 'text-slate-400 hover:text-warning-400 hover:bg-warning-500/10'
                  }`}
                  title={project.is_featured ? 'Remove from featured' : 'Add to featured'}
                >
                  <Star className={`w-4 h-4 ${project.is_featured ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => openProjectModal(project)}
                  className="p-2 text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Project Image */}
            {project.image_url && (
              <div className="mb-6 rounded-2xl overflow-hidden bg-slate-700/30 aspect-video">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Project Details */}
            <div className="space-y-4 mb-6">
              <div>
                <span className="text-sm text-slate-400">Role:</span>
                <p className="text-white font-medium">{project.role}</p>
              </div>
              <div>
                <span className="text-sm text-slate-400">Outcome:</span>
                <p className="text-white font-medium">{project.outcome}</p>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Technologies ({project.technologies?.length || 0})
                </h4>
                <button
                  onClick={() => openTechModal(project)}
                  className="px-3 py-1 bg-gradient-to-r from-success-500 to-success-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-1 text-xs"
                >
                  <Plus className="w-3 h-3" />
                  Add Tech
                </button>
              </div>

              {project.technologies && project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.id}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-full border border-slate-600/50 group/tech hover:bg-slate-700 transition-colors"
                    >
                      <span className="text-sm">{tech.icon}</span>
                      {tech.technology}
                      <button
                        onClick={() => handleDeleteTechnology(tech.id)}
                        className="ml-1 opacity-0 group-hover/tech:opacity-100 text-red-400 hover:text-red-300 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 bg-slate-700/20 rounded-xl border-2 border-dashed border-slate-600">
                  <Tag className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No technologies added</p>
                </div>
              )}
            </div>

            {/* Project Links */}
            <div className="flex gap-3">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
            </div>
          </Motion.div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-16">
            <FolderOpen className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No projects found</h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || filterFeatured ? 'Try adjusting your search or filters' : 'Start by adding your first project'}
            </p>
            {!searchTerm && !filterFeatured && (
              <button
                onClick={() => openProjectModal()}
                className="px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add Project
              </button>
            )}
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {showProjectModal && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => {
                    setShowProjectModal(false)
                    setEditingProject(null)
                    projectForm.reset()
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={projectForm.handleSubmit(handleProjectSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Title */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Project Title *
                    </label>
                    <input
                      {...projectForm.register('title')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., E-Commerce Platform"
                    />
                    {projectForm.formState.errors.title && (
                      <p className="text-red-400 text-sm mt-1">{projectForm.formState.errors.title.message}</p>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Your Role *
                    </label>
                    <input
                      {...projectForm.register('role')}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g., Lead Developer"
                    />
                    {projectForm.formState.errors.role && (
                      <p className="text-red-400 text-sm mt-1">{projectForm.formState.errors.role.message}</p>
                    )}
                  </div>

                  {/* Demo URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Demo URL (Optional)
                    </label>
                    <input
                      {...projectForm.register('demo_url')}
                      type="url"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="https://your-project-demo.com"
                    />
                    {projectForm.formState.errors.demo_url && (
                      <p className="text-red-400 text-sm mt-1">{projectForm.formState.errors.demo_url.message}</p>
                    )}
                  </div>

                  {/* GitHub URL */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      GitHub URL (Optional)
                    </label>
                    <input
                      {...projectForm.register('github_url')}
                      type="url"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="https://github.com/username/repo"
                    />
                    {projectForm.formState.errors.github_url && (
                      <p className="text-red-400 text-sm mt-1">{projectForm.formState.errors.github_url.message}</p>
                    )}
                  </div>

                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Project Image URL (Optional)
                    </label>
                    <input
                      {...projectForm.register('image_url')}
                      type="url"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="https://your-image-url.com/image.jpg"
                    />
                    {projectForm.formState.errors.image_url && (
                      <p className="text-red-400 text-sm mt-1">{projectForm.formState.errors.image_url.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      {...projectForm.register('description')}
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      placeholder="Describe the project, its features, and what makes it special..."
                    />
                    {projectForm.formState.errors.description && (
                      <p className="text-red-400 text-sm mt-1">{projectForm.formState.errors.description.message}</p>
                    )}
                  </div>

                  {/* Outcome */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Project Outcome *
                    </label>
                    <textarea
                      {...projectForm.register('outcome')}
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      placeholder="What was achieved? Impact, metrics, results..."
                    />
                    {projectForm.formState.errors.outcome && (
                      <p className="text-red-400 text-sm mt-1">{projectForm.formState.errors.outcome.message}</p>
                    )}
                  </div>

                  {/* Featured */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3">
                      <input
                        {...projectForm.register('is_featured')}
                        type="checkbox"
                        className="w-4 h-4 text-brand-500 bg-slate-800 border-slate-600 rounded focus:ring-brand-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-slate-300">
                        Feature this project (show prominently on portfolio)
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProjectModal(false)
                      setEditingProject(null)
                      projectForm.reset()
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={projectForm.formState.isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {projectForm.formState.isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingProject ? 'Update Project' : 'Create Project'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* Technology Modal */}
      <AnimatePresence>
        {showTechModal && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Add Technology</h2>
                <button
                  onClick={() => {
                    setShowTechModal(false)
                    techForm.reset()
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedProject && (
                <div className="mb-6 p-4 bg-slate-800/30 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Adding technology to:</p>
                  <p className="text-white font-semibold">{selectedProject.title}</p>
                </div>
              )}

              <form onSubmit={techForm.handleSubmit(handleTechSubmit)} className="space-y-6">
                {/* Technology Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Technology Name *
                  </label>
                  <input
                    {...techForm.register('technology')}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="e.g., React"
                  />
                  {techForm.formState.errors.technology && (
                    <p className="text-red-400 text-sm mt-1">{techForm.formState.errors.technology.message}</p>
                  )}
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Icon *
                  </label>
                  <select
                    {...techForm.register('icon')}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="">Select an icon</option>
                    {techIcons.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {techForm.formState.errors.icon && (
                    <p className="text-red-400 text-sm mt-1">{techForm.formState.errors.icon.message}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTechModal(false)
                      techForm.reset()
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={techForm.formState.isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-500 to-accent-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {techForm.formState.isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add Technology
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

export default Projects
