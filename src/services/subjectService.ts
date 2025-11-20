import { Subject, SubjectListResponse, Semester } from '../types'

const MOCK_SUBJECTS: Subject[] = [
  { id: 'sub1', name: 'Data Structures', code: 'CS301', semester: 5, department: 'CSE' },
  { id: 'sub2', name: 'Algorithms', code: 'CS302', semester: 5, department: 'CSE' },
  { id: 'sub3', name: 'Database Management Systems', code: 'CS303', semester: 5, department: 'CSE' },
  { id: 'sub4', name: 'Operating Systems', code: 'CS304', semester: 5, department: 'CSE' },
  { id: 'sub5', name: 'Computer Networks', code: 'CS305', semester: 5, department: 'CSE' },
  { id: 'sub6', name: 'Software Engineering', code: 'CS306', semester: 5, department: 'CSE' }
]

/**
 * Get subjects by semester
 */
export async function getSubjects(semester?: Semester): Promise<SubjectListResponse> {
  await new Promise((resolve) => setTimeout(resolve, 200))

  let filtered = MOCK_SUBJECTS

  if (semester) {
    filtered = filtered.filter((s) => s.semester === semester)
  }

  return { subjects: filtered }
}
