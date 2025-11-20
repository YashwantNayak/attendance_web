export type ExportFormat = 'csv' | 'pdf'

export interface ExportOptions {
  format: ExportFormat
  semester?: number
  section?: string
  subject?: string
  startDate?: string
  endDate?: string
}

export interface ExportResponse {
  url: string
  filename: string
}
