import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PageTitle from '../../components/StudentDashboard/PageTitle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Typography, colors } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom'
import ColorCard from '../../components/StudentDashboard/ColorCard';
import FunctionsIcon from '@mui/icons-material/Functions';
import StarIcon from '@mui/icons-material/Star';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Loader from '../../components/Loader/Loader';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';

const ModulePage = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const [teacherInCharge, setTeacher] = useState('');
  const [Mates, setMates] = useState([]);

  const getSubjects = async () => {
    try {
      const data = await authAxios.get(`${apiUrl}/student/get-subjects`);
      const classMates = await authAxios.get(`${apiUrl}/student/get-classmates`);
      setSubjects(data.data.subjects);
      setTeacher(data.data.ownedBy);
      setMates(classMates.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    getSubjects()
  }, [])

  return (
    <ContainerStudent>
      <PageTitle title={'Subjects'} icon={<BookIcon fontSize='large' />} bgColor='bg-purple-800' />
      {
        !isLoading ? <div className='flex items-start mt-5 justify-between'>
        <div className='md:w-5/6 w-full'>
          <div className='px-5 py-2 bg-cyan-200 mb-4  mt-5'>Enrolled Subjects</div>
          <div className='px-5'>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <List>
                {subjects && subjects.map((subject, ind) => (
                  <ListItem key={ind} disablePadding>
                    <Link to={`/portal/subject/${subject._id}`}>
                      <ListItemButton>
                        <ListItemText primary={subject.subName} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </div>
        </div>
        <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
          <Typography variant='h6' color={colors.yellow[900]}>
            Class Mates
          </Typography>
          <hr />
          {
            Mates && Mates.map((student) => (
              <Link ><Typography variant='subtitle2' color={colors.grey[500]}>{student.firstName}</Typography></Link>
            )
            )
          }
          {/* <Button variant='outlined'>Enroll</Button> */}
        </div>
      </div>
 : <Loader/>}
    </ContainerStudent>
  );
};

export default ModulePage;
