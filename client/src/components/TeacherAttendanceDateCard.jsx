import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function TeacherAttendanceDateCard() {

const [currentTime, setCurrentTime] = useState(new Date());

const cardStyle = {
    minWidth: 250,
    background: 'linear-gradient(to bottom right, #293660, rgba(0, 0, 0, 0)), url(https://claymore-p.schools.nsw.gov.au/content/dam/doe/sws/schools/c/claymore-p/images/news/Roll_Marking.jpg.thumb.1280.1280.jpg) center right no-repeat',
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
          Mark Attendance
        </Typography>
        {currentTime.toUTCString()}
      </CardContent>
    </Card>
  );
}
