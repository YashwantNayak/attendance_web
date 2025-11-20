import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { lightTheme, darkTheme, Theme, ThemeName } from './theme'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState<ThemeName>(() => {
    try {
      const stored = localStorage.getItem('app-theme') as ThemeName | null
      return stored ?? 'light'
    } catch {
      return 'light'
    }
  })

  useEffect(() => {
    try { localStorage.setItem('app-theme', name) } catch {}
    document.documentElement.setAttribute('data-theme', name)
  }, [name])

  const theme = useMemo(() => (name === 'dark' ? darkTheme : lightTheme), [name])

  const toggleTheme = () => setName((s) => (s === 'light' ? 'dark' : 'light'))

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
