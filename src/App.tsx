import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context'
import { ThemeProvider } from './theme/ThemeProvider'
import {
  LoginPage,
  AdminDashboard,
  ViewAttendance,
  ManageStudents,
  ExportReports,
  FacultyDashboard,
  UploadAttendance,
  ViewMyAttendance
} from './pages'

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({
  children,
  allowedRoles
}) => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/faculty'} replace />
  }

  return <>{children}</>
}

// Role-based redirect component
const RoleBasedRedirect: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      Loading...
    </div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Navigate to={user?.role === 'admin' ? '/admin' : '/faculty'} replace />
}

// App Routes Component
const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && user) {
      const currentPath = window.location.pathname
      if (currentPath === '/' || currentPath === '/login') {
        navigate(user.role === 'admin' ? '/admin' : '/faculty', { replace: true })
      }
    }
  }, [isAuthenticated, user, navigate])

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ViewAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageStudents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/export"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ExportReports />
          </ProtectedRoute>
        }
      />

      {/* Faculty Routes */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/upload"
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <UploadAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/view"
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <ViewMyAttendance />
          </ProtectedRoute>
        }
      />

      {/* Default Route */}
      <Route path="/" element={<RoleBasedRedirect />} />
      
      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
