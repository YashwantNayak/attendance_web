import React from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }

  const mainContainerStyle: React.CSSProperties = {
    flex: 1
  }

  const contentStyle: React.CSSProperties = {
    flex: 1,
    padding: '2rem',
    background: 'var(--bg)',
    overflowY: 'auto',
    marginLeft: '250px'
  }

  return (
    <div style={containerStyle}>
      <Header />
      <div style={mainContainerStyle}>
        <Sidebar />
        <main style={contentStyle}>{children}</main>
      </div>
    </div>
  )
}
