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

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='*' element={<div>ERROR</div>} />
        <Route path='/dashboard' element={<Dashboard/>}>
          {/* Admin Routes */}
          <Route path='' element={<AdminHome/>}/>
          <Route path='students' element={<StudentMNG/>}/>
          <Route path='teachers' element={<TeacherMNG/>}/>

          {/* Teacher Routes */}
          <Route path='attendance' element={<Attendence/>}/>
          <Route path='markings' element={<Markings/>}/>
          <Route path='notices' element={<Notices/>}/>
          <Route path='subject' element={<SubjCreate/>}/>
          <Route path='overview' element={<TOverview/>}/>

          {/* Student Routes */}
          <Route path='stoverview' element={<StOverview/>}/>
          <Route path='module/:id' element={<SingleModuleViewPage/>}/>
          <Route path='modules' element={<ModulePage/>}/>
          <Route path='marks' element={<StudentMarks/>}/>

          {/* Support Team Routes */}
          <Route path='supoverview' element={<SpOverview/>}/>
          <Route path='createstudents' element={<CreateStudentAcc/>}/>
          <Route path='createteachers' element={<CreateTeacherAcc/>}/>
          <Route path='manageacc' element={<ManageAccounts/>}/>
          <Route path='publishnotices' element={<PublishNotices/>}/>
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
    </BrowserRouter>
  )
}

export default App
