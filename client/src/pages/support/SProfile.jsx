import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/common/AuthContext';

const SupportProfile = () => {
  const [support, setSupport] = useState({
    firstName: 'Loading',
    lastName: 'Loading',
    email: 'Loading',
    gender: 'Loading',
    address: 'Loading',
    // Include other properties as needed
  });

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await authAxios.get(`${apiUrl}/get-user`);
        setSupport(response.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
          toast.error('Support profile not found.');
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
        <CardContent>
          <Avatar sx={{ width: 100, height: 100, margin: '20px auto' }}>
            <AccountCircleIcon sx={{ width: '100%', height: '100%' }} />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            {`${support.firstName} ${support.lastName}`}
          </Typography>
          <Typography>Email: {support.email}</Typography>
          <Typography>Gender: {support.gender}</Typography>
          <Typography>Address: {support.address}</Typography>

          <Button size="small" onClick={() => logout()} variant="outlined" sx={{ color: 'black' }}>
            Log out
          </Button>

        </CardContent>
      </Card>
    </div>
  );
};

export default SupportProfile;
