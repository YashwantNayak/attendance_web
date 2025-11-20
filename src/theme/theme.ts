export type ThemeName = 'light' | 'dark'

export interface Theme {
  name: ThemeName
  colors: {
    bg: string
    text: string
    primary: string
    card: string
  }
}

export const lightTheme: Theme = {
  name: 'light',
  colors: {
    bg: '#ffffff',
    text: '#111827',
    primary: '#2563eb',
    card: '#f3f4f6'
  }
}

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    bg: '#0b1220',
    text: '#e6eef8',
    primary: '#60a5fa',
    card: '#071028'
  }
}
