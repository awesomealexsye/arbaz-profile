import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://enfszrobxyengdmagvaj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuZnN6cm9ieHllbmdkbWFndmFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTY3MjgsImV4cCI6MjA3MDI5MjcyOH0.UUPVYm2_jKJ_g905XLLoFWReSn_wsPkAHAd5LVhRU9k'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})

// Admin-specific functions
export const adminAuth = {
  // Sign in admin user
  async signIn(email, password) {
    try {
      // 1. Authenticate with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (authError) throw authError

      // 2. Verify admin status
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single()

      if (adminError || !adminData) {
        // Sign out if not an admin
        await supabase.auth.signOut()
        throw new Error('Unauthorized: Invalid admin credentials')
      }

      // 3. Update last login
      await supabase
        .from('admin_users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', adminData.id)

      return { 
        success: true, 
        user: authData.user, 
        admin: adminData,
        session: authData.session 
      }
    } catch (error) {
      console.error('Admin sign in error:', error)
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      }
    }
  },

  // Sign out admin
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Admin sign out error:', error)
      return { success: false, error: error.message }
    }
  },

  // Get current session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error

      if (!session) {
        return { success: false, session: null, admin: null }
      }

      // Verify admin status
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', session.user.email)
        .eq('is_active', true)
        .single()

      if (adminError || !adminData) {
        await supabase.auth.signOut()
        return { success: false, session: null, admin: null }
      }

      return { 
        success: true, 
        session, 
        admin: adminData,
        user: session.user 
      }
    } catch (error) {
      console.error('Get session error:', error)
      return { success: false, session: null, admin: null }
    }
  }
}

// Portfolio data functions
export const portfolioAPI = {
  // Personal Info
  async getPersonalInfo() {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*')
      .eq('is_active', true)
      .single()
    return { data, error }
  },

  async updatePersonalInfo(updates) {
    const { data, error } = await supabase
      .from('personal_info')
      .update(updates)
      .eq('is_active', true)
      .select()
      .single()
    return { data, error }
  },

  // Skills
  async getSkillCategories() {
    const { data, error } = await supabase
      .from('skill_categories')
      .select(`
        *,
        skills:skills(*)
      `)
      .eq('is_active', true)
      .order('order_index')
    return { data, error }
  },

  async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        category:skill_categories(*)
      `)
      .eq('is_active', true)
      .order('order_index')
    return { data, error }
  },

  // Experiences
  async getExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select(`
        *,
        achievements:achievements(*)
      `)
      .eq('is_active', true)
      .order('order_index')
    return { data, error }
  },

  // Projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        technologies:project_technologies(*)
      `)
      .eq('is_active', true)
      .order('order_index')
    return { data, error }
  },

  // Portfolio Stats
  async getPortfolioStats() {
    const { data, error } = await supabase
      .from('portfolio_stats')
      .select('*')
      .eq('is_active', true)
      .order('order_index')
    return { data, error }
  },

  // Contact Messages
  async getContactMessages() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async updateMessageStatus(id, status) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  // Site Settings
  async getSiteSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
    return { data, error }
  },

  async updateSiteSettings(key, value) {
    // Handle null values properly
    const settingsData = { key, value: value === null ? null : value }
    
    const { data, error } = await supabase
      .from('site_settings')
      .upsert(settingsData, {
        onConflict: 'key'
      })
      .select()
      .single()
    return { data, error }
  }
}

// Image compression utility
export const compressImage = (file, maxSizeKB = 100, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      const maxDimension = 800 // Max width or height
      let { width, height } = img

      if (width > height) {
        if (width > maxDimension) {
          height = (height * maxDimension) / width
          width = maxDimension
        }
      } else {
        if (height > maxDimension) {
          width = (width * maxDimension) / height
          height = maxDimension
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)

      // Convert to blob with specified quality
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Check if still too large, reduce quality further
            const sizeKB = blob.size / 1024
            if (sizeKB > maxSizeKB && quality > 0.1) {
              // Recursively compress with lower quality
              const reader = new FileReader()
              reader.onload = () => {
                const newFile = new File([blob], file.name, { type: file.type })
                compressImage(newFile, maxSizeKB, quality * 0.8)
                  .then(resolve)
                  .catch(reject)
              }
              reader.readAsDataURL(blob)
            } else {
              resolve(blob)
            }
          } else {
            reject(new Error('Canvas to Blob conversion failed'))
          }
        },
        file.type,
        quality
      )
    }

    img.onerror = () => reject(new Error('Image load failed'))
    img.src = URL.createObjectURL(file)
  })
}

export default supabase
