import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const MySubject = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState([
    {
      title: 'Assignment 01',
      discription: 'Description 01',
      createdAt:'not-given'
    },

    {
      title: 'Assignment 01',
      discription: 'Description 01',
      createdAt:'not-given'
    }
  ]);

  const [learningMat , setLearningMat] = useState([ {
    title: 'Check This Video for Learn more about Topic 01',
    discription: 'Description 01',
    link:'not-given',
    createdAt:'not-given'
  },

  {
    title: 'Check this Documentation',
    discription: 'Description 01',
    link:'not-given',
    createdAt:'not-given'
  }]);

  return (
    <div className='bg-white p-3 rounded-lg shadow-md'>
      <div>
        <Typography variant='h6'>Current Assignments</Typography>
        <br />
        {
          assignments.map((act) => (
            <div className='bg-amber-500 text-white rounded-lg p-3 mb-3'>
                <h4>{act.title}</h4>
                <p className='text-xs'>{act.discription}</p>
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
          learningMat.map((lmt) => (
            <div className='bg-green-300 text-black rounded-lg p-3 mb-3'>
                <h4>{lmt.title}</h4>
                <p className='text-xs'>{lmt.discription}</p>
                <Link to={lmt.link} target='_blank' className='text-xs'>{lmt.link}</Link>
                <p className='text-right text-xs text-gray-900'>{lmt.createdAt}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MySubject