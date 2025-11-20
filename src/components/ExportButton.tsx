import React, { useState } from 'react'
import { Download } from 'lucide-react'
import { ExportFormat, ExportOptions } from '../types'
import { exportAttendance, downloadFile, generateCSV } from '../services'

interface ExportButtonProps {
  exportOptions: Partial<ExportOptions>
  data?: any[]
}

export const ExportButton: React.FC<ExportButtonProps> = ({ exportOptions, data = [] }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [format, setFormat] = useState<ExportFormat>('csv')

  const handleExport = async () => {
    setIsExporting(true)

    try {
      if (format === 'csv' && data.length > 0) {
        // Client-side CSV generation
        const csv = generateCSV(data)
        downloadFile(csv, `attendance_${Date.now()}.csv`, 'text/csv')
      } else {
        // Server-side export
        const response = await exportAttendance({ ...exportOptions, format })
        // In production, this would download from response.url
        alert(`Export ready: ${response.filename}`)
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  }

  const selectStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.9rem',
    background: 'var(--bg)'
  }

  const buttonStyle: React.CSSProperties = {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: isExporting ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    opacity: isExporting ? 0.6 : 1
  }

  return (
    <div style={containerStyle}>
      <select style={selectStyle} value={format} onChange={(e) => setFormat(e.target.value as ExportFormat)}>
        <option value="csv">CSV</option>
        <option value="pdf">PDF</option>
      </select>
      <button style={buttonStyle} onClick={handleExport} disabled={isExporting}>
        <Download size={18} />
        {isExporting ? 'Exporting...' : 'Export'}
      </button>
    </div>
  )
}
