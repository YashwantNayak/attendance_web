import { Semester } from './student.types'

export interface Subject {
  id: string
  name: string
  code: string
  semester: Semester
  department: string
}

export interface SubjectListResponse {
  subjects: Subject[]
}
