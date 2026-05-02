# Attendance Monitoring System (AMS)

A comprehensive web application for engineering colleges to track, view, manage, and export student attendance in real time. Built with **React + Vite + TypeScript**.

## 🎯 Features

### Role-Based Access Control
- **Admin**: Full system access with analytics, student management, and reporting
- **Faculty**: Attendance upload, view own records, edit same-day attendance

### Core Functionality
- ✅ Real-time attendance tracking
- ✅ Support for 7 default lectures + optional 8th lecture
- ✅ Combined attendance (2 lectures together)
- ✅ Filter by semester (1-8), section (A/B/C/D), subject, date, lecture
- ✅ Export reports (CSV/PDF)
- ✅ Student database management (Admin only)
- ✅ Inline CSS styling (no external CSS files)
- ✅ Fully typed TypeScript components

### Tech Stack
- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Icons**: Lucide React (2D icons)
- **Styling**: Inline CSS (as per SRS requirements)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Layout.tsx
│   ├── AttendanceTable.tsx
│   ├── FilterPanel.tsx
│   └── ExportButton.tsx
├── context/            # React Context (Auth)
│   └── AuthContext.tsx
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── ViewAttendance.tsx
│   │   ├── ManageStudents.tsx
│   │   └── ExportReports.tsx
│   └── faculty/
│       ├── FacultyDashboard.tsx
│       ├── UploadAttendance.tsx
│       └── ViewMyAttendance.tsx
├── services/           # API service layer
│   ├── authService.ts
│   ├── attendanceService.ts
│   ├── studentService.ts
│   └── exportService.ts
├── types/              # TypeScript interfaces
│   ├── user.types.ts
│   ├── attendance.types.ts
│   ├── student.types.ts
│   └── subject.types.ts
├── utils/              # Helper functions
│   ├── constants.ts
│   ├── dateHelpers.ts
│   ├── validation.ts
│   └── attendanceHelpers.ts
└── theme/              # Theme configuration
    ├── theme.ts
    └── ThemeProvider.tsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```powershell
cd c:\Users\yashw\projects\maskAi
npm install
```

### Development

```powershell
npm run dev
```

App will open at [http://localhost:5173](http://localhost:5173)

### Build for Production

```powershell
npm run build
npm run preview
```

## 🔐 Demo Credentials

### Admin Access
- **Email**: `admin@college.edu`
- **Password**: `admin123`

### Faculty Access
- **Email**: `faculty@college.edu`
- **Password**: `faculty123`




## 🎓 Sample Data

### Departments & Sections
- **Department**: CSE (Computer Science Engineering)
- **Year**: 3rd Year (Semester 5)
- **Sections**: A, B, C, D
- **Students**: 20 students (5 per section)

### Subjects (3rd Year CSE)
- Data Structures
- Algorithms
- Database Management Systems (DBMS)
- Operating Systems (OS)
- Computer Networks (CN)
- Software Engineering (SE)

## 🛠️ Key Features per SRS

### FR-1: Authentication Module
- Login validation with typed interfaces
- Session management with localStorage
- Role-based routing

### FR-2: Admin Dashboard
- View attendance across all semesters, sections, subjects
- Advanced filtering (semester, section, subject, date, lecture, faculty)
- Real-time updates
- Export CSV/PDF reports

### FR-3: Faculty Dashboard
- Upload attendance (1-8 lectures, combined lectures)
- Edit same-day attendance
- View past attendance (read-only)

### FR-4: Attendance Management
- 7-lecture default schedule + optional 8th
- Combined attendance (2 lectures single entry)
- Real-time sync across all users

### FR-5: Student Management (Admin Only)
- Add/Edit/Delete students
- Filter by section
- Typed student data (Name, Roll No, Enrollment No, Section, Semester)

## 📝 TypeScript Conventions

All components use:
- Strict TypeScript mode
- Typed props with `React.FC<Props>`
- Interface definitions in `src/types/`
- JSDoc comments for complex functions

## 🎨 Design Principles

- **Inline CSS Only**: All styling is inline (no external CSS files except global `index.css`)
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessible**: Keyboard-friendly navigation
- **Consistent**: Reusable component patterns

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "lucide-react": "^0.294.0"
}
```

## 🔄 Future Enhancements (Out of Scope)

- Mobile app
- Face recognition
- Biometric integration
- AI analytics/predictions

## 📄 License

This project is for educational purposes.

---

**Built with ❤️ using React + Vite + TypeScript**
