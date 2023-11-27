import React from 'react';
import { Button } from '@mui/material';

import AdminWelcomeCard from '../../components/AdminWelcomeCard';


const StudentMNG = () => {
  const handleAddStudent = () => {
    // Add logic to handle adding a new student
    console.log('Add new student clicked!');
    // You can add your logic to open a modal, navigate to a new page, or perform any other action.
  };


  return (
    
    <div>
      <AdminWelcomeCard/>
      <h1>Manage Students</h1>
    <br></br>
      <Button variant="contained">Add New Student</Button>
    </div>
  );
};

export default StudentMNG;