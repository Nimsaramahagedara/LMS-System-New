import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/common/Login'
import Dashboard from './pages/common/Dashboard'
import AdminHome from './pages/admin/AdminHome'
import StudentMNG from './pages/admin/StudentMNG'
import TeacherMNG from './pages/admin/TeacherMNG'
import Attendence from './pages/teacher/Attendence'
import Markings from './pages/teacher/Markings'
import Notices from './pages/teacher/Notices'
import SubjCreate from './pages/teacher/SubjCreate'
import TOverview from './pages/teacher/TOverview'
import StOverview from './pages/student/StOverview'
import SingleModuleViewPage from './pages/student/SingleModuleViewPage'
import ModulePage from './pages/student/ModulePage'
import StudentMarks from './pages/student/StudentMarks'
import SpOverview from './pages/support/SpOverview'
import CreateStudentAcc from './pages/support/CreateStudentAcc'
import CreateTeacherAcc from './pages/support/CreateTeacherAcc'
import ManageAccounts from './pages/support/ManageAccounts'
import PublishNotices from './pages/support/PublishNotices'
import { AuthProvider } from './pages/common/AuthContext'
import ContactParent from './pages/teacher/ContactParent'
import LandingPage from './pages/common/LandingPage'
import StudentDashboard from './pages/student/StudentDashboard'
import ClassPage from './pages/student/ClassPage'
import Notices2  from './pages/student/Notices';
import NotFound from './pages/common/NotFound'
import StProfile from './pages/student/StProfile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <BrowserRouter>
    <ToastContainer autoClose={1000}/>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound/>} />
          <Route path='/dashboard' element={<Dashboard />}>
            {/* Admin Routes */}
            <Route path='' element={<AdminHome />} />
            <Route path='students' element={<StudentMNG />} />
            <Route path='teachers' element={<TeacherMNG />} />

            {/* Teacher Routes */}
            <Route path='attendance' element={<Attendence />} />
            <Route path='markings' element={<Markings />} />
            <Route path='notices' element={<Notices />} />
            <Route path='subject' element={<SubjCreate />} />
            <Route path='overview' element={<TOverview />} />
            <Route path='email' element={<ContactParent />} />

            {/* Support Team Routes */}
            <Route path='supoverview' element={<SpOverview />} />
            <Route path='createstudents' element={<CreateStudentAcc />} />
            <Route path='createteachers' element={<CreateTeacherAcc />} />
            <Route path='manageacc' element={<ManageAccounts />} />
            <Route path='publishnotices' element={<PublishNotices />} />
          </Route>

          <Route path='/portal' element={<StudentDashboard/>}>
            {/* Student Routes */}
            <Route path='' element={<StOverview />} />
            <Route path='class' element={<ClassPage/>} />
            <Route path='subject/:id' element={<SingleModuleViewPage />} />
            <Route path='subject' element={<ModulePage />} />
            <Route path='marks' element={<StudentMarks />} />
            <Route path='notices' element={<Notices2 />} />
            <Route path='profile' element={<StProfile />} />

          </Route>
          {/* 
        <Route path='/' element={}></Route>
        <Route path='/' element={}></Route>
        <Route path='/' element={}></Route>
        <Route path='/' element={}></Route>
        <Route path='/' element={}></Route>
        <Route path='/' element={}></Route>
        <Route path='/' element={}></Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
