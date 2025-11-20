import React from 'react'
import { AttendanceFilter, Section, Semester } from '../types'
import { SECTIONS, SEMESTERS } from '../utils'

interface FilterPanelProps {
  filter: AttendanceFilter
  onFilterChange: (filter: AttendanceFilter) => void
  showFacultyFilter?: boolean
  subjects?: string[]
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filter,
  onFilterChange,
  showFacultyFilter = false,
  subjects = []
}) => {
  const panelStyle: React.CSSProperties = {
    background: 'var(--card)',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  }

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--text)'
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.9rem',
    background: 'var(--bg)',
    color: 'var(--text)'
  }

  return (
    <div style={panelStyle}>
      <div style={gridStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Semester</label>
          <select
            style={inputStyle}
            value={filter.semester || ''}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                semester: e.target.value ? (Number(e.target.value) as Semester) : undefined
              })
            }
          >
            <option value="">All Semesters</option>
            {SEMESTERS.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Section</label>
          <select
            style={inputStyle}
            value={filter.section || ''}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                section: e.target.value ? (e.target.value as Section) : undefined
              })
            }
          >
            <option value="">All Sections</option>
            {SECTIONS.map((sec) => (
              <option key={sec} value={sec}>
                Section {sec}
              </option>
            ))}
          </select>
        </div>

        {subjects.length > 0 && (
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Subject</label>
            <select
              style={inputStyle}
              value={filter.subject || ''}
              onChange={(e) =>
                onFilterChange({ ...filter, subject: e.target.value || undefined })
              }
            >
              <option value="">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            style={inputStyle}
            value={filter.date || ''}
            onChange={(e) => onFilterChange({ ...filter, date: e.target.value || undefined })}
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Lecture Number</label>
          <select
            style={inputStyle}
            value={filter.lectureNumber || ''}
            onChange={(e) =>
              onFilterChange({
                ...filter,
                lectureNumber: e.target.value ? Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 : undefined
              })
            }
          >
            <option value="">All Lectures</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                Lecture {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
