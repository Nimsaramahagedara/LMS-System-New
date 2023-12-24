import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';

const MySubject = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {id} = useParams();
  const [assignments, setAssignments] = useState([]);

  const getAllActivity = async ()=>{
    try {
      const data = await authAxios.get(`${apiUrl}/activity/${id}`)
      setAssignments(data.data);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(()=>{
    getAllActivity();
  },[])

  // Separate assignments based on type
  const assignmentType = assignments.reduce(
    (acc, assignment) => {
      if (assignment.actType === 'activity') {
        acc.assignments.push(assignment);
      } else if (assignment.actType === 'learning') {
        acc.materials.push(assignment);
      }
      return acc;
    },
    { assignments: [], materials: [] }
  );


  return (
    <div className='bg-white p-3 rounded-lg shadow-md'>
      <div>
        <Typography variant='h6'>Current Assignments</Typography>
        <br />
        {
          assignmentType.assignments.map((act) => (
            <div className='bg-amber-500 text-white rounded-lg p-3 mb-3'>
                <h4>{act.title}</h4>
                <p className='text-xs'>{act.desc}</p>
                <p className='text-right text-xs text-gray-300'>{act.createdAt}</p>
            </div>
          ))
        }
      </div>
      <br />
      <div>
        <Typography variant='h6'>Given Learning Materials</Typography>
        <br />
        {
          assignmentType.materials.map((lmt) => (
            <div className='bg-green-300 text-black rounded-lg p-3 mb-3'>
                <h4>{lmt.title}</h4>
                <p className='text-xs'>{lmt.desc}</p>
                <a href={lmt.link} target='_blank' className='text-xs text-blue-500'>{lmt.link}</a>
                <p className='text-right text-xs text-gray-900'>{lmt.createdAt}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MySubject