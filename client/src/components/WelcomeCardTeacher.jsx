import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


export default function WelcomeCardTeacher({name = 'Prasanna'}) {

const [currentTime, setCurrentTime] = useState(new Date());
const navigate = useNavigate();
const cardStyle = {
    minWidth: 250,
    background: 'linear-gradient(to bottom right, #293660, rgba(0, 0, 0, 0)), url(https://fpdl.in/uploads/[fpdl.in]_education-reading-concept-group-colorful-books-wooden-table-classroom-blackboard-background_627494-1271_large.jpg) top right no-repeat',
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
            Teacher Dashboard
        </Typography>

        {currentTime.toUTCString()}
        
   
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> navigate('/')} >Log out </Button>
      </CardActions>
    </Card>
  );
}
