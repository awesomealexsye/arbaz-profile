import React, { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  FolderOpen, 
  Code,
  TrendingUp,
  Calendar,
  Award,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Mail,
  Clock
} from 'lucide-react'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'
import { portfolioAPI } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const { admin } = useAuth()
  const [stats, setStats] = useState({
    totalProjects: 3,
    totalSkills: 15,
    totalMessages: 8,
    unreadMessages: 2,
    totalExperiences: 3,
    profileViews: 1250,
    portfolioDownloads: 89
  })
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [
        projectsResult,
        skillsResult,
        messagesResult,
        experiencesResult
      ] = await Promise.all([
        portfolioAPI.getProjects(),
        portfolioAPI.getSkills(),
        portfolioAPI.getContactMessages(),
        portfolioAPI.getExperiences()
      ])

      // Calculate stats
      const totalProjects = projectsResult.data?.length || 0
      const totalSkills = skillsResult.data?.length || 0
      const allMessages = messagesResult.data || []
      const totalMessages = allMessages.length
      const unreadMessages = allMessages.filter(msg => msg.status === 'new').length
      const totalExperiences = experiencesResult.data?.length || 0

      setStats(prev => ({
        ...prev,
        totalProjects,
        totalSkills,
        totalMessages,
        unreadMessages,
        totalExperiences
      }))

      // Get recent messages (last 5)
      setRecentMessages(allMessages.slice(0, 5))

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  // Chart configurations
  const visitorChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Portfolio Views',
        data: [65, 89, 120, 151, 180, 210],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const skillsDistributionData = {
    labels: ['Frontend', 'Backend', 'Languages', 'Tools'],
    datasets: [
      {
        data: [35, 25, 25, 15],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  }

  const projectStatusData = {
    labels: ['Completed', 'In Progress', 'Planning'],
    datasets: [
      {
        label: 'Projects',
        data: [stats.totalProjects, 2, 1],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ]
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.8)'
        }
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        },
        ticks: {
          color: 'rgba(148, 163, 184, 0.8)'
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(148, 163, 184, 0.8)',
          usePointStyle: true,
          padding: 20
        }
      }
    }
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: '+12%',
      trend: 'up',
      icon: FolderOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-500/20 to-blue-600/20'
    },
    {
      title: 'Skills & Technologies',
      value: stats.totalSkills,
      change: '+8%',
      trend: 'up',
      icon: Code,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-500/20 to-purple-600/20'
    },
    {
      title: 'Contact Messages',
      value: stats.totalMessages,
      change: '+23%',
      trend: 'up',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-500/20 to-green-600/20'
    },
    {
      title: 'Profile Views',
      value: stats.profileViews,
      change: '+15%',
      trend: 'up',
      icon: Eye,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'from-yellow-500/20 to-yellow-600/20'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 p-6">
      <div className="space-y-8">
        {/* Welcome Section */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-slate-700/50 backdrop-blur-sm"
        >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {admin?.name}! 👋
            </h1>
            <p className="text-slate-300">
              Here's what's happening with your portfolio today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-400">Last login</p>
              <p className="text-white font-medium">
                {admin?.last_login_at 
                  ? new Date(admin.last_login_at).toLocaleDateString()
                  : 'Today'
                }
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-brand-500 to-accent-500 flex items-center justify-center">
              <Activity className="w-8 h-8 text-white" />
            </div>
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
              className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 hover:bg-slate-700/80 transition-all duration-300 shadow-lg"
            >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.bgColor} flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                card.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {card.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {card.change}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
              <p className="text-slate-400 text-sm">{card.title}</p>
            </div>
          </Motion.div>
        ))}
      </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Portfolio Views Chart */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg"
          >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Portfolio Views</h3>
              <p className="text-slate-400 text-sm">Monthly visitor trends</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="h-64">
            <Line data={visitorChartData} options={chartOptions} />
          </div>
        </Motion.div>

          {/* Skills Distribution */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg"
          >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Skills Distribution</h3>
              <p className="text-slate-400 text-sm">Technology breakdown</p>
            </div>
            <Code className="w-5 h-5 text-brand-400" />
          </div>
          <div className="h-64">
            <Doughnut data={skillsDistributionData} options={doughnutOptions} />
          </div>
        </Motion.div>
      </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Messages */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg"
          >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Messages</h3>
              <p className="text-slate-400 text-sm">{stats.unreadMessages} unread messages</p>
            </div>
            <MessageSquare className="w-5 h-5 text-accent-400" />
          </div>

          <div className="space-y-4">
            {recentMessages.length > 0 ? (
              recentMessages.map((message, index) => (
                <Motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                    message.status === 'new' ? 'from-green-500 to-green-600' : 'from-slate-500 to-slate-600'
                  } flex items-center justify-center text-white font-semibold text-sm`}>
                    {message.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white truncate">{message.name}</h4>
                      {message.status === 'new' && (
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 truncate">{message.subject}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No messages yet</p>
              </div>
            )}
          </div>
        </Motion.div>

          {/* Quick Stats */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            {/* Project Status */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Project Status</h3>
                <FolderOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div className="h-40">
                <Bar data={projectStatusData} options={chartOptions} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-brand-500/10 hover:bg-brand-500/20 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-5 h-5 text-brand-400" />
                  <span className="text-white">Add New Project</span>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-accent-500/10 hover:bg-accent-500/20 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-accent-400" />
                  <span className="text-white">Update Skills</span>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-success-500/10 hover:bg-success-500/20 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-success-400" />
                  <span className="text-white">View Messages</span>
                </div>
              </button>
            </div>
          </div>
        </Motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
