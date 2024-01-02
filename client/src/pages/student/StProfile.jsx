import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import EditProfileForm from './EditProfileForm';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';

const StProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [student, setStudent] = useState({
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
    try {
      const isUpdated = authAxios.put(`${apiUrl}/student/update-student/${updatedProfile._id}`, updatedProfile);
      if(isUpdated){
        toast.success('Profile Updated');
        setRefresh((prev)=> !prev);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    setIsEditing(false);
  };



  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const data = await authAxios.get(`${apiUrl}/student/`)
        setStudent(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
    getUserDetails();
  }, [refresh]);

  return (

      <div className='w-full bg-blue-950 py-4 '>
        {isLoading ? <Loader/> : <></>}
        <Card sx={{ padding: '60px 40px', width: 'fit-content', margin: '10px auto' }}>
          <CardContent >
            {isEditing ? (
              <EditProfileForm student={student} onSave={handleSave} />
            ) : (
              <>
                {/* Use AccountCircleIcon instead of Avatar */}
                <Avatar sx={{ width: 100, height: 100, margin: '20px auto' }}>
                  <AccountCircleIcon sx={{ width: '100%', height: '100%' }} />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {`${student.firstName} ${student.lastName}`}
                </Typography>
                <Typography>Email: {student.email}</Typography>
                <Typography>Mobile: {student.contactNo}</Typography>
                <Typography>Address: {student.address}</Typography>
                <Typography>Gender: {student.gender}</Typography>
                <Typography>Grade: {student.classId.grade}</Typography>
                <Typography>Class: {student.classId.subClass}</Typography>
                <Button variant="contained" onClick={handleEditClick} sx={{ marginTop: 2 }}>
                  Edit Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
  );
};

export default StProfile;
