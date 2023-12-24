import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import EditProfileForm from './EditProfileForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';



const TeacherProfile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [teacher, setTeacher] = useState({
        firstName: 'Loading',
    lastName: 'Loading',
    grade: 'Loading',
    gender: 'Loading',
    address: 'Loading',
    classId: {
      subClass: 'Loading',
      grade: 'Loadning'
    }
      });


      const handleEditClick = () => {
        setIsEditing(true);
      };
    
      const handleSave = (updatedProfile) => {
        // Handle saving the updated profile (e.g., send to the server).
        console.log('Updated Profile:', updatedProfile);
        setIsEditing(false);
      };


      useEffect(() => {
        const getUserDetails = async () => {
          try {
            const response = await authAxios.get(`${apiUrl}/get-user`);
            setTeacher(response.data);
            console.log(response.data);
          } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 404) {
              // Handle 404 error (resource not found)
              toast.error('Teacher profile not found.');
            } else {
              toast.error(error.response?.data?.message || 'An error occurred');
            }
          }
        };
        getUserDetails();
      }, []);
    


  return (
    <div className='w-full bg-blue-950 py-4 '>
        <Card sx={{ padding: '60px 40px', width: 'fit-content', margin: '10px auto' }}>
          <CardContent >
            {isEditing ? (
              <EditProfileForm teacher={teacher} onSave={handleSave} />
            ) : (
              <>
                {/* Use AccountCircleIcon instead of Avatar */}
                <Avatar sx={{ width: 100, height: 100, margin: '20px auto' }}>
                  <AccountCircleIcon sx={{ width: '100%', height: '100%' }} />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {`${teacher.firstName} ${teacher.lastName}`}
                </Typography>
               
                <Typography>Email: {teacher.email}</Typography>
                <Typography>Gender: {teacher.gender}</Typography>
                <Typography>Address: {teacher.address}</Typography>
                
                <Button variant="contained" onClick={handleEditClick} sx={{ marginTop: 2 }}>
                  Edit Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
  )
}

export default TeacherProfile