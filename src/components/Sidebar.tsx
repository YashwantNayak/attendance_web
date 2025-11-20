import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Upload,
  Eye,
  Users,
  FileSpreadsheet,
  Calendar
} from 'lucide-react'
import { useAuth } from '../context'

export const Sidebar: React.FC = () => {
  const { user } = useAuth()

  const sidebarStyle: React.CSSProperties = {
    width: '250px',
    background: 'var(--card)',
    height: 'calc(100vh - 60px)',
    padding: '1.5rem 0',
    boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
    position: 'fixed',
    top: '60px',
    left: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }

  const navStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }

  const linkBaseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1.5rem',
    color: 'var(--text)',
    textDecoration: 'none',
    transition: 'background 0.2s',
    fontSize: '0.95rem'
  }

  const activeLinkStyle: React.CSSProperties = {
    ...linkBaseStyle,
    background: 'var(--primary)',
    color: 'white',
    fontWeight: '500'
  }

  const footerStyle: React.CSSProperties = {
    padding: '1rem 1.5rem',
    borderTop: '1px solid var(--primary)',
    fontSize: '0.75rem',
    color: 'var(--text)',
    opacity: 0.7,
    textAlign: 'center'
  }

  const poweredByStyle: React.CSSProperties = {
    fontWeight: '600',
    marginBottom: '0.25rem'
  }

  const versionStyle: React.CSSProperties = {
    fontSize: '0.7rem',
    opacity: 0.6
  }

  const adminLinks = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/attendance', icon: <Eye size={20} />, label: 'View Attendance' },
    { to: '/admin/students', icon: <Users size={20} />, label: 'Manage Students' },
    { to: '/admin/export', icon: <FileSpreadsheet size={20} />, label: 'Export Reports' }
  ]

  const facultyLinks = [
    { to: '/faculty', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/faculty/upload', icon: <Upload size={20} />, label: 'Upload Attendance' },
    { to: '/faculty/view', icon: <Calendar size={20} />, label: 'My Attendance' }
  ]

  const links = user?.role === 'admin' ? adminLinks : facultyLinks

  return (
    <aside style={sidebarStyle}>
      <nav style={navStyle}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin' || link.to === '/faculty'}
            style={({ isActive }) => (isActive ? activeLinkStyle : linkBaseStyle)}
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div style={footerStyle}>
        <div style={poweredByStyle}>Powered by SSIPMT</div>
        <div style={versionStyle}>v1.0.0</div>
      </div>
    </aside>
  )
}
