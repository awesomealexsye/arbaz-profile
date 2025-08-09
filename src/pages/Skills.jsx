import { motion as Motion } from 'framer-motion'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js'
import { Line, Radar } from 'react-chartjs-2'
import { Code, Database, Palette, Server, Zap, Brain } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale)

const skillCategories = [
  { 
    name: 'Frontend Development', 
    icon: Palette,
    gradient: 'from-brand-500 to-accent-500',
    skills: [
      { name: '⚛️ React', level: 95, years: 5 },
      { name: '🎨 Tailwind CSS', level: 98, years: 4 },
      { name: '📱 HTML/CSS', level: 99, years: 7 },
      { name: '🅱️ Bootstrap', level: 90, years: 6 },
      { name: '📦 Vite', level: 88, years: 2 }
    ]
  },
  { 
    name: 'Backend Development', 
    icon: Server,
    gradient: 'from-info-500 to-success-500',
    skills: [
      { name: '🟢 Node.js', level: 88, years: 4 },
      { name: '🐘 PHP', level: 85, years: 5 },
      { name: '🔴 Laravel', level: 92, years: 4 },
      { name: '🔗 GraphQL', level: 85, years: 3 },
      { name: '⚡ Supabase', level: 80, years: 2 }
    ]
  },
  { 
    name: 'Programming Languages', 
    icon: Code,
    gradient: 'from-warning-500 to-accent-500',
    skills: [
      { name: '🟨 JavaScript', level: 96, years: 7 },
      { name: '🐍 Python', level: 82, years: 3 },
      { name: '💙 TypeScript', level: 88, years: 3 }
    ]
  },
  { 
    name: 'Database & Tools', 
    icon: Database,
    gradient: 'from-success-500 to-info-500',
    skills: [
      { name: '🐬 MySQL', level: 90, years: 6 },
      { name: '🐘 PostgreSQL', level: 85, years: 4 },
      { name: '🌿 MongoDB', level: 78, years: 3 },
      { name: '🔧 Git', level: 95, years: 7 }
    ]
  }
]

const radarData = {
  labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Design'],
  datasets: [{
    label: 'Skill Level',
    data: [95, 88, 87, 75, 70, 85],
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: 'rgba(99, 102, 241, 1)',
    borderWidth: 2,
    pointBackgroundColor: 'rgba(99, 102, 241, 1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
  }]
}

const progressData = {
  labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  datasets: [
    {
      label: 'Frontend Skills',
      data: [60, 70, 80, 85, 90, 95, 98],
      borderColor: 'rgba(99, 102, 241, 1)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Backend Skills',
      data: [40, 50, 65, 75, 80, 85, 88],
      borderColor: 'rgba(34, 197, 94, 1)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Database Skills',
      data: [50, 60, 70, 75, 80, 85, 87],
      borderColor: 'rgba(236, 72, 153, 1)',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      tension: 0.4,
    }
  ]
}

export function Skills() {
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
          <span className="gradient-text">Technical Expertise</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          A comprehensive overview of my technical skills, proficiency levels, and years of experience
        </p>
      </Motion.div>

      {/* Skills Overview Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6 text-brand-600" />
            <span className="gradient-text">Skill Radar</span>
          </h3>
          <div className="h-80">
            <Radar 
              data={radarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { display: false },
                    grid: { color: 'rgba(148, 163, 184, 0.2)' },
                    pointLabels: { font: { size: 12 } }
                  }
                },
                plugins: {
                  legend: { display: false }
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
            <Zap className="w-6 h-6 text-info-600" />
            <span className="gradient-text">Skill Evolution</span>
          </h3>
          <div className="h-80">
            <Line 
              data={progressData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: { intersect: false },
                plugins: {
                  legend: { position: 'bottom' }
                },
                scales: {
                  y: { 
                    beginAtZero: true,
                    max: 100,
                    ticks: { callback: (value) => value + '%' }
                  }
                }
              }}
            />
          </div>
        </Motion.div>
      </div>

      {/* Detailed Skills Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <Motion.div
            key={category.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            className="card group hover:glow transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold group-hover:text-brand-600 transition-colors duration-300">
                {category.name}
              </h3>
            </div>
            
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <Motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                  className="relative"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-500">
                        {skill.years} {skill.years === 1 ? 'year' : 'years'}
                      </span>
                      <span className="text-sm font-bold text-brand-600">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Animated Progress Bar */}
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <Motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5 }}
                      className={`h-full bg-gradient-to-r ${category.gradient} rounded-full relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 shimmer opacity-50" />
                    </Motion.div>
                  </div>
                </Motion.div>
              ))}
            </div>
          </Motion.div>
        ))}
      </div>
    </section>
  )
}


