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
import SubjCreate from './pages/teacher/Subject'
import TOverview from './pages/teacher/TOverview'
import StOverview from './pages/student/StOverview'
import SingleModuleViewPage from './pages/student/SingleModuleViewPage'
import ModulePage from './pages/student/ModulePage'
import StudentMarks from './pages/student/StudentMarks'
import SpOverview from './pages/support/SpOverview'
import ManageAccounts from './pages/support/ManageAccounts'
import PublishNotices from './pages/support/PublishNotices'
import AdminPublishNotices from './pages/admin/PublishNotice';
import { AuthProvider } from './pages/common/AuthContext'
import ContactParent from './pages/teacher/ContactParent'
import LandingPage from './pages/common/LandingPage'
import StudentDashboard from './pages/student/StudentDashboard'
import ClassPage from './pages/student/ClassPage'
import Notices2 from './pages/student/Notices';
import NotFound from './pages/common/NotFound'
import StProfile from './pages/student/StProfile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SupportTeam from './pages/admin/SupportTeam';
import ParentHome from './pages/parent/ParentHome';
import ChildMarks from './pages/parent/ChildMarks';
import FacilityFee from './pages/parent/FacilityFee';
import ClassMNG from './pages/admin/ClassMNG'
import MyClass from './pages/teacher/MyClass'
import SubjectMNG from './pages/admin/SubjectMNG'
import Profile from './pages/teacher/Profile'
import Subject from './pages/teacher/Subject'
import MySubject from './pages/teacher/MySubject'
import PublishSubjectMarks from './pages/teacher/PublishSubjectMarks'
// import SubjectMNG from './pages/admin/SubjectMNG'
import Notifications from './pages/common/Notifications'
import PaymentAPI from './pages/parent/PaymentAPI'
import PaymentSuccess from './pages/parent/PaymentSuccess'
import Chat from './pages/teacher/Chat';
import MessageTeacher from './pages/student/Message';


function App() {

  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/dashboard' element={<Dashboard />}>
            {/* Admin Routes */}
            <Route path='' element={<AdminHome />} />
            <Route path='students' element={<StudentMNG />} />
            <Route path='teachers' element={<TeacherMNG />} />
            <Route path='support' element={<SupportTeam />} />
            <Route path='classes' element={<ClassMNG />} />
            <Route path='publishNotice' element={<AdminPublishNotices />} />
            <Route path='notifications' element={<Notifications />} />

            {/* Teacher Routes */}
            <Route path='attendance' element={<Attendence />} />
            <Route path='markings' element={<Markings />} />
            <Route path='notices' element={<Notices />} />
            <Route path='subject' element={<SubjCreate />} />
            <Route path='overview' element={<TOverview />} />
            <Route path='email' element={<ContactParent />} />
            <Route path='profile' element={<Profile />} />
            <Route path='myclass' element={<MyClass />} />
            <Route path='mysub/:id/:subject/:grade' element={<MySubject />} />
            <Route path='subjmarks/:id/:subject/:grade' element={<PublishSubjectMarks />} />
            <Route path='chat' element={<Chat />} />

            {/* Support Team Routes */}
            <Route path='supoverview' element={<SpOverview />} />
            <Route path='createstudents' element={<StudentMNG />} />
            <Route path='createteachers' element={<TeacherMNG />} />
            <Route path='manageacc' element={<ManageAccounts />} />
            <Route path='publishnotices' element={<PublishNotices />} />


            {/* Parent Routes */}
            <Route path='paroverview' element={<ParentHome />} />
            <Route path='childmarks' element={<ChildMarks />} />
            <Route path='facilityfee' element={<FacilityFee />} />
            <Route path='payment-api/:id' element={<PaymentAPI />} />
            <Route path='pay-success' element={<PaymentSuccess />} />
          </Route>

          <Route path='/portal' element={<StudentDashboard />}>
            <Route path='' element={<StOverview />} />
            <Route path='class' element={<ClassPage />} />
            <Route path='subjects' element={<SingleModuleViewPage />} />
            <Route path='subject/:id' element={<SingleModuleViewPage />} />
            <Route path='subject' element={<ModulePage />} />
            <Route path='marks' element={<StudentMarks />} />
            <Route path='notices' element={<Notices2 />} />
            <Route path='profile' element={<StProfile />} />
            <Route path='message' element={<MessageTeacher />} />


          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
