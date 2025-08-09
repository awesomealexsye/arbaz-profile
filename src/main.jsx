import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { Projects } from './pages/Projects.jsx'
import { Skills } from './pages/Skills.jsx'
import { Experience } from './pages/Experience.jsx'
import { Contact } from './pages/Contact.jsx'

// Import admin components
import { AuthProvider } from './contexts/AuthContext.jsx'
import AdminLogin from './components/admin/AdminLogin.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'

// Import admin pages
import Dashboard from './pages/admin/Dashboard.jsx'

import Profile from './pages/admin/Profile.jsx'
import AdminSkills from './pages/admin/Skills.jsx'
import AdminExperience from './pages/admin/Experience.jsx'
import AdminProjects from './pages/admin/Projects.jsx'
import AdminMessages from './pages/admin/Messages.jsx'
import AdminSettings from './pages/admin/Settings.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'skills', element: <Skills /> },
      { path: 'experience', element: <Experience /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  // Admin routes
  {
    path: '/admin/login',
    element: (
      <AuthProvider>
        <AdminLogin />
        <Toaster position="top-right" />
      </AuthProvider>
    ),
  },
  {
    path: '/admin',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
        <Toaster position="top-right" />
      </AuthProvider>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'skills', element: <AdminSkills /> },
      { path: 'experience', element: <AdminExperience /> },
      { path: 'projects', element: <AdminProjects /> },
      { path: 'messages', element: <AdminMessages /> },
      { path: 'settings', element: <AdminSettings /> },
      // Redirect /admin to /admin/dashboard
      { index: true, element: <Dashboard /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
