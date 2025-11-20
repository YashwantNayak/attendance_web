import React, { useEffect, useState } from 'react'
import { Layout } from '../../components'
import { useAuth } from '../../context'
import { AttendanceSession, AttendanceStats } from '../../types'
import { getAttendanceSessions } from '../../services'
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react'
import SimpleLineChart from '../../components/SimpleLineChart'
import { SECTIONS, SEMESTERS } from '../../utils'
import { formatDisplayDate } from '../../utils'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<AttendanceSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const data = await getAttendanceSessions()
      setSessions(data)
    } catch (error) {
      console.error('Failed to load dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const totalSessions = sessions.length
  const totalPresent = sessions.reduce(
    (sum, s) => sum + s.records.filter((r) => r.status === 'present').length,
    0
  )
  const totalRecords = sessions.reduce((sum, s) => sum + s.records.length, 0)
  const avgAttendance = totalRecords > 0 ? ((totalPresent / totalRecords) * 100).toFixed(1) : '0'

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
    textAlign: 'center'
  }

  if (isLoading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '4rem' }}>Loading dashboard...</div>
      </Layout>
    )
  }

  // Aggregate data for chart: by date for section and semester
  const dateMap: Record<string, { sectionPresent: number; sectionTotal: number; semesterPresent: number; semesterTotal: number }> = {}
  sessions.forEach((s) => {
    const date = s.date
    if (!dateMap[date]) {
      dateMap[date] = { sectionPresent: 0, sectionTotal: 0, semesterPresent: 0, semesterTotal: 0 }
    }
    const present = s.records.filter(r => r.status === 'present').length
    const total = s.records.length
    dateMap[date].sectionPresent += present
    dateMap[date].sectionTotal += total
    dateMap[date].semesterPresent += present
    dateMap[date].semesterTotal += total
  })

  const sectionChartData = Object.keys(dateMap).sort().map(date => ({
    label: date,
    value: dateMap[date].sectionTotal > 0 ? Math.round((dateMap[date].sectionPresent / dateMap[date].sectionTotal) * 100) : 0
  }))

  const semesterChartData = Object.keys(dateMap).sort().map(date => ({
    label: date,
    value: dateMap[date].semesterTotal > 0 ? Math.round((dateMap[date].semesterPresent / dateMap[date].semesterTotal) * 100) : 0
  }))

  // Teacher stats (principal view requirement): sessions per faculty
  const teacherMap: Record<string, { sessions: number; records: number; lastActive: string }> = {}
  sessions.forEach((s) => {
    const name = s.facultyName || s.facultyId || 'Unknown'
    if (!teacherMap[name]) teacherMap[name] = { sessions: 0, records: 0, lastActive: s.updatedAt }
    teacherMap[name].sessions += 1
    teacherMap[name].records += s.records.length
    if (new Date(s.updatedAt).getTime() > new Date(teacherMap[name].lastActive).getTime()) {
      teacherMap[name].lastActive = s.updatedAt
    }
  })
  const teachers = Object.keys(teacherMap).map((name) => ({ name, ...teacherMap[name] }))

  return (
    <Layout>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Admin Dashboard</h1>
          <p style={subtitleStyle}>Welcome back, {user?.name}</p>
        </div>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, background: '#dbeafe' }}>
              <Calendar size={28} color="#3b82f6" />
            </div>
            <div style={statContentStyle}>
              <div style={statLabelStyle}>Total Sessions</div>
              <div style={statValueStyle}>{totalSessions}</div>
            </div>
          </div>

          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, background: '#d1fae5' }}>
              <Users size={28} color="#10b981" />
            </div>
            <div style={statContentStyle}>
              <div style={statLabelStyle}>Total Attendance</div>
              <div style={statValueStyle}>{totalRecords}</div>
            </div>
          </div>

          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, background: '#fef3c7' }}>
              <TrendingUp size={28} color="#f59e0b" />
            </div>
            <div style={statContentStyle}>
              <div style={statLabelStyle}>Avg Attendance</div>
              <div style={statValueStyle}>{avgAttendance}%</div>
            </div>
          </div>

          <div style={statCardStyle}>
            <div style={{ ...statIconStyle, background: '#e0e7ff' }}>
              <BookOpen size={28} color="#6366f1" />
            </div>
            <div style={statContentStyle}>
              <div style={statLabelStyle}>Department</div>
              <div style={statValueStyle}>CSE</div>
            </div>
          </div>
        </div>

        {/* Chart + Teacher Stats */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text)' }}>Attendance Overview</h2>
          <div style={{ background: 'white', padding: '1rem', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <SimpleLineChart sectionData={sectionChartData} semesterData={semesterChartData} width={1000} height={320} />
            <div style={{ marginTop: 12, color: '#6b7280', fontSize: 13 }}>
              Chart shows attendance trends over time for sections and semesters.
            </div>
          </div>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', color: 'var(--text)' }}>Teachers Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {teachers.length === 0 && <div style={{ color: '#6b7280' }}>No teacher data available</div>}
            {teachers.map((t) => (
              <div key={t.name} style={{ background: 'white', padding: 12, borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                <div style={{ fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: '#6b7280', fontSize: 13 }}>Sessions: {t.sessions}</div>
                <div style={{ color: '#6b7280', fontSize: 13 }}>Marked Records: {t.records}</div>
                <div style={{ color: '#6b7280', fontSize: 12, marginTop: 6 }}>Last Active: {formatDisplayDate(t.lastActive)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
