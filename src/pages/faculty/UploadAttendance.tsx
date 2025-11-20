import React, { useEffect, useState } from 'react'
import { Layout } from '../../components'
import { useAuth } from '../../context'
import { Section, Semester, LectureNumber, Student, UploadAttendancePayload } from '../../types'
import { getStudents, uploadAttendance } from '../../services'
import { getTodayDate, LECTURE_SCHEDULE, SEMESTERS, SECTIONS } from '../../utils'
import { CheckCircle, XCircle, Upload } from 'lucide-react'

export default function UploadAttendancePage() {
  const { user } = useAuth()
  const [semester, setSemester] = useState<Semester>(5)
  const [section, setSection] = useState<Section>('A')
  const [subject, setSubject] = useState('')
  const [lectureNumber, setLectureNumber] = useState<LectureNumber>(1)
  const [isCombined, setIsCombined] = useState(false)
  const [combinedLecture2, setCombinedLecture2] = useState<LectureNumber>(2)
  const [date, setDate] = useState(getTodayDate())
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    loadStudents()
  }, [semester, section])

  const loadStudents = async () => {
    setIsLoading(true)
    try {
      const response = await getStudents(section, semester)
      setStudents(response.students)
      
      // Initialize all as present by default
      const initialAttendance: Record<string, 'present' | 'absent'> = {}
      response.students.forEach((s) => {
        initialAttendance[s.id] = 'present'
      })
      setAttendance(initialAttendance)
    } catch (error) {
      console.error('Failed to load students:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!subject) {
      alert('Please select a subject')
      return
    }

    const payload: UploadAttendancePayload = {
      date,
      semester,
      section,
      subject,
      lectureNumber,
      isCombined,
      combinedLectures: isCombined ? [lectureNumber, combinedLecture2] : undefined,
      records: students.map((s) => ({
        studentId: s.id,
        status: attendance[s.id] || 'absent'
      }))
    }

    setIsUploading(true)
    try {
      await uploadAttendance(payload, user!.id, user!.name)
      alert('Attendance uploaded successfully!')
      
      // Reset attendance to all present
      const resetAttendance: Record<string, 'present' | 'absent'> = {}
      students.forEach((s) => {
        resetAttendance[s.id] = 'present'
      })
      setAttendance(resetAttendance)
    } catch (error) {
      alert('Failed to upload attendance. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const toggleAttendance = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
    }))
  }

  const markAllPresent = () => {
    const all: Record<string, 'present' | 'absent'> = {}
    students.forEach((s) => {
      all[s.id] = 'present'
    })
    setAttendance(all)
  }

  const markAllAbsent = () => {
    const all: Record<string, 'present' | 'absent'> = {}
    students.forEach((s) => {
      all[s.id] = 'absent'
    })
    setAttendance(all)
  }

  const presentCount = Object.values(attendance).filter((v) => v === 'present').length
  const absentCount = students.length - presentCount

  const pageStyle: React.CSSProperties = {
    maxWidth: '1200px'
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '2rem'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text)',
    marginBottom: '0.5rem'
  }

  const formStyle: React.CSSProperties = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginBottom: '2rem'
  }

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem'
  }

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151'
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.9rem'
  }

  const checkboxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  const studentsContainerStyle: React.CSSProperties = {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }

  const statsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    background: '#f9fafb',
    borderRadius: '8px'
  }

  const statStyle: React.CSSProperties = {
    flex: 1,
    textAlign: 'center'
  }

  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  }

  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
  }

  const studentListStyle: React.CSSProperties = {
    display: 'grid',
    gap: '0.75rem',
    maxHeight: '500px',
    overflowY: 'auto'
  }

  const studentItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    background: '#f9fafb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.2s'
  }

  const submitBtnStyle: React.CSSProperties = {
    background: 'var(--primary)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: isUploading ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
    opacity: isUploading ? 0.6 : 1
  }

  return (
    <Layout>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Upload Attendance</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={formStyle}>
            <div style={gridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Date</label>
                <input
                  type="date"
                  style={inputStyle}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Semester</label>
                <select
                  style={inputStyle}
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value) as Semester)}
                  required
                >
                  {SEMESTERS.map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Section</label>
                <select
                  style={inputStyle}
                  value={section}
                  onChange={(e) => setSection(e.target.value as Section)}
                  required
                >
                  {SECTIONS.map((sec) => (
                    <option key={sec} value={sec}>
                      Section {sec}
                    </option>
                  ))}
                </select>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Subject</label>
                <select
                  style={inputStyle}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                >
                  <option value="">Select Subject</option>
                  {user?.assignedSubjects?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Lecture Number</label>
                <select
                  style={inputStyle}
                  value={lectureNumber}
                  onChange={(e) => setLectureNumber(Number(e.target.value) as LectureNumber)}
                  required
                >
                  {LECTURE_SCHEDULE.map((lec) => (
                    <option key={lec.number} value={lec.number}>
                      Lecture {lec.number} ({lec.startTime} - {lec.endTime})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={checkboxStyle}>
              <input
                type="checkbox"
                id="combined"
                checked={isCombined}
                onChange={(e) => setIsCombined(e.target.checked)}
              />
              <label htmlFor="combined" style={{ fontSize: '0.9rem' }}>
                Combined Lecture (2 lectures together)
              </label>
            </div>

            {isCombined && (
              <div style={{ ...inputGroupStyle, marginTop: '1rem', maxWidth: '200px' }}>
                <label style={labelStyle}>Second Lecture</label>
                <select
                  style={inputStyle}
                  value={combinedLecture2}
                  onChange={(e) => setCombinedLecture2(Number(e.target.value) as LectureNumber)}
                >
                  {LECTURE_SCHEDULE.filter((l) => l.number !== lectureNumber).map((lec) => (
                    <option key={lec.number} value={lec.number}>
                      Lecture {lec.number}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div style={studentsContainerStyle}>
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Mark Attendance</h3>

            <div style={statsStyle}>
              <div style={statStyle}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                  {presentCount}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Present</div>
              </div>
              <div style={statStyle}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ef4444' }}>
                  {absentCount}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Absent</div>
              </div>
              <div style={statStyle}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>
                  {students.length}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Total</div>
              </div>
            </div>

            <div style={buttonGroupStyle}>
              <button
                type="button"
                style={{ ...btnStyle, background: '#10b981', color: 'white' }}
                onClick={markAllPresent}
              >
                Mark All Present
              </button>
              <button
                type="button"
                style={{ ...btnStyle, background: '#ef4444', color: 'white' }}
                onClick={markAllAbsent}
              >
                Mark All Absent
              </button>
            </div>

            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>Loading students...</div>
            ) : (
              <div style={studentListStyle}>
                {students.map((student) => {
                  const isPresent = attendance[student.id] === 'present'
                  return (
                    <div
                      key={student.id}
                      style={{
                        ...studentItemStyle,
                        background: isPresent ? '#d1fae5' : '#fee2e2'
                      }}
                      onClick={() => toggleAttendance(student.id)}
                    >
                      <div>
                        <div style={{ fontWeight: '500' }}>{student.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                          {student.rollNo} - {student.enrollmentNo}
                        </div>
                      </div>
                      {isPresent ? (
                        <CheckCircle size={24} color="#10b981" />
                      ) : (
                        <XCircle size={24} color="#ef4444" />
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <button type="submit" style={submitBtnStyle} disabled={isUploading}>
              <Upload size={20} />
              {isUploading ? 'Uploading...' : 'Upload Attendance'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
