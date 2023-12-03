import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import EditProfileForm from './EditProfileForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';

const StProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const student = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobileNumber: '123-456-7890',
    address: '123 Main Street, Cityville',
    gender: 'Male',
    grade: '10th',
    class: 'A',
  };
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedProfile) => {
    // Handle saving the updated profile (e.g., send to the server).
    console.log('Updated Profile:', updatedProfile);
    setIsEditing(false);
  };

  return (
   <ContainerStudent>

   
    <Card sx={{padding:'60px 40px', width:'fit-content', margin:'10px auto'}}>
      <CardContent >
        {isEditing ? (
          <EditProfileForm student={student} onSave={handleSave} />
        ) : (
          <>
            {/* Use AccountCircleIcon instead of Avatar */}
            <Avatar sx={{ width: 100, height: 100,margin:'20px auto' }}>
              <AccountCircleIcon sx={{ width: '100%', height: '100%' }} />
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {`${student.firstName} ${student.lastName}`}
            </Typography>
            <Typography>Email: {student.email}</Typography>
            <Typography>Mobile: {student.mobileNumber}</Typography>
            <Typography>Address: {student.address}</Typography>
            <Typography>Gender: {student.gender}</Typography>
            <Typography>Grade: {student.grade}</Typography>
            <Typography>Class: {student.class}</Typography>
            <Button variant="contained" onClick={handleEditClick} sx={{ marginTop: 2 }}>
              Edit Profile
            </Button>
          </>
        )}
      </CardContent>
    </Card>
    </ContainerStudent>
  );
};

export default StProfile;
