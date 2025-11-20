import React, { useEffect, useState } from 'react'
import { Layout, AttendanceTable, FilterPanel } from '../../components'
import { AttendanceSession, AttendanceFilter } from '../../types'
import { getAttendanceSessions } from '../../services'
import { formatDisplayDate } from '../../utils'

export default function ViewAttendance() {
  const [sessions, setSessions] = useState<AttendanceSession[]>([])
  const [filter, setFilter] = useState<AttendanceFilter>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAttendance()
  }, [filter])

  const loadAttendance = async () => {
    setIsLoading(true)
    try {
      const data = await getAttendanceSessions(filter)
      setSessions(data)
    } catch (error) {
      console.error('Failed to load attendance:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Excel-style flattened student records
  const flatRecords = sessions.flatMap((session) =>
    session.records.map((record) => ({
      date: session.date,
      subject: session.subject,
      semester: session.semester,
      section: session.section,
      lecture: session.isCombined
        ? `L${session.combinedLectures?.[0]}-${session.combinedLectures?.[1]}`
        : `L${session.lectureNumber}`,
      faculty: session.facultyName,
      rollNo: record.rollNo,
      studentName: record.studentName,
      status: record.status
    }))
  )

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

  const excelTableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    fontSize: '0.875rem'
  }

  const thStyle: React.CSSProperties = {
    background: '#f3f4f6',
    color: '#374151',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.8rem',
    borderBottom: '2px solid #e5e7eb',
    whiteSpace: 'nowrap'
  }

  const tdStyle: React.CSSProperties = {
    padding: '0.625rem 1rem',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '0.85rem'
  }

  const statusStyle = (status: string): React.CSSProperties => ({
    ...tdStyle,
    color: status === 'present' ? '#10b981' : '#ef4444',
    fontWeight: '600'
  })

  return (
    <Layout>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>View Attendance</h1>
        </div>

        <FilterPanel
          filter={filter}
          onFilterChange={setFilter}
          subjects={['Data Structures', 'Algorithms', 'DBMS', 'OS', 'CN', 'SE']}
        />

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading attendance...</div>
        ) : (
          <>
            {/* Session Summary Cards */}
            <div style={{ marginBottom: '1.5rem' }}>
              <AttendanceTable sessions={sessions} />
            </div>

            {/* Excel-Style Detailed Records */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#1f2937', fontSize: '1.25rem' }}>
                Detailed Student Records ({flatRecords.length} entries)
              </h3>
              <div style={{ overflowX: 'auto', background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <table style={excelTableStyle}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Date</th>
                      <th style={thStyle}>Subject</th>
                      <th style={thStyle}>Sem</th>
                      <th style={thStyle}>Sec</th>
                      <th style={thStyle}>Lecture</th>
                      <th style={thStyle}>Faculty</th>
                      <th style={thStyle}>Roll No</th>
                      <th style={thStyle}>Student Name</th>
                      <th style={thStyle}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flatRecords.length === 0 ? (
                      <tr>
                        <td colSpan={9} style={{ ...tdStyle, textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                          No records found for selected filters
                        </td>
                      </tr>
                    ) : (
                      flatRecords.map((record, idx) => (
                        <tr key={idx} style={{ background: idx % 2 === 0 ? 'white' : '#fafafa' }}>
                          <td style={tdStyle}>{formatDisplayDate(record.date)}</td>
                          <td style={tdStyle}>{record.subject}</td>
                          <td style={tdStyle}>{record.semester}</td>
                          <td style={tdStyle}>{record.section}</td>
                          <td style={tdStyle}>{record.lecture}</td>
                          <td style={tdStyle}>{record.faculty}</td>
                          <td style={tdStyle}>{record.rollNo}</td>
                          <td style={tdStyle}>{record.studentName}</td>
                          <td style={statusStyle(record.status)}>
                            {record.status.toUpperCase()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
