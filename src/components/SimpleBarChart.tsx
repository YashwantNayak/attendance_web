import React, { useState } from 'react'

type SeriesItem = {
  label: string
  value: number
  type?: 'department' | 'section' | 'semester'
}

interface SimpleLineChartProps {
  sectionData: SeriesItem[]
  semesterData: SeriesItem[]
  width?: number
  height?: number
}

const COLORS: Record<string, string> = {
  department: '#3b82f6',
  section: '#10b981',
  semester: '#f59e0b',
  default: '#6b7280'
}

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ sectionData, semesterData, width = 900, height = 300 }) => {
  const [selectedType, setSelectedType] = useState<'section' | 'semester'>('section')
  const data = selectedType === 'section' ? sectionData : semesterData

  if (!data || data.length === 0) {
    return <div style={{ padding: 12, color: '#6b7280' }}>No chart data</div>
  }

  const padding = { top: 20, right: 20, bottom: 60, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const maxValue = Math.max(...data.map((d) => d.value), 1)

  const points = data.map((d, i) => {
    const x = data.length > 1 ? (i / (data.length - 1)) * chartWidth : chartWidth / 2
    const y = chartHeight - (d.value / maxValue) * chartHeight
    return { x, y, label: d.label, value: d.value }
  })

  const pathData = points.map(p => `${p.x},${p.y}`).join(' L ')

  return (
    <div>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as 'section' | 'semester')} style={{ marginBottom: '1rem' }}>
        <option value="section">Section Wise</option>
        <option value="semester">Semester Wise</option>
      </select>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <g transform={`translate(${padding.left},${padding.top})`}>
          {/* y axis line */}
          <line x1={0} x2={0} y1={0} y2={chartHeight} stroke="#e5e7eb" />
          {/* x axis line */}
          <line x1={0} x2={chartWidth} y1={chartHeight} y2={chartHeight} stroke="#e5e7eb" />

          {/* Line */}
          <path d={`M ${pathData}`} stroke="#3b82f6" strokeWidth={2} fill="none" />

          {/* Points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={4} fill="#3b82f6" />
              <text
                x={p.x}
                y={p.y - 10}
                fontSize={12}
                fill="#111827"
                textAnchor="middle"
              >
                {p.value}
              </text>
              <text
                x={p.x}
                y={chartHeight + 14}
                fontSize={11}
                fill="#374151"
                textAnchor="middle"
              >
                {p.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

export default SimpleLineChart
