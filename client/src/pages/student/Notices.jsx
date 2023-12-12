// Notices.jsx

import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/StudentDashboard/PageTitle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Typography, colors, Link } from '@mui/material';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [otherStudents] = useState(['N D Namal', 'S K Kamal', 'John Cobra', 'Saman Perera']);

  useEffect(() => {
    // Fetch notices from your backend API
    fetch('/student-dashboard/notices/all') // Update the URL based on your backend API
      .then((response) => response.json())
      .then((data) => setNotices(data))
      .catch((error) => console.error('Error fetching notices:', error));
  }, []);

  return (
    <ContainerStudent>
      <PageTitle title={'Notices'} icon={<CircleNotificationsIcon fontSize='large' />} bgColor='bg-purple-800' />
      <div className='flex items-start mt-5 justify-between'>
        <div className='md:w-5/6 w-full'>
          <div className='px-5 py-2 bg-cyan-200 mb-4'>
            <h1>Notices</h1>
            {/* Display notices here */}
            {notices.map((notice) => (
              <div key={notice._id}>
                <Typography variant='h6' color={colors.blue[900]}>{notice.title}</Typography>
                <Typography variant='body1' color={colors.grey[700]}>{notice.description}</Typography>
              </div>
            ))}
          </div>
          <div className='px-5'>
            {/* Other content */}
          </div>
        </div>
        <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
          <Typography variant='h6' color={colors.yellow[900]}>Classmates</Typography>
          <hr />
          {otherStudents.map((student, index) => (
            <Link key={index}><Typography variant='subtitle2' color={colors.grey[500]}>{student}</Typography></Link>
          ))}
        </div>
      </div>
    </ContainerStudent>
  );
};

export default Notices;

