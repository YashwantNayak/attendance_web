import { LoginCredentials } from '../types'

export interface ValidationError {
  field: string
  message: string
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate login credentials
 */
export function validateLoginCredentials(credentials: LoginCredentials): ValidationError[] {
  const errors: ValidationError[] = []

  if (!credentials.email || credentials.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!isValidEmail(credentials.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' })
  }

  if (!credentials.password || credentials.password.trim() === '') {
    errors.push({ field: 'password', message: 'Password is required' })
  } else if (credentials.password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' })
  }

  return errors
}

/**
 * Validate enrollment number format
 */
export function isValidEnrollmentNo(enrollmentNo: string): boolean {
  // Example: 2021CSE001
  const enrollmentRegex = /^[0-9]{4}[A-Z]{2,4}[0-9]{3,4}$/
  return enrollmentRegex.test(enrollmentNo)
}
