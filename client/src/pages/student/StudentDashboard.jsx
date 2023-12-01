import React from 'react'
import { Outlet } from 'react-router-dom'
const StudentDashboard = () => {
  return (
    <div>StudentDashboard
        <Outlet/>
    </div>
  )
}

export default StudentDashboard