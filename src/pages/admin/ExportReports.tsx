import React, { useEffect, useState } from 'react'
import { Layout, ExportButton, FilterPanel } from '../../components'
import { AttendanceFilter } from '../../types'
import { getAttendanceSessions } from '../../services'

export default function ExportReports() {
  const [filter, setFilter] = useState<AttendanceFilter>({})
  const [exportData, setExportData] = useState<any[]>([])

  useEffect(() => {
    loadExportData()
  }, [filter])

  const loadExportData = async () => {
    try {
      const sessions = await getAttendanceSessions(filter)
      
      // Transform sessions to exportable format
      const data = sessions.flatMap((session) =>
        session.records.map((record) => ({
          Date: session.date,
          Subject: session.subject,
          Semester: session.semester,
          Section: session.section,
          Lecture: session.lectureNumber,
          Faculty: session.facultyName,
          StudentID: record.studentId,
          StudentName: record.studentName,
          RollNo: record.rollNo,
          Status: record.status
        }))
      )

      setExportData(data)
    } catch (error) {
      console.error('Failed to load export data:', error)
    }
  }

  const pageStyle: React.CSSProperties = {
    maxWidth: '1200px'
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text)'
  }

  const infoCardStyle: React.CSSProperties = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginTop: '2rem'
  }

  return (
    <Layout>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Export Reports</h1>
          <ExportButton exportOptions={filter} data={exportData} />
        </div>

        <FilterPanel
          filter={filter}
          onFilterChange={setFilter}
          subjects={['Data Structures', 'Algorithms', 'DBMS', 'OS', 'CN', 'SE']}
        />

        <div style={infoCardStyle}>
          <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>
            Export Information
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Total records to export: <strong>{exportData.length}</strong>
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Apply filters above to customize the export data. Select your preferred format (CSV/PDF)
            and click Export to download the report.
          </p>
        </div>
      </div>
    </Layout>
  )
}
