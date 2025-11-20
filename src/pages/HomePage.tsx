import React from 'react'
import { useTheme } from '../theme/ThemeProvider'
import { SimpleLineChart } from '../components'

export default function HomePage() {
  const { theme } = useTheme()

  const sectionData = [
    { label: '2023-10-01', value: 25 },
    { label: '2023-10-02', value: 28 },
    { label: '2023-10-03', value: 22 },
    { label: '2023-10-04', value: 30 },
    { label: '2023-10-05', value: 27 }
  ]

  const semesterData = [
    { label: '2023-10-01', value: 150 },
    { label: '2023-10-02', value: 155 },
    { label: '2023-10-03', value: 148 },
    { label: '2023-10-04', value: 160 },
    { label: '2023-10-05', value: 152 }
  ]

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to maskAi — current theme: <strong>{theme.name}</strong></p>
      <SimpleLineChart sectionData={sectionData} semesterData={semesterData} />
    </div>
  )
}
