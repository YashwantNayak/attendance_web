import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '../context'
import { useTheme } from '../theme/ThemeProvider'
import { LoginCredentials } from '../types'
import { validateLoginCredentials } from '../utils'

export default function LoginPage() {
  const { theme } = useTheme()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateLoginCredentials(credentials)
    if (validationErrors.length > 0) {
      const errorMap: any = {}
      validationErrors.forEach((err) => {
        errorMap[err.field] = err.message
      })
      setErrors(errorMap)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      await login(credentials)
      // Navigation will be handled by App.tsx based on user role
    } catch (error: any) {
      setErrors({ email: error.message || 'Login failed' })
    } finally {
      setIsLoading(false)
    }
  }

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, rgba(108, 165, 255, 0.79) 10%, rgba(0, 21, 117, 0.73) 50%), url(/image.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    // backgroundAttachment: 'fixed',
    padding: '8rem'
  }

  const cardStyle: React.CSSProperties = {
    background: 'var(--card)',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(4, 30, 198, 0.3)',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid var(--primary)'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: 'var(--text)',
    textAlign: 'center'
  }

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--text)',
    opacity: 0.7,
    fontSize: '0.9rem',
    marginBottom: '2rem',
    textAlign: 'center'
  }

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  }

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--text)'
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    border: '1px solid var(--primary)',
    borderRadius: '8px',
    fontSize: '1rem',
    background: 'var(--card)',
    color: 'var(--text)',
    transition: 'border-color 0.2s'
  }

  const errorInputStyle: React.CSSProperties = {
    ...inputStyle,
    borderColor: '#ef4444'
  }

  const errorTextStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '0.8rem',
    marginTop: '0.25rem'
  }

  const buttonStyle: React.CSSProperties = {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '0.875rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
    opacity: isLoading ? 0.7 : 1
  }

  const hintStyle: React.CSSProperties = {
    marginTop: '1.5rem',
    padding: '1rem',
    background: 'var(--card)',
    border: '1px solid var(--primary)',
    borderRadius: '8px',
    fontSize: '0.8rem',
    color: 'var(--text)'
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>AMS Login</h1>
        <p style={subtitleStyle}>Attendance Monitoring System</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              style={errors.email ? errorInputStyle : inputStyle}
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="your.email@college.edu"
              disabled={isLoading}
            />
            {errors.email && <div style={errorTextStyle}>{errors.email}</div>}
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              style={errors.password ? errorInputStyle : inputStyle}
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && <div style={errorTextStyle}>{errors.password}</div>}
          </div>

          <button type="submit" style={buttonStyle} disabled={isLoading}>
            <LogIn size={20} />
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={hintStyle}>
          <strong>Demo Credentials:</strong>
          <br />
          Admin: admin@college.edu / admin123
          <br />
          Faculty: faculty@college.edu / faculty123
        </div>
      </div>
    </div>
  )
}
