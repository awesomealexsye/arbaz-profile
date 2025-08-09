import React, { createContext, useContext, useEffect, useState } from 'react'
import { adminAuth } from '../lib/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        const { success, session: currentSession, admin: adminData, user: userData } = await adminAuth.getSession()
        
        if (mounted) {
          if (success && currentSession && adminData) {
            setSession(currentSession)
            setUser(userData)
            setAdmin(adminData)
            setIsAuthenticated(true)
          } else {
            setSession(null)
            setUser(null)
            setAdmin(null)
            setIsAuthenticated(false)
          }
          setLoading(false)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (mounted) {
          setSession(null)
          setUser(null)
          setAdmin(null)
          setIsAuthenticated(false)
          setLoading(false)
        }
      }
    }

    initializeAuth()

    return () => {
      mounted = false
    }
  }, [])

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const result = await adminAuth.signIn(email, password)
      
      if (result.success) {
        setSession(result.session)
        setUser(result.user)
        setAdmin(result.admin)
        setIsAuthenticated(true)
        toast.success(`Welcome back, ${result.admin.name}!`)
        return { success: true }
      } else {
        toast.error(result.error || 'Login failed')
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error('An unexpected error occurred')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      setLoading(true)
      const result = await adminAuth.signOut()
      
      if (result.success) {
        setSession(null)
        setUser(null)
        setAdmin(null)
        setIsAuthenticated(false)
        toast.success('Signed out successfully')
        return { success: true }
      } else {
        toast.error(result.error || 'Sign out failed')
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('An unexpected error occurred')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Update admin data
  const updateAdmin = (adminData) => {
    setAdmin(adminData)
  }

  const value = {
    // State
    user,
    admin,
    session,
    loading,
    isAuthenticated,
    
    // Actions
    signIn,
    signOut,
    updateAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
