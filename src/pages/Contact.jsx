import React, { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, User } from 'lucide-react'
import { portfolioAPI, supabase } from '../lib/supabase'
import callMeImage from '../assets/ 3d/call me.png'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional().or(z.literal('')),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  hp: z.string().optional(), // honeypot
})

export function Contact() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [personalInfo, setPersonalInfo] = useState(null)
  const [contactSettings, setContactSettings] = useState(null)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const [personalResult, settingsResult] = await Promise.all([
        portfolioAPI.getPersonalInfo(),
        portfolioAPI.getSiteSettings()
      ])

      if (!personalResult.error && personalResult.data) {
        setPersonalInfo(personalResult.data)
      }

      if (!settingsResult.error && settingsResult.data) {
        const settingsMap = {}
        settingsResult.data.forEach(setting => {
          settingsMap[setting.key] = setting.value
        })
        setContactSettings(settingsMap.contact_settings)
      }
    } catch (error) {
      console.error('Error fetching contact info:', error)
    }
  }

  async function onSubmit(values) {
    if (values.hp) return // bot protection
    try {
      // Save message to database
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          subject: values.subject,
          message: values.message,
          status: 'new',
          ip_address: null, // Could be captured if needed
          user_agent: navigator.userAgent
        })

      if (dbError) {
        console.error('Database error:', dbError)
        throw new Error('Failed to save message')
      }

      // Also send email if configured
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        
        if (serviceId && templateId && publicKey) {
          await emailjs.send(serviceId, templateId, values, { publicKey })
        }
      } catch (emailError) {
        console.error('Email error:', emailError)
        // Don't throw here - message is already saved to database
      }

      setIsSuccess(true)
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (e) {
      console.error(e)
      alert('Failed to send message. Please try again or contact me directly.')
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo?.phone || '+91 9625442725',
      href: `tel:${personalInfo?.phone?.replace(/\s/g, '') || '+919625442725'}`,
      gradient: 'from-success-500 to-success-600',
      description: contactSettings?.availability || 'Available 9 AM - 8 PM IST'
    },
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo?.email || 'ak.khanarbaz777@gmail.com',
      href: `mailto:${personalInfo?.email || 'ak.khanarbaz777@gmail.com'}`,
      gradient: 'from-brand-500 to-brand-600',
      description: `Response within ${contactSettings?.response_time || '24 hours'}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo?.location || 'Ballabgarh 121004, Faridabad',
      href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo?.location || 'Ballabgarh,Faridabad')}`,
      gradient: 'from-accent-500 to-accent-600',
      description: 'Available for local meetings'
    }
  ]

  const quickActions = [
    { icon: MessageCircle, label: 'Quick Chat', action: 'Let\'s discuss your project', gradient: 'from-info-500 to-info-600' },
    { icon: User, label: 'Schedule Meeting', action: 'Book a consultation call', gradient: 'from-warning-500 to-warning-600' },
    { icon: Clock, label: 'Project Quote', action: 'Get a custom estimate', gradient: 'from-success-500 to-success-600' }
  ]

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
          <span className="gradient-text">Let's Work Together</span>
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Ready to bring your ideas to life? I'd love to hear about your project and discuss how we can create something amazing together.
        </p>
      </Motion.div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {contactInfo.map((info, i) => (
          <Motion.a
            key={info.label}
            href={info.href}
            target={info.href.startsWith('http') ? '_blank' : undefined}
            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="card text-center group hover:glow transition-all duration-500"
          >
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${info.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <info.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors duration-300">
              {info.label}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 font-medium mb-2">
              {info.value}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {info.description}
            </p>
          </Motion.a>
        ))}
      </div>

      {/* Quick Actions */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-bold text-center mb-8">
          <span className="gradient-text">How Can I Help?</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, i) => (
            <Motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const messageField = document.querySelector('textarea[name="message"]')
                if (messageField) {
                  messageField.value = `Hi Arbaz, I'm interested in: ${action.action}`
                  messageField.focus()
                }
              }}
              className={`p-4 rounded-xl bg-gradient-to-r ${action.gradient} text-white font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-3`}
            >
              <action.icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">{action.label}</div>
                <div className="text-sm opacity-90">{action.action}</div>
              </div>
            </Motion.button>
          ))}
        </div>
      </Motion.div>

      {/* Contact Form */}
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Send className="w-6 h-6 text-brand-600" />
            <span className="gradient-text">Send Message</span>
          </h3>

          {isSuccess && (
            <Motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-success-50 to-success-100 border border-success-200 dark:from-success-900/20 dark:to-success-800/20 dark:border-success-800/30"
            >
              <div className="flex items-center gap-3 text-success-700 dark:text-success-300">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
              </div>
            </Motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot */}
            <div className="hidden">
              <input aria-hidden="true" tabIndex={-1} {...register('hp')} />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Full Name *
              </label>
              <input
                {...register('name')}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                  {errors.name.message?.toString()}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                  {errors.phone.message?.toString()}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Subject *
              </label>
              <input
                {...register('subject')}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all duration-300 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                  {errors.subject.message?.toString()}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Message *
              </label>
              <textarea
                rows={6}
                {...register('message')}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-brand-400 focus:border-transparent outline-none transition-all duration-300 resize-none dark:border-slate-700 dark:bg-slate-900/80 dark:text-white"
                placeholder="Tell me about your project, timeline, budget, or any questions you have..."
              />
              {errors.message && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-xs">!</span>
                  {errors.message.message?.toString()}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </span>
              {!isSubmitting && <div className="absolute inset-0 shimmer opacity-30" />}
            </Motion.button>
          </form>
        </Motion.div>

        {/* Contact Info & CTA */}
        <Motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Character Image */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <img 
                src={callMeImage} 
                alt="Call Me" 
                className="w-48 h-48 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-success-500/20 to-transparent rounded-full blur-xl"></div>
            </div>
          </Motion.div>

          {/* Personal Info Card */}
          <div className="card">
            <h3 className="text-2xl font-bold mb-6">
              <span className="gradient-text">Get In Touch</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50">
                <Phone className="w-5 h-5 text-success-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+919625442725" className="text-slate-600 dark:text-slate-400 hover:text-brand-600">
                    +91 9625442725
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50">
                <Mail className="w-5 h-5 text-brand-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:ak.khanarbaz777@gmail.com" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 break-all">
                    ak.khanarbaz777@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50">
                <MapPin className="w-5 h-5 text-accent-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    Ballabgarh 121004<br />
                    Faridabad, Haryana
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="card">
            <h4 className="font-bold mb-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-info-600" />
              Response Time
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Email Response:</span>
                <span className="font-medium text-success-600">Within 24 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Phone Availability:</span>
                <span className="font-medium text-info-600">9 AM - 8 PM IST</span>
              </div>
              <div className="flex justify-between">
                <span>Project Quotes:</span>
                <span className="font-medium text-warning-600">Within 48 hours</span>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}


