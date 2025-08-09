import { motion as Motion } from 'framer-motion'

export function Projects() {
  const projects = [
    {
      title: '🏢 Enterprise Dashboard',
      description: 'A scalable analytics dashboard with role-based access and real-time charts.',
      tech: ['⚛️ React', '🟢 Node.js', '🔗 GraphQL', '🐘 Postgres'],
      demo: '#',
      repo: '#',
      role: 'Full-Stack Developer',
      outcome: 'Improved reporting efficiency by 40%',
      gradient: 'from-blue-400/20 via-cyan-400/20 to-teal-400/20',
    },
    {
      title: '🛒 E-Commerce Platform',
      description: 'Modern e-commerce solution with payment integration and inventory management.',
      tech: ['⚛️ React', '🐘 Laravel', '💳 Stripe', '📊 MySQL'],
      demo: '#',
      repo: '#',
      role: 'Lead Developer',
      outcome: '300% increase in conversion rate',
      gradient: 'from-purple-400/20 via-pink-400/20 to-rose-400/20',
    },
    {
      title: '📱 Mobile-First SaaS',
      description: 'Progressive web app with offline capabilities and push notifications.',
      tech: ['⚛️ React', '⚡ Supabase', '🔔 PWA', '🎨 Tailwind'],
      demo: '#',
      repo: '#',
      role: 'Frontend Lead',
      outcome: '95% mobile user satisfaction',
      gradient: 'from-green-400/20 via-emerald-400/20 to-teal-400/20',
    },
  ]

  return (
    <section className="container-safe py-16 md:py-24">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-black tracking-tight mb-6">
          <span className="gradient-text">Selected Work</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Explore some of my recent projects that showcase modern web development practices and beautiful user experiences.
        </p>
      </Motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <Motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ y: -10 }}
            className="group card cursor-pointer"
          >
            <div className={`aspect-video rounded-2xl bg-gradient-to-br ${project.gradient} mb-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm" />
            </div>
            
            <h3 className="text-xl font-bold mb-3 group-hover:text-brand-600 transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map(tech => (
                <span key={tech} className="badge text-xs">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4 mb-4">
              <a 
                href={project.demo} 
                className="flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors duration-300"
              >
                🚀 Live Demo
              </a>
              <a 
                href={project.repo} 
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors duration-300"
              >
                🔗 GitHub
              </a>
            </div>
            
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <span className="font-medium">Role:</span> {project.role}
              </p>
              <p className="text-sm text-success-600 dark:text-success-400 font-medium mt-1">
                📈 {project.outcome}
              </p>
            </div>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}


