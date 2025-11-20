import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, LoginCredentials, UserRole } from '../types'
import { login as loginService, logout as logoutService, getCurrentUser } from '../services'

interface AuthContextValue {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const storedToken = localStorage.getItem('ams_token')
    const storedUser = localStorage.getItem('ams_user')

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('ams_token')
        localStorage.removeItem('ams_user')
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await loginService(credentials)
      setUser(response.user)
      setToken(response.token)
      localStorage.setItem('ams_token', response.token)
      localStorage.setItem('ams_user', JSON.stringify(response.user))
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    await logoutService()
    setUser(null)
    setToken(null)
  }

  const value: AuthContextValue = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
