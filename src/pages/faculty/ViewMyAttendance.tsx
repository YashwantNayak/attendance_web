import React, { useEffect, useState } from 'react'
import { Layout, AttendanceTable, FilterPanel } from '../../components'
import { useAuth } from '../../context'
import { AttendanceSession, AttendanceFilter } from '../../types'
import { getAttendanceSessions, updateAttendanceSession } from '../../services'
import { isToday } from '../../utils'

export default function ViewMyAttendance() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<AttendanceSession[]>([])
  const [filter, setFilter] = useState<AttendanceFilter>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAttendance()
  }, [filter, user])

  const loadAttendance = async () => {
    setIsLoading(true)
    try {
      const data = await getAttendanceSessions({ ...filter, facultyId: user?.id })
      setSessions(data)
    } catch (error) {
      console.error('Failed to load attendance:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (session: AttendanceSession) => {
    if (!isToday(session.date)) {
      alert('You can only edit attendance for today')
      return
    }
    
    // In a real app, this would open a modal/form to edit the session
    alert('Edit functionality - Would open edit form for session ' + session.id)
  }

  const pageStyle: React.CSSProperties = {
    maxWidth: '1400px'
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '2rem'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text)'
  }

  return (
    <Layout>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>My Attendance Records</h1>
        </div>

        <FilterPanel
          filter={filter}
          onFilterChange={setFilter}
          subjects={user?.assignedSubjects || []}
        />

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading attendance...</div>
        ) : (
          <AttendanceTable sessions={sessions} onEdit={handleEdit} />
        )}
      </div>
    </Layout>
  )
}
