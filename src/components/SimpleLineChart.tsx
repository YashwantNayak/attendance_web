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

export const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ sectionData, semesterData, width = 900, height = 300 }) => {
  const [selectedType, setSelectedType] = useState<'section' | 'semester'>('section')
  const data = selectedType === 'section' ? sectionData : semesterData

  if (!data || data.length === 0) {
    return <div style={{ padding: 12, color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>No chart data</div>
  }

  const padding = { top: 40, right: 40, bottom: 80, left: 60 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const minValue = 0

  const points = data.map((d, i) => {
    const x = data.length > 1 ? (i / (data.length - 1)) * chartWidth : chartWidth / 2
    const y = chartHeight - ((d.value - minValue) / (maxValue - minValue)) * chartHeight
    return { x, y, label: d.label, value: d.value }
  })

  const pathData = points.map(p => `${p.x},${p.y}`).join(' L ')

  const selectStyle: React.CSSProperties = {
    marginBottom: '1rem',
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    background: 'white',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    outline: 'none',
    cursor: 'pointer'
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ flex: 1 }}>
        <svg width={width} height={height} style={{ overflow: 'visible', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g transform={`translate(${padding.left},${padding.top})`}>
            {/* Grid lines */}
            {Array.from({ length: 6 }, (_, i) => (
              <line key={`h-${i}`} x1={0} x2={chartWidth} y1={(i / 5) * chartHeight} y2={(i / 5) * chartHeight} stroke="#e2e8f0" strokeWidth={1} />
            ))}
            {points.map((p, i) => (
              <line key={`v-${i}`} x1={p.x} x2={p.x} y1={0} y2={chartHeight} stroke="#e2e8f0" strokeWidth={1} />
            ))}

            {/* Axes */}
            <line x1={0} x2={0} y1={0} y2={chartHeight} stroke="#64748b" strokeWidth={2} />
            <line x1={0} x2={chartWidth} y1={chartHeight} y2={chartHeight} stroke="#64748b" strokeWidth={2} />

            {/* Y-axis labels */}
            {Array.from({ length: 6 }, (_, i) => {
              const value = Math.round(minValue + (maxValue - minValue) * (5 - i) / 5)
              return (
                <text key={`y-${i}`} x={-10} y={(i / 5) * chartHeight + 4} fontSize={12} fill="#64748b" textAnchor="end">
                  {value}%
                </text>
              )
            })}

            {/* Line */}
            <path d={`M ${pathData}`} stroke="url(#lineGradient)" strokeWidth={3} fill="none" filter="url(#glow)" />

            {/* Points */}
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={6} fill="url(#lineGradient)" stroke="white" strokeWidth={2} />
                <text
                  x={p.x}
                  y={p.y - 15}
                  fontSize={12}
                  fill="#1e293b"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {p.value}%
                </text>
                <text
                  x={p.x}
                  y={chartHeight + 20}
                  fontSize={11}
                  fill="#64748b"
                  textAnchor="middle"
                >
                  {p.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
      <div style={{ flex: 0 }}>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as 'section' | 'semester')} style={selectStyle}>
          <option value="section">Section Wise</option>
          <option value="semester">Semester Wise</option>
        </select>
      </div>
    </div>
  )
}

export default SimpleLineChart
