import React, { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Building2, Calendar, TrendingUp, Award, Users, Code2 } from 'lucide-react'
import { portfolioAPI } from '../lib/supabase'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const skillsData = {
  labels: ['React', 'Node.js', 'Laravel', 'GraphQL', 'Tailwind', 'TypeScript'],
  datasets: [{
    data: [95, 88, 92, 85, 98, 90],
    backgroundColor: [
      'rgba(99, 102, 241, 0.8)',
      'rgba(34, 197, 94, 0.8)', 
      'rgba(236, 72, 153, 0.8)',
      'rgba(14, 165, 233, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(139, 92, 246, 0.8)'
    ],
    borderWidth: 0,
  }]
}

const experienceData = {
  labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  datasets: [{
    label: 'Projects Completed',
    data: [3, 5, 8, 12, 15, 18, 22],
    backgroundColor: 'rgba(99, 102, 241, 0.8)',
    borderColor: 'rgba(99, 102, 241, 1)',
    borderWidth: 2,
    borderRadius: 8,
  }]
}

export function Experience() {
  const [experiences, setExperiences] = useState([])
  const [personalInfo, setPersonalInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [experienceRes, personalRes] = await Promise.all([
        portfolioAPI.getExperience(),
        portfolioAPI.getPersonalInfo()
      ])

      if (!experienceRes.error && experienceRes.data) {
        // Transform experience data
        const transformedExperiences = experienceRes.data.map(exp => ({
          company: exp.company,
          title: exp.position,
          period: `${new Date(exp.start_date).getFullYear()} — ${exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present'}`,
          duration: exp.duration || '1 year',
          icon: exp.icon || '💻',
          gradient: exp.gradient || 'from-brand-500 to-accent-500',
          achievements: exp.achievements?.map(achievement => ({
            icon: achievement.icon || '📊',
            text: achievement.description,
            metric: achievement.metric || ''
          })) || []
        }))
        setExperiences(transformedExperiences)
      }

      if (!personalRes.error && personalRes.data) {
        setPersonalInfo(personalRes.data)
      }
    } catch (error) {
      console.error('Error fetching experience data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="container-safe py-16 md:py-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading experience...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container-safe py-16 md:py-24">
      {/* Header */}
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-black tracking-tight mb-6">
          <span className="gradient-text">Professional Journey</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          7+ years of crafting exceptional web experiences and leading development teams
        </p>
      </Motion.div>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          { label: 'Years Experience', value: `${personalInfo?.years_experience || 7}+`, icon: Calendar, gradient: 'from-brand-500 to-brand-600' },
          { label: 'Projects Delivered', value: `${personalInfo?.projects_completed || 30}+`, icon: Code2, gradient: 'from-info-500 to-info-600' },
          { label: 'Team Members Mentored', value: '12+', icon: Users, gradient: 'from-success-500 to-success-600' },
          { label: 'Client Satisfaction', value: '98%', icon: Award, gradient: 'from-warning-500 to-warning-600' },
        ].map((stat, i) => (
          <Motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="card text-center"
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
              <stat.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
            <p className="text-slate-600 dark:text-slate-400">{stat.label}</p>
          </Motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-brand-600" />
            <span className="gradient-text">Skill Proficiency</span>
          </h3>
          <div className="h-64">
            <Doughnut 
              data={skillsData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.parsed}%`
                    }
                  }
                }
              }} 
            />
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-info-600" />
            <span className="gradient-text">Career Growth</span>
          </h3>
          <div className="h-64">
            <Bar 
              data={experienceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true }
                },
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </Motion.div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-8">
        {experiences.map((role, index) => (
          <Motion.div
            key={role.company}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative"
          >
            {/* Timeline Line */}
            {index < roles.length - 1 && (
              <div className="absolute left-8 top-20 w-0.5 h-24 bg-gradient-to-b from-brand-300 to-transparent" />
            )}
            
            <div className="card hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${role.gradient} flex items-center justify-center text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {role.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-brand-600 transition-colors duration-300">
                        {role.title}
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                        {role.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-100 to-accent-100 text-brand-800 text-sm font-semibold dark:from-brand-900/50 dark:to-accent-900/50 dark:text-brand-200">
                        <Calendar className="w-4 h-4" />
                        {role.period}
                      </span>
                      <p className="text-sm text-slate-500 mt-1">{role.duration}</p>
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {role.achievements.map((achievement, i) => (
                      <Motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 transition-transform duration-300"
                      >
                        <span className="text-xl flex-shrink-0">{achievement.icon}</span>
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {achievement.text}
                          </p>
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white">
                            {achievement.metric}
                          </span>
                        </div>
                      </Motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>
        ))}
      </div>
    </section>
  )
}


