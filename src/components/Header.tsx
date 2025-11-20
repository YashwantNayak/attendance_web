import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, User as UserIcon } from 'lucide-react'
import { useAuth } from '../context'

export const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const headerStyle: React.CSSProperties = {
    height: '85px',
    background: 'var(--primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }

  const logoStyle: React.CSSProperties = {
    height: '50px',
    width: 'auto'
  }

  const userSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }

  const userInfoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  const roleStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  }

  const logoutBtnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    transition: 'background 0.2s'
  }

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>
        <img src="/logo.png" alt="Logo" style={logoStyle} />
        Attendance Monitoring System
      </h1>
      <div style={userSectionStyle}>
        <div style={userInfoStyle}>
          <UserIcon size={20} />
          <div>
            <div style={{ fontWeight: '500' }}>{user?.name}</div>
            <div style={roleStyle}>{user?.role}</div>
          </div>
        </div>
        <button style={logoutBtnStyle} onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  )
}
