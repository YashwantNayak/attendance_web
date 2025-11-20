import { LoginCredentials, LoginResponse, LoginError } from '../types'

const API_BASE_URL = '/api'

/**
 * Mock login - Replace with actual API call
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock credentials
  if (credentials.email === 'admin@college.edu' && credentials.password === 'admin123') {
    return {
      user: {
        id: '1',
        name: 'Dr. Admin',
        email: 'admin@college.edu',
        role: 'admin',
        department: 'CSE'
      },
      token: 'mock-admin-token-' + Date.now()
    }
  }

  if (credentials.email === 'faculty@college.edu' && credentials.password === 'faculty123') {
    return {
      user: {
        id: '2',
        name: 'Prof. John Doe',
        email: 'faculty@college.edu',
        role: 'faculty',
        department: 'CSE',
        assignedSubjects: ['Data Structures', 'Algorithms', 'DBMS']
      },
      token: 'mock-faculty-token-' + Date.now()
    }
  }

  throw new Error('Invalid credentials')
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  localStorage.removeItem('ams_token')
  localStorage.removeItem('ams_user')
}

/**
 * Get current user from token
 */
export async function getCurrentUser(token: string): Promise<LoginResponse> {
  // Mock - replace with actual API verification
  const storedUser = localStorage.getItem('ams_user')
  if (storedUser) {
    return { user: JSON.parse(storedUser), token }
  }
  throw new Error('Invalid token')
}
