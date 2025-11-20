import { LectureNumber } from '../types'

export interface LectureSchedule {
  number: LectureNumber
  startTime: string
  endTime: string
}

export const LECTURE_SCHEDULE: LectureSchedule[] = [
  { number: 1, startTime: '09:00', endTime: '09:50' },
  { number: 2, startTime: '09:50', endTime: '10:40' },
  { number: 3, startTime: '10:40', endTime: '11:30' },
  { number: 4, startTime: '11:30', endTime: '12:20' },
  { number: 5, startTime: '13:00', endTime: '13:50' },
  { number: 6, startTime: '13:50', endTime: '14:40' },
  { number: 7, startTime: '14:40', endTime: '15:20' },
  { number: 8, startTime: '15:30', endTime: '16:20' }
]

export const SECTIONS = ['A', 'B', 'C', 'D'] as const
export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8] as const
export const DEPARTMENTS = ['CSE', 'ECE', 'ME', 'CE'] as const

export const CURRENT_DEPARTMENT = 'CSE'
export const CURRENT_YEAR = 3
export const CURRENT_SEMESTER = 5
