export type Section = 'A' | 'B' | 'C' | 'D'
export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface Student {
  id: string
  name: string
  rollNo: string
  enrollmentNo: string
  section: Section
  semester: Semester
  department: string
}

export interface StudentListResponse {
  students: Student[]
  total: number
}
