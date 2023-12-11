import React from 'react';
import PageTitle from '../../components/StudentDashboard/PageTitle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import AllNotices from '../../components/StudentDashboard/AllNotices'; // Fix import statement
import { Typography, colors, Link } from '@mui/material';

const Notices = () => {
  const otherStudents = [
    'N D Namal',
    'S K Kamal',
    'John Cobra',
    'Saman Perera'
  ];

  return (

    <ContainerStudent>
      <PageTitle title={'Notices'} icon={<CircleNotificationsIcon fontSize='large' />} bgColor='bg-purple-800' />
      <div className='flex items-start mt-5 justify-between'>
        <div className='md:w-5/6 w-full'>
          <div className='px-5 py-2 bg-cyan-200 mb-4'>
            <AllNotices role="students" />
          </div>
          <div className='px-5'>
            {/* Remove duplicate AllNotices */}
          </div>
        </div>
        <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
          <Typography variant='h6' color={colors.yellow[900]}>Classmates</Typography>
          <hr />
          {
            otherStudents.map((student, index) => (
              <Link key={index}><Typography variant='subtitle2' color={colors.grey[500]}>{student}</Typography></Link>
            ))
          }
        </div>

      </div>

    </ContainerStudent>
  );
};

export default Notices;