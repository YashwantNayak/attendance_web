import React, { useEffect, useState } from 'react'
import { Layout } from '../../components'
import { Student, Section } from '../../types'
import { getStudents, addStudent, updateStudent, deleteStudent } from '../../services'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

export default function ManageStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [filter, setFilter] = useState<Section | ''>('')
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Student>>({})

  useEffect(() => {
    loadStudents()
  }, [filter])

  const loadStudents = async () => {
    setIsLoading(true)
    try {
      const section = filter || undefined
      const response = await getStudents(section as Section | undefined)
      setStudents(response.students)
    } catch (error) {
      console.error('Failed to load students:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (student: Student) => {
    setEditingId(student.id)
    setEditForm(student)
  }

  const handleSave = async () => {
    if (!editingId || !editForm) return

    try {
      await updateStudent(editingId, editForm)
      setEditingId(null)
      setEditForm({})
      loadStudents()
    } catch (error) {
      alert('Failed to update student')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return

    try {
      await deleteStudent(id)
      loadStudents()
    } catch (error) {
      alert('Failed to delete student')
    }
  }

  const pageStyle: React.CSSProperties = {
    maxWidth: '1400px'
  }

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  }

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text)'
  }

  const filterStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.9rem',
    background: 'white'
  }

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  }

  const thStyle: React.CSSProperties = {
    background: 'var(--primary)',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.9rem'
  }

  const tdStyle: React.CSSProperties = {
    padding: '0.875rem 1rem',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '0.9rem'
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.375rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '0.85rem',
    width: '100%'
  }

  const btnStyle: React.CSSProperties = {
    padding: '0.375rem 0.625rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    marginRight: '0.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem'
  }

  return (
    <Layout>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Manage Students</h1>
          <select style={filterStyle} value={filter} onChange={(e) => setFilter(e.target.value as Section | '')}>
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading students...</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Roll No</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Enrollment No</th>
                <th style={thStyle}>Section</th>
                <th style={thStyle}>Semester</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const isEditing = editingId === student.id

                return (
                  <tr key={student.id}>
                    <td style={tdStyle}>{student.rollNo}</td>
                    <td style={tdStyle}>
                      {isEditing ? (
                        <input
                          style={inputStyle}
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      ) : (
                        student.name
                      )}
                    </td>
                    <td style={tdStyle}>{student.enrollmentNo}</td>
                    <td style={tdStyle}>{student.section}</td>
                    <td style={tdStyle}>{student.semester}</td>
                    <td style={tdStyle}>
                      {isEditing ? (
                        <>
                          <button
                            style={{ ...btnStyle, background: '#10b981', color: 'white' }}
                            onClick={handleSave}
                          >
                            <Save size={14} />
                            Save
                          </button>
                          <button
                            style={{ ...btnStyle, background: '#6b7280', color: 'white' }}
                            onClick={() => setEditingId(null)}
                          >
                            <X size={14} />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            style={{ ...btnStyle, background: '#3b82f6', color: 'white' }}
                            onClick={() => handleEdit(student)}
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button
                            style={{ ...btnStyle, background: '#ef4444', color: 'white' }}
                            onClick={() => handleDelete(student.id)}
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}
