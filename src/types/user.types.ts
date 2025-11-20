export type UserRole = 'admin' | 'faculty'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  assignedSubjects?: string[]
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface LoginError {
  message: string
  field?: 'email' | 'password'
}
