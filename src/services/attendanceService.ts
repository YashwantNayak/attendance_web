import {
  AttendanceSession,
  UploadAttendancePayload,
  AttendanceFilter,
  AttendanceRecord
} from '../types'
import { formatDate } from '../utils'

/**
 * Mock attendance sessions storage with sample data
 */
let MOCK_ATTENDANCE_SESSIONS: AttendanceSession[] = [
  {
    id: 'att-1',
    date: '2025-11-18',
    semester: 5,
    section: 'A',
    subject: 'Data Structures',
    lectureNumber: 1,
    isCombined: false,
    facultyId: '2',
    facultyName: 'Prof. John Doe',
    records: [
      { id: 'r1', studentId: 's1', studentName: 'Aarav Sharma', rollNo: '21CSA001', status: 'present' },
      { id: 'r2', studentId: 's2', studentName: 'Aditi Verma', rollNo: '21CSA002', status: 'present' },
      { id: 'r3', studentId: 's3', studentName: 'Arjun Patel', rollNo: '21CSA003', status: 'absent' },
      { id: 'r4', studentId: 's4', studentName: 'Ananya Singh', rollNo: '21CSA004', status: 'present' },
      { id: 'r5', studentId: 's5', studentName: 'Ayush Kumar', rollNo: '21CSA005', status: 'present' }
    ],
    createdAt: '2025-11-18T09:00:00Z',
    updatedAt: '2025-11-18T09:00:00Z'
  },
  {
    id: 'att-2',
    date: '2025-11-18',
    semester: 5,
    section: 'B',
    subject: 'Algorithms',
    lectureNumber: 2,
    isCombined: false,
    facultyId: '2',
    facultyName: 'Prof. John Doe',
    records: [
      { id: 'r6', studentId: 's6', studentName: 'Bhavya Gupta', rollNo: '21CSB001', status: 'present' },
      { id: 'r7', studentId: 's7', studentName: 'Chirag Rao', rollNo: '21CSB002', status: 'present' },
      { id: 'r8', studentId: 's8', studentName: 'Divya Reddy', rollNo: '21CSB003', status: 'present' },
      { id: 'r9', studentId: 's9', studentName: 'Devansh Jain', rollNo: '21CSB004', status: 'absent' },
      { id: 'r10', studentId: 's10', studentName: 'Diya Agarwal', rollNo: '21CSB005', status: 'present' }
    ],
    createdAt: '2025-11-18T09:50:00Z',
    updatedAt: '2025-11-18T09:50:00Z'
  },
  {
    id: 'att-3',
    date: '2025-11-19',
    semester: 5,
    section: 'C',
    subject: 'DBMS',
    lectureNumber: 3,
    isCombined: false,
    facultyId: '3',
    facultyName: 'Dr. Sarah Williams',
    records: [
      { id: 'r11', studentId: 's11', studentName: 'Esha Pandey', rollNo: '21CSC001', status: 'present' },
      { id: 'r12', studentId: 's12', studentName: 'Gaurav Mishra', rollNo: '21CSC002', status: 'present' },
      { id: 'r13', studentId: 's13', studentName: 'Harsh Tiwari', rollNo: '21CSC003', status: 'present' },
      { id: 'r14', studentId: 's14', studentName: 'Ishita Saxena', rollNo: '21CSC004', status: 'present' },
      { id: 'r15', studentId: 's15', studentName: 'Jatin Yadav', rollNo: '21CSC005', status: 'absent' }
    ],
    createdAt: '2025-11-19T10:40:00Z',
    updatedAt: '2025-11-19T10:40:00Z'
  },
  {
    id: 'att-4',
    date: '2025-11-19',
    semester: 5,
    section: 'D',
    subject: 'Operating Systems',
    lectureNumber: 4,
    isCombined: false,
    facultyId: '3',
    facultyName: 'Dr. Sarah Williams',
    records: [
      { id: 'r16', studentId: 's16', studentName: 'Kavya Mehta', rollNo: '21CSD001', status: 'present' },
      { id: 'r17', studentId: 's17', studentName: 'Laksh Choudhary', rollNo: '21CSD002', status: 'present' },
      { id: 'r18', studentId: 's18', studentName: 'Mansi Bhatt', rollNo: '21CSD003', status: 'absent' },
      { id: 'r19', studentId: 's19', studentName: 'Naman Tripathi', rollNo: '21CSD004', status: 'present' },
      { id: 'r20', studentId: 's20', studentName: 'Priya Shukla', rollNo: '21CSD005', status: 'present' }
    ],
    createdAt: '2025-11-19T11:30:00Z',
    updatedAt: '2025-11-19T11:30:00Z'
  },
  {
    id: 'att-5',
    date: '2025-11-20',
    semester: 6,
    section: 'A',
    subject: 'Computer Networks',
    lectureNumber: 5,
    isCombined: false,
    facultyId: '4',
    facultyName: 'Prof. Rajesh Kumar',
    records: [
      { id: 'r21', studentId: 's1', studentName: 'Aarav Sharma', rollNo: '21CSA001', status: 'present' },
      { id: 'r22', studentId: 's2', studentName: 'Aditi Verma', rollNo: '21CSA002', status: 'absent' },
      { id: 'r23', studentId: 's3', studentName: 'Arjun Patel', rollNo: '21CSA003', status: 'present' },
      { id: 'r24', studentId: 's4', studentName: 'Ananya Singh', rollNo: '21CSA004', status: 'present' },
      { id: 'r25', studentId: 's5', studentName: 'Ayush Kumar', rollNo: '21CSA005', status: 'present' }
    ],
    createdAt: '2025-11-20T13:00:00Z',
    updatedAt: '2025-11-20T13:00:00Z'
  },
  {
    id: 'att-6',
    date: '2025-11-20',
    semester: 6,
    section: 'B',
    subject: 'Software Engineering',
    lectureNumber: 6,
    isCombined: true,
    combinedLectures: [6, 7],
    facultyId: '4',
    facultyName: 'Prof. Rajesh Kumar',
    records: [
      { id: 'r26', studentId: 's6', studentName: 'Bhavya Gupta', rollNo: '21CSB001', status: 'present' },
      { id: 'r27', studentId: 's7', studentName: 'Chirag Rao', rollNo: '21CSB002', status: 'present' },
      { id: 'r28', studentId: 's8', studentName: 'Divya Reddy', rollNo: '21CSB003', status: 'present' },
      { id: 'r29', studentId: 's9', studentName: 'Devansh Jain', rollNo: '21CSB004', status: 'present' },
      { id: 'r30', studentId: 's10', studentName: 'Diya Agarwal', rollNo: '21CSB005', status: 'absent' }
    ],
    createdAt: '2025-11-20T13:50:00Z',
    updatedAt: '2025-11-20T13:50:00Z'
  },
  {
    id: 'att-7',
    date: '2025-11-15',
    semester: 5,
    section: 'A',
    subject: 'Data Structures',
    lectureNumber: 1,
    isCombined: false,
    facultyId: '2',
    facultyName: 'Prof. John Doe',
    records: [
      { id: 'r31', studentId: 's1', studentName: 'Aarav Sharma', rollNo: '21CSA001', status: 'present' },
      { id: 'r32', studentId: 's2', studentName: 'Aditi Verma', rollNo: '21CSA002', status: 'present' },
      { id: 'r33', studentId: 's3', studentName: 'Arjun Patel', rollNo: '21CSA003', status: 'absent' },
      { id: 'r34', studentId: 's4', studentName: 'Ananya Singh', rollNo: '21CSA004', status: 'present' },
      { id: 'r35', studentId: 's5', studentName: 'Ayush Kumar', rollNo: '21CSA005', status: 'present' }
    ],
    createdAt: '2025-11-15T09:00:00Z',
    updatedAt: '2025-11-15T09:00:00Z'
  },
  {
    id: 'att-8',
    date: '2025-11-16',
    semester: 5,
    section: 'B',
    subject: 'Algorithms',
    lectureNumber: 2,
    isCombined: false,
    facultyId: '2',
    facultyName: 'Prof. John Doe',
    records: [
      { id: 'r36', studentId: 's6', studentName: 'Bhavya Gupta', rollNo: '21CSB001', status: 'absent' },
      { id: 'r37', studentId: 's7', studentName: 'Chirag Rao', rollNo: '21CSB002', status: 'present' },
      { id: 'r38', studentId: 's8', studentName: 'Divya Reddy', rollNo: '21CSB003', status: 'present' },
      { id: 'r39', studentId: 's9', studentName: 'Devansh Jain', rollNo: '21CSB004', status: 'absent' },
      { id: 'r40', studentId: 's10', studentName: 'Diya Agarwal', rollNo: '21CSB005', status: 'present' }
    ],
    createdAt: '2025-11-16T09:50:00Z',
    updatedAt: '2025-11-16T09:50:00Z'
  },
  {
    id: 'att-9',
    date: '2025-11-17',
    semester: 5,
    section: 'C',
    subject: 'DBMS',
    lectureNumber: 3,
    isCombined: false,
    facultyId: '3',
    facultyName: 'Dr. Sarah Williams',
    records: [
      { id: 'r41', studentId: 's11', studentName: 'Esha Pandey', rollNo: '21CSC001', status: 'present' },
      { id: 'r42', studentId: 's12', studentName: 'Gaurav Mishra', rollNo: '21CSC002', status: 'present' },
      { id: 'r43', studentId: 's13', studentName: 'Harsh Tiwari', rollNo: '21CSC003', status: 'absent' },
      { id: 'r44', studentId: 's14', studentName: 'Ishita Saxena', rollNo: '21CSC004', status: 'absent' },
      { id: 'r45', studentId: 's15', studentName: 'Jatin Yadav', rollNo: '21CSC005', status: 'present' }
    ],
    createdAt: '2025-11-17T10:40:00Z',
    updatedAt: '2025-11-17T10:40:00Z'
  },
  {
    id: 'att-10',
    date: '2025-11-21',
    semester: 6,
    section: 'A',
    subject: 'Computer Networks',
    lectureNumber: 5,
    isCombined: false,
    facultyId: '4',
    facultyName: 'Prof. Rajesh Kumar',
    records: [
      { id: 'r46', studentId: 's1', studentName: 'Aarav Sharma', rollNo: '21CSA001', status: 'present' },
      { id: 'r47', studentId: 's2', studentName: 'Aditi Verma', rollNo: '21CSA002', status: 'present' },
      { id: 'r48', studentId: 's3', studentName: 'Arjun Patel', rollNo: '21CSA003', status: 'present' },
      { id: 'r49', studentId: 's4', studentName: 'Ananya Singh', rollNo: '21CSA004', status: 'present' },
      { id: 'r50', studentId: 's5', studentName: 'Ayush Kumar', rollNo: '21CSA005', status: 'absent' }
    ],
    createdAt: '2025-11-21T13:00:00Z',
    updatedAt: '2025-11-21T13:00:00Z'
  },
  {
    id: 'att-11',
    date: '2025-11-22',
    semester: 6,
    section: 'B',
    subject: 'Software Engineering',
    lectureNumber: 6,
    isCombined: false,
    facultyId: '4',
    facultyName: 'Prof. Rajesh Kumar',
    records: [
      { id: 'r51', studentId: 's6', studentName: 'Bhavya Gupta', rollNo: '21CSB001', status: 'present' },
      { id: 'r52', studentId: 's7', studentName: 'Chirag Rao', rollNo: '21CSB002', status: 'absent' },
      { id: 'r53', studentId: 's8', studentName: 'Divya Reddy', rollNo: '21CSB003', status: 'present' },
      { id: 'r54', studentId: 's9', studentName: 'Devansh Jain', rollNo: '21CSB004', status: 'present' },
      { id: 'r55', studentId: 's10', studentName: 'Diya Agarwal', rollNo: '21CSB005', status: 'present' }
    ],
    createdAt: '2025-11-22T13:50:00Z',
    updatedAt: '2025-11-22T13:50:00Z'
  }
]

/**
 * Upload attendance (Faculty)
 */
export async function uploadAttendance(
  payload: UploadAttendancePayload,
  facultyId: string,
  facultyName: string
): Promise<AttendanceSession> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const session: AttendanceSession = {
    id: 'att-' + Date.now(),
    date: payload.date,
    semester: payload.semester,
    section: payload.section,
    subject: payload.subject,
    lectureNumber: payload.lectureNumber,
    isCombined: payload.isCombined,
    combinedLectures: payload.combinedLectures,
    facultyId,
    facultyName,
    records: payload.records.map((r, idx) => ({
      id: `rec-${Date.now()}-${idx}`,
      studentId: r.studentId,
      studentName: '', // Would be populated from student service
      rollNo: '',
      status: r.status
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  MOCK_ATTENDANCE_SESSIONS.push(session)
  return session
}

/**
 * Get attendance sessions with optional filters
 */
export async function getAttendanceSessions(
  filter?: AttendanceFilter
): Promise<AttendanceSession[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filtered = [...MOCK_ATTENDANCE_SESSIONS]

  if (filter?.semester) {
    filtered = filtered.filter((s) => s.semester === filter.semester)
  }

  if (filter?.section) {
    filtered = filtered.filter((s) => s.section === filter.section)
  }

  if (filter?.subject) {
    filtered = filtered.filter((s) => s.subject === filter.subject)
  }

  if (filter?.date) {
    filtered = filtered.filter((s) => formatDate(s.date) === formatDate(filter.date!))
  }

  if (filter?.lectureNumber) {
    filtered = filtered.filter((s) => s.lectureNumber === filter.lectureNumber)
  }

  if (filter?.facultyId) {
    filtered = filtered.filter((s) => s.facultyId === filter.facultyId)
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

/**
 * Update attendance session (same day only for faculty)
 */
export async function updateAttendanceSession(
  sessionId: string,
  records: AttendanceRecord[]
): Promise<AttendanceSession> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const index = MOCK_ATTENDANCE_SESSIONS.findIndex((s) => s.id === sessionId)
  if (index === -1) throw new Error('Session not found')

  MOCK_ATTENDANCE_SESSIONS[index] = {
    ...MOCK_ATTENDANCE_SESSIONS[index],
    records,
    updatedAt: new Date().toISOString()
  }

  return MOCK_ATTENDANCE_SESSIONS[index]
}

/**
 * Delete attendance session (Admin only)
 */
export async function deleteAttendanceSession(sessionId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const index = MOCK_ATTENDANCE_SESSIONS.findIndex((s) => s.id === sessionId)
  if (index === -1) throw new Error('Session not found')
  
  MOCK_ATTENDANCE_SESSIONS.splice(index, 1)
}
