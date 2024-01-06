import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../common/AuthContext';
import Loader from '../../components/Loader/Loader';
import CardActions from '@mui/material/CardActions';


const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
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
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
          toast.error('user profile not found.');
        } else {
          toast.error(error.response?.data?.message || 'An error occurred');
        }
      }
    };
    getUserDetails();
  }, []);

  return (
    <div className='w-full py-4 '>
      {isLoading ? <Loader /> : <></>}
      <Card sx={{ maxWidth: 345, minWidth: 345, width: 'fit-content', margin: '10px auto' }}>
          <Avatar sx={{ width: 100, height: 100, margin: '20px auto' }}>
            <AccountCircleIcon sx={{ width: '100%', height: '100%' }} />
          </Avatar>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">Role: {user.role}</Typography>
          <Typography variant="body2" color="text.secondary">Email: {user.email}</Typography>
          <Typography variant="body2" color="text.secondary">Contact No: {user.contactNo}</Typography>
          <Typography variant="body2" color="text.secondary">Address: {user.address}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => logout()}>Logout</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Profile;