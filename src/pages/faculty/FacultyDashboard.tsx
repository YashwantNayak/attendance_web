import React, { useEffect, useState } from 'react'
import { Layout } from '../../components'
import { useAuth } from '../../context'
import { AttendanceSession } from '../../types'
import { getAttendanceSessions } from '../../services'
import { Upload, Calendar, BookOpen, TrendingUp } from 'lucide-react'

export default function FacultyDashboard() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<AttendanceSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [user])

  const loadDashboardData = async () => {
    try {
      const data = await getAttendanceSessions({ facultyId: user?.id })
      setSessions(data)
    } catch (error) {
      console.error('Failed to load dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalSessions = sessions.length
  const todaySessions = sessions.filter((s) => {
    const today = new Date().toISOString().split('T')[0]
    return s.date.startsWith(today)
  }).length

  const pageStyle: React.CSSProperties = {
    maxWidth: '1400px'
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '2rem'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: 'var(--text)'
  }

  const subtitleStyle: React.CSSProperties = {
    color: '#6b7280',
    fontSize: '1rem'
  }

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  }

  const statCardStyle: React.CSSProperties = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  }

  const statIconStyle: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const statContentStyle: React.CSSProperties = {
    flex: 1
  }

  const statLabelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '0.25rem'
  }

  const statValueStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1f2937'
  }

  const infoCardStyle: React.CSSProperties = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginTop: '2rem'
  }

  if (isLoading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading dashboard...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Faculty Dashboard</h1>
          <p style={subtitleStyle}>Welcome back, {user?.name}</p>
        </div>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, background: '#dbeafe' }}>
              <Calendar size={28} color="#3b82f6" />
            </div>
            <div style={statContentStyle}>
              <div style={statLabelStyle}>Today's Sessions</div>
              <div style={statValueStyle}>{todaySessions}</div>
            </div>
          </div>

          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, background: '#d1fae5' }}>
              <Upload size={28} color="#10b981" />
            </div>
            <div style={statContentStyle}>
              <div style={statLabelStyle}>Total Uploaded</div>
              <div style={statValueStyle}>{totalSessions}</div>
            </div>
          </div>

          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, background: '#e0e7ff' }}>
              <BookOpen size={28} color="#6366f1" />
            </div>
            <div style={statContentStyle}>
              <div style={statLabelStyle}>My Subjects</div>
              <div style={statValueStyle}>{user?.assignedSubjects?.length || 0}</div>
            </div>
          </div>
        </div>

        <div style={infoCardStyle}>
          <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Quick Actions</h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Use the sidebar to navigate:
          </p>
          <ul style={{ textAlign: 'left', color: '#4b5563', lineHeight: '1.8' }}>
            <li><strong>Upload Attendance</strong> - Record attendance for today's lectures</li>
            <li><strong>My Attendance</strong> - View and edit your uploaded attendance records</li>
          </ul>

          {user?.assignedSubjects && user.assignedSubjects.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: '#374151', marginBottom: '0.5rem' }}>Your Assigned Subjects:</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {user.assignedSubjects.map((subject, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#e0e7ff',
                      color: '#4f46e5',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
