import React from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import AbcIcon from '@mui/icons-material/Abc';
const StudentMarks = () => {
  return (
    <div>
      <PageTitle title={'Your Marks'} icon={<AbcIcon/>}/>
    </div>
  )
}

export default StudentMarks