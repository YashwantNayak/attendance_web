import { Section, Semester } from './student.types'

export type LectureNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type AttendanceStatus = 'present' | 'absent'

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  rollNo: string
  status: AttendanceStatus
}

export interface AttendanceSession {
  id: string
  date: string
  semester: Semester
  section: Section
  subject: string
  lectureNumber: LectureNumber
  isCombined: boolean
  combinedLectures?: [LectureNumber, LectureNumber]
  facultyId: string
  facultyName: string
  records: AttendanceRecord[]
  createdAt: string
  updatedAt: string
}

export interface UploadAttendancePayload {
  date: string
  semester: Semester
  section: Section
  subject: string
  lectureNumber: LectureNumber
  isCombined: boolean
  combinedLectures?: [LectureNumber, LectureNumber]
  records: Array<{
    studentId: string
    status: AttendanceStatus
  }>
}

export interface AttendanceFilter {
  semester?: Semester
  section?: Section
  subject?: string
  date?: string
  lectureNumber?: LectureNumber
  facultyId?: string
}

export interface AttendanceStats {
  totalClasses: number
  present: number
  absent: number
  percentage: number
}
