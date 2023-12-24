import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authAxios from '../../utils/authAxios'
import { apiUrl } from '../../utils/Constants'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader/Loader'

const SubjCreate = () => {
  const [mySubjects, setMySubjects] = useState([])

  const getMySubjects = async () => {
    try {
      const data = await authAxios.get(${apiUrl}/teacher/my-subjects);
      setMySubjects(data.data)
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }
  useEffect(() => {
    getMySubjects();
  }, [])

  return (
    <div className='flex flex-col items-center space-y-4 bg-white p-3 rounded shadow-md relative'>
      <Typography variant='h5'>My Subjects</Typography>
      <br />
      {mySubjects.length > 0 ? (
        mySubjects.map((subject) => (
          <Link to={../mysub/${subject._id}}>
            {subject.subName + ' - ' + subject.classId.grade + ' ' + subject.classId.subClass}
          </Link>
        ))
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default SubjCreate