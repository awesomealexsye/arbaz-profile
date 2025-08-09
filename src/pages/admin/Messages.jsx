import React, { useState, useEffect } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Mail, 
  MailOpen, 
  Reply, 
  Archive, 
  Trash2, 
  X, 
  Search,
  Filter,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  ExternalLink
} from 'lucide-react'
import { portfolioAPI, supabase } from '../../lib/supabase'
import toast from 'react-hot-toast'

const Messages = () => {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    archived: 0
  })

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const { data, error } = await portfolioAPI.getContactMessages()
      
      if (error) {
        console.error('Error fetching messages:', error)
        toast.error('Failed to load messages')
      } else {
        setMessages(data || [])
        
        // Calculate stats
        const total = data?.length || 0
        const newCount = data?.filter(msg => msg.status === 'new').length || 0
        const readCount = data?.filter(msg => msg.status === 'read').length || 0
        const repliedCount = data?.filter(msg => msg.status === 'replied').length || 0
        const archivedCount = data?.filter(msg => msg.status === 'archived').length || 0
        
        setStats({
          total,
          new: newCount,
          read: readCount,
          replied: repliedCount,
          archived: archivedCount
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (messageId, newStatus) => {
    try {
      const { data, error } = await portfolioAPI.updateMessageStatus(messageId, newStatus)
      
      if (error) {
        console.error('Error updating message status:', error)
        toast.error('Failed to update message status')
        return
      }

      // Update local state
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ))

      // Update selected message if it's the one being updated
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(prev => ({ ...prev, status: newStatus }))
      }

      // Update stats
      await fetchMessages()
      
      const statusLabels = {
        new: 'marked as new',
        read: 'marked as read',
        replied: 'marked as replied',
        archived: 'archived'
      }
      
      toast.success(`Message ${statusLabels[newStatus]}`)
    } catch (error) {
      console.error('Error:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const deleteMessage = async (messageId) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) return

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId)

      if (error) throw error

      setMessages(prev => prev.filter(msg => msg.id !== messageId))
      
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(null)
        setShowMessageModal(false)
      }

      await fetchMessages() // Refresh stats
      toast.success('Message deleted successfully')
    } catch (error) {
      console.error('Error deleting message:', error)
      toast.error('Failed to delete message')
    }
  }

  const openMessage = async (message) => {
    setSelectedMessage(message)
    setShowMessageModal(true)
    
    // Mark as read if it's new
    if (message.status === 'new') {
      await updateMessageStatus(message.id, 'read')
    }
  }

  // Filter messages based on search and status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || message.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Mail className="w-4 h-4 text-green-400" />
      case 'read':
        return <MailOpen className="w-4 h-4 text-blue-400" />
      case 'replied':
        return <Reply className="w-4 h-4 text-purple-400" />
      case 'archived':
        return <Archive className="w-4 h-4 text-slate-400" />
      default:
        return <Mail className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'read':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'replied':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'archived':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    
    return date.toLocaleDateString()
  }

  const statCards = [
    {
      title: 'Total Messages',
      value: stats.total,
      icon: MessageSquare,
      color: 'from-brand-500 to-brand-600',
      bgColor: 'from-brand-500/20 to-brand-600/20'
    },
    {
      title: 'New Messages',
      value: stats.new,
      icon: Mail,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-500/20 to-green-600/20'
    },
    {
      title: 'Read Messages',
      value: stats.read,
      icon: MailOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-500/20 to-blue-600/20'
    },
    {
      title: 'Replied',
      value: stats.replied,
      icon: Reply,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-500/20 to-purple-600/20'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading messages...</p>
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
            <h1 className="text-3xl font-bold text-white mb-2">Messages Management</h1>
            <p className="text-slate-300">
              Manage contact form submissions and client communications
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <MessageSquare className="w-5 h-5 text-slate-400" />
            <span className="text-white font-semibold">{stats.new}</span>
            <span className="text-slate-400 text-sm">unread</span>
          </div>
        </div>
      </Motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.bgColor} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
              <p className="text-slate-400 text-sm">{card.title}</p>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* Controls */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 w-full md:w-64"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-12 pr-8 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none w-full md:w-48"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </Motion.div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message, index) => (
          <Motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer ${
              message.status === 'new' ? 'ring-2 ring-green-500/20' : ''
            }`}
            onClick={() => openMessage(message)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {message.name.charAt(0).toUpperCase()}
                </div>

                {/* Message Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-white truncate">{message.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${getStatusColor(message.status)}`}>
                      {getStatusIcon(message.status)}
                      {message.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-1">{message.email}</p>
                  
                  <h4 className="text-lg font-medium text-slate-200 mb-2 truncate">
                    {message.subject}
                  </h4>
                  
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                    {message.message}
                  </p>
                </div>
              </div>

              {/* Date and Actions */}
              <div className="flex flex-col items-end gap-2 ml-4">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="w-3 h-3" />
                  {formatDate(message.created_at)}
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateMessageStatus(message.id, 'replied')
                    }}
                    className="p-1 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded transition-colors"
                    title="Mark as replied"
                  >
                    <Reply className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updateMessageStatus(message.id, 'archived')
                    }}
                    className="p-1 text-slate-400 hover:text-slate-300 hover:bg-slate-500/10 rounded transition-colors"
                    title="Archive"
                  >
                    <Archive className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteMessage(message.id)
                    }}
                    className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </Motion.div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No messages found</h3>
            <p className="text-slate-400">
              {searchTerm || filterStatus ? 'Try adjusting your search or filters' : 'No contact messages yet'}
            </p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {showMessageModal && selectedMessage && (
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
              className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedMessage.name}</h2>
                    <p className="text-slate-400">{selectedMessage.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedMessage.status)}`}>
                        {getStatusIcon(selectedMessage.status)}
                        {selectedMessage.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatDate(selectedMessage.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setShowMessageModal(false)
                    setSelectedMessage(null)
                  }}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-400 mb-2">Subject</h3>
                <p className="text-xl font-semibold text-white">{selectedMessage.subject}</p>
              </div>

              {/* Message */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-slate-400 mb-2">Message</h3>
                <div className="bg-slate-800/30 rounded-xl p-6">
                  <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Technical Info */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-800/20 rounded-xl">
                <div>
                  <h4 className="text-xs font-medium text-slate-400 mb-1">IP Address</h4>
                  <p className="text-sm text-slate-300">{selectedMessage.ip_address || 'Not recorded'}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium text-slate-400 mb-1">Received</h4>
                  <p className="text-sm text-slate-300">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0ABest regards,%0D%0AArbaz`}
                  className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Reply className="w-4 h-4" />
                  Reply via Email
                </a>
                
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                  className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Replied
                </button>
                
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                  className="px-4 py-2 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}

export default Messages
