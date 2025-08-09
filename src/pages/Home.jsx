import { motion as Motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

export function Home() {
  return (
    <section className="container-safe py-24 md:py-32 relative">
      {/* Hero Content */}
      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <Motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-100 to-accent-100 text-brand-800 text-sm font-medium mb-6 dark:from-brand-900/50 dark:to-accent-900/50 dark:text-brand-200"
          >
            ✨ Available for hire
          </Motion.div>
          
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-6xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6"
          >
            <span className="gradient-text">Arbaz</span>
            <br />
            <span className="text-slate-800 dark:text-slate-200">Senior Web</span>
            <br />
            <span className="text-slate-600 dark:text-slate-400">Developer</span>
          </Motion.h1>
          
          <Motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
          >
            Based in <span className="font-semibold text-brand-600">Ballabgarh, Faridabad</span>. 
            I craft beautiful, performant, and accessible web experiences that users love.
          </Motion.p>
          
          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <NavLink to="/contact" className="btn-primary text-lg px-8 py-4">
              🚀 Let's Work Together
            </NavLink>
            <NavLink to="/projects" className="btn-outline text-lg px-8 py-4">
              👁️ View My Work
            </NavLink>
          </Motion.div>
          
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">Technologies I love</p>
            <div className="flex flex-wrap gap-3">
              {['⚛️ React', '🟢 Node.js', '🐘 Laravel', '🎨 Tailwind CSS', '🔗 GraphQL', '⚡ Supabase'].map((tech, i) => (
                <Motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                  className="badge hover:scale-110 transition-transform duration-300 cursor-default"
                >
                  {tech}
                </Motion.span>
              ))}
            </div>
          </Motion.div>
        </Motion.div>
        
        {/* Hero Visual */}
        <Motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="aspect-square surface floating relative overflow-hidden">
            {/* Animated elements inside */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/30" />
            <div className="absolute top-8 left-8 w-16 h-16 bg-brand-400/30 rounded-2xl rotate-12 floating" style={{ animationDelay: '1s' }} />
            <div className="absolute top-20 right-12 w-12 h-12 bg-accent-400/30 rounded-full floating" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-16 left-16 w-20 h-20 bg-success-400/30 rounded-3xl -rotate-12 floating" style={{ animationDelay: '0.5s' }} />
          </div>
        </Motion.div>
      </div>
    </section>
  )
}


