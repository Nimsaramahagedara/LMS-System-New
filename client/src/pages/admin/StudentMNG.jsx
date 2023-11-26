import React from 'react'

const StudentMNG = () => {
  return (
    // <div>StudentMNG</div>

    /*Add new Stuident navigation button*/
    <div className="button-container">
    <button type="button" className="button" onClick={() => {navigate('/appointments/lab_add');}}>Add new Student</button>
    </div>



  )
}

export default StudentMNG