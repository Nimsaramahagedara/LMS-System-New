// Notices.jsx

import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/StudentDashboard/PageTitle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Typography, colors, Link } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [otherStudents] = useState(['N D Namal', 'S K Kamal', 'John Cobra', 'Saman Perera']);

  const getAllNotices = async ()=>{
    try {
      const allnotes = await authAxios.get(`${apiUrl}/notices/student`);
      setNotices(allnotes.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    getAllNotices();
  }, []);

  return (
    <ContainerStudent>
      {
        isLoading ? <Loader/> : <></>
      }
      <PageTitle title={'Notices'} icon={<CircleNotificationsIcon fontSize='large' />} bgColor='bg-purple-800' />
      <div className='flex items-start mt-5 justify-between'>
        <div className='md:w-5/6 w-full'>
          <div className='px-5 py-2 bg-cyan-200 mb-4'>
            <h1>Notices</h1>
          </div>
          <div className='p-5 bg-white'>
            {notices.map((notice, index) => (
              <div key={index} className='bg-amber-200 p-5 mb-2'>
                <p className='mb-0 text-md'>{notice.title}</p>
                <p className='text-sm text-gray-500'>{notice.discription}</p>
                <p className='w-full text-right text-xs text-gray-500'>{notice.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
          <Typography variant='h6' color={colors.yellow[900]}>Classmates</Typography>
          {otherStudents.map((student, index) => (
            <Link key={index}><Typography variant='subtitle2' color={colors.grey[500]}>{student}</Typography></Link>
          ))}
        </div>
      </div>
    </ContainerStudent>
  );
};

export default Notices;

