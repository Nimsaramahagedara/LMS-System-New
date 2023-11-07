import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/common/Login'
import Dashboard from './pages/common/Dashboard'
import AdminHome from './pages/admin/AdminHome'
import StudentMNG from './pages/admin/StudentMNG'
import TeacherMNG from './pages/admin/TeacherMNG'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='*' element={<div>ERROR</div>} />
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='' element={<AdminHome/>}></Route>
          <Route path='students' element={<StudentMNG/>}></Route>
          <Route path='teachers' element={<TeacherMNG/>}></Route>
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
