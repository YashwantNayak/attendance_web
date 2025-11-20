import { Student, StudentListResponse, Section, Semester } from '../types'

/**
 * Mock student data for CSE 3rd Year
 */
const MOCK_STUDENTS: Student[] = [
  // Section A
  { id: 's1', name: 'Aarav Sharma', rollNo: '21CSA001', enrollmentNo: '2021CSE001', section: 'A', semester: 5, department: 'CSE' },
  { id: 's2', name: 'Aditi Verma', rollNo: '21CSA002', enrollmentNo: '2021CSE002', section: 'A', semester: 5, department: 'CSE' },
  { id: 's3', name: 'Arjun Patel', rollNo: '21CSA003', enrollmentNo: '2021CSE003', section: 'A', semester: 5, department: 'CSE' },
  { id: 's4', name: 'Ananya Singh', rollNo: '21CSA004', enrollmentNo: '2021CSE004', section: 'A', semester: 5, department: 'CSE' },
  { id: 's5', name: 'Ayush Kumar', rollNo: '21CSA005', enrollmentNo: '2021CSE005', section: 'A', semester: 5, department: 'CSE' },
  
  // Section B
  { id: 's6', name: 'Bhavya Gupta', rollNo: '21CSB001', enrollmentNo: '2021CSE006', section: 'B', semester: 5, department: 'CSE' },
  { id: 's7', name: 'Chirag Rao', rollNo: '21CSB002', enrollmentNo: '2021CSE007', section: 'B', semester: 5, department: 'CSE' },
  { id: 's8', name: 'Divya Reddy', rollNo: '21CSB003', enrollmentNo: '2021CSE008', section: 'B', semester: 5, department: 'CSE' },
  { id: 's9', name: 'Devansh Jain', rollNo: '21CSB004', enrollmentNo: '2021CSE009', section: 'B', semester: 5, department: 'CSE' },
  { id: 's10', name: 'Diya Agarwal', rollNo: '21CSB005', enrollmentNo: '2021CSE010', section: 'B', semester: 5, department: 'CSE' },
  
  // Section C
  { id: 's11', name: 'Esha Pandey', rollNo: '21CSC001', enrollmentNo: '2021CSE011', section: 'C', semester: 5, department: 'CSE' },
  { id: 's12', name: 'Gaurav Mishra', rollNo: '21CSC002', enrollmentNo: '2021CSE012', section: 'C', semester: 5, department: 'CSE' },
  { id: 's13', name: 'Harsh Tiwari', rollNo: '21CSC003', enrollmentNo: '2021CSE013', section: 'C', semester: 5, department: 'CSE' },
  { id: 's14', name: 'Ishita Saxena', rollNo: '21CSC004', enrollmentNo: '2021CSE014', section: 'C', semester: 5, department: 'CSE' },
  { id: 's15', name: 'Jatin Yadav', rollNo: '21CSC005', enrollmentNo: '2021CSE015', section: 'C', semester: 5, department: 'CSE' },
  
  // Section D
  { id: 's16', name: 'Kavya Mehta', rollNo: '21CSD001', enrollmentNo: '2021CSE016', section: 'D', semester: 5, department: 'CSE' },
  { id: 's17', name: 'Laksh Choudhary', rollNo: '21CSD002', enrollmentNo: '2021CSE017', section: 'D', semester: 5, department: 'CSE' },
  { id: 's18', name: 'Mansi Bhatt', rollNo: '21CSD003', enrollmentNo: '2021CSE018', section: 'D', semester: 5, department: 'CSE' },
  { id: 's19', name: 'Naman Tripathi', rollNo: '21CSD004', enrollmentNo: '2021CSE019', section: 'D', semester: 5, department: 'CSE' },
  { id: 's20', name: 'Priya Shukla', rollNo: '21CSD005', enrollmentNo: '2021CSE020', section: 'D', semester: 5, department: 'CSE' }
]

/**
 * Get students by section and semester
 */
export async function getStudents(
  section?: Section,
  semester?: Semester
): Promise<StudentListResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filtered = MOCK_STUDENTS

  if (section) {
    filtered = filtered.filter((s) => s.section === section)
  }

  if (semester) {
    filtered = filtered.filter((s) => s.semester === semester)
  }

  return {
    students: filtered,
    total: filtered.length
  }
}

/**
 * Add new student (Admin only)
 */
export async function addStudent(student: Omit<Student, 'id'>): Promise<Student> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const newStudent: Student = {
    ...student,
    id: 's' + (MOCK_STUDENTS.length + 1)
  }
  MOCK_STUDENTS.push(newStudent)
  return newStudent
}

/**
 * Update student (Admin only)
 */
export async function updateStudent(id: string, updates: Partial<Student>): Promise<Student> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const index = MOCK_STUDENTS.findIndex((s) => s.id === id)
  if (index === -1) throw new Error('Student not found')
  
  MOCK_STUDENTS[index] = { ...MOCK_STUDENTS[index], ...updates }
  return MOCK_STUDENTS[index]
}

/**
 * Delete student (Admin only)
 */
export async function deleteStudent(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const index = MOCK_STUDENTS.findIndex((s) => s.id === id)
  if (index === -1) throw new Error('Student not found')
  
  MOCK_STUDENTS.splice(index, 1)
}
