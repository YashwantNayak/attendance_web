import { AttendanceStats, AttendanceSession } from '../types'

/**
 * Calculate attendance percentage
 */
export function calculateAttendancePercentage(present: number, total: number): number {
  if (total === 0) return 0
  return Math.round((present / total) * 100 * 100) / 100
}

/**
 * Calculate student attendance stats from sessions
 */
export function calculateStudentStats(
  studentId: string,
  sessions: AttendanceSession[]
): AttendanceStats {
  const totalClasses = sessions.length
  const present = sessions.filter((session) =>
    session.records.some((r) => r.studentId === studentId && r.status === 'present')
  ).length
  const absent = totalClasses - present
  const percentage = calculateAttendancePercentage(present, totalClasses)

  return { totalClasses, present, absent, percentage }
}

/**
 * Get attendance status color
 */
export function getAttendanceColor(percentage: number): string {
  if (percentage >= 75) return '#10b981'
  if (percentage >= 60) return '#f59e0b'
  return '#ef4444'
}
