import React from 'react'
import { AttendanceSession } from '../types'
import { formatDisplayDate } from '../utils'

interface AttendanceTableProps {
  sessions: AttendanceSession[]
  onEdit?: (session: AttendanceSession) => void
  onDelete?: (sessionId: string) => void
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  sessions,
  onEdit,
  onDelete
}) => {
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }

  const thStyle: React.CSSProperties = {
    background: 'var(--primary)',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.9rem'
  }

  const tdStyle: React.CSSProperties = {
    padding: '0.875rem 1rem',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '0.9rem'
  }

  const actionBtnStyle: React.CSSProperties = {
    padding: '0.375rem 0.75rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    marginRight: '0.5rem'
  }

  if (sessions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
        No attendance records found
      </div>
    )
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Subject</th>
          <th style={thStyle}>Semester</th>
          <th style={thStyle}>Section</th>
          <th style={thStyle}>Lecture</th>
          <th style={thStyle}>Faculty</th>
          <th style={thStyle}>Present/Total</th>
          {(onEdit || onDelete) && <th style={thStyle}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {sessions.map((session) => {
          const presentCount = session.records.filter((r) => r.status === 'present').length
          const totalCount = session.records.length

          return (
            <tr key={session.id}>
              <td style={tdStyle}>{formatDisplayDate(session.date)}</td>
              <td style={tdStyle}>{session.subject}</td>
              <td style={tdStyle}>{session.semester}</td>
              <td style={tdStyle}>{session.section}</td>
              <td style={tdStyle}>
                {session.isCombined
                  ? `L${session.combinedLectures?.[0]}-${session.combinedLectures?.[1]}`
                  : `L${session.lectureNumber}`}
              </td>
              <td style={tdStyle}>{session.facultyName}</td>
              <td style={tdStyle}>
                {presentCount}/{totalCount}
              </td>
              {(onEdit || onDelete) && (
                <td style={tdStyle}>
                  {onEdit && (
                    <button
                      style={{ ...actionBtnStyle, background: '#3b82f6', color: 'white' }}
                      onClick={() => onEdit(session)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      style={{ ...actionBtnStyle, background: '#ef4444', color: 'white' }}
                      onClick={() => onDelete(session.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
