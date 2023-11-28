import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '../pages/common/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function AdminWelcomeCard({name = 'Nimsara'}) {

const [currentTime, setCurrentTime] = useState(new Date());
const {logout} = useAuth();
const navigate = useNavigate();

const handleLogOut = ()=>{
  logout();
  navigate('/');
}

const cardStyle = {
    minWidth: 250,
    background: 'linear-gradient(to bottom right, #293660, rgba(0, 0, 0, 0)), url(https://th.bing.com/th/id/R.f8e7cdcf9f230faeb0824b8db3273b9a?rik=LNMVumAsA7HO%2fg&pid=ImgRaw&r=0) top right no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  };

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card sx={cardStyle} className='mb-3'>
      <CardContent className='text-white'>
        <Typography variant='h5' gutterBottom>
          Welcome, {name}
        </Typography>
        <Typography variant="subtitle1" component="div">
            Admin Dashboard
        </Typography>

        {currentTime.toUTCString()}
        
   
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLogOut}>Log out </Button>
      </CardActions>
    </Card>
  );
}
