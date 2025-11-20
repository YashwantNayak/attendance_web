# 🚀 Quick Start Guide - AMS (Attendance Monitoring System)

## Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install:
- react & react-dom
- react-router-dom (routing)
- lucide-react (icons)
- vite (build tool)
- TypeScript & type definitions

## Step 2: Start Development Server

```powershell
npm run dev
```

The app will start at: **http://localhost:5173**

## Step 3: Login

Use these demo credentials:

### Admin Login
- Email: `admin@college.edu`
- Password: `admin123`

### Faculty Login
- Email: `faculty@college.edu`
- Password: `faculty123`

## 📋 What You Can Do

### As Admin:
1. **Dashboard** - View overall statistics
2. **View Attendance** - Filter and see all attendance records
3. **Manage Students** - Add/edit/delete students
4. **Export Reports** - Download CSV/PDF reports

### As Faculty:
1. **Dashboard** - See your upload stats
2. **Upload Attendance** - Mark attendance for today
   - Select semester, section, subject, lecture
   - Support for combined lectures (2 lectures together)
   - Quick mark all present/absent
3. **My Attendance** - View your uploaded records

## 🎯 Key Features to Test

1. **Upload Attendance**:
   - Go to Faculty → Upload Attendance
   - Select Semester 5, Section A
   - Choose a subject (Data Structures, Algorithms, etc.)
   - Mark students present/absent by clicking
   - Submit to save

2. **Filter Attendance**:
   - Admin → View Attendance
   - Use filters: semester, section, subject, date
   - See real-time filtered results

3. **Export Reports**:
   - Admin → Export Reports
   - Apply filters
   - Choose CSV or PDF
   - Click Export

4. **Manage Students**:
   - Admin → Manage Students
   - Filter by section
   - Edit student names
   - Delete students (with confirmation)

## 📝 Project Structure Highlights

```
src/
├── components/      # Reusable UI (Header, Sidebar, Tables, Filters)
├── pages/          # Admin & Faculty pages
├── services/       # API layer (mock data)
├── types/          # TypeScript interfaces
├── utils/          # Constants, helpers, validators
└── context/        # Auth context (login state)
```

## 🔧 Build for Production

```powershell
npm run build
npm run preview
```

## 💡 Tips

- All styling is inline (as per SRS requirements)
- TypeScript strict mode is enabled
- Mock data is in `src/services/`
- To add real backend, replace mock functions in services

## 📚 Next Steps

1. Connect to real backend API
2. Add more subjects/departments
3. Implement PDF export (currently mock)
4. Add notification system
5. Deploy to production

---

**Happy Testing! 🎉**
