import React from 'react';
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

const ModulePage = () => {
  const subjects = [
    'Sinhala Language and Literature',
    'English Language and Literature',
    'Mathematics',
    'Science',
    'Health and Physical Education',
    'Religion and Civilization',
  ];

  return (
    <ContainerStudent>
      <PageTitle title={'Subjects'} icon={<BookIcon fontSize='large' />} bgColor='bg-purple-800' />
      <div className='flex items-start mt-5 justify-between'>
        <div className='md:w-5/6 w-full'>
          <div className='px-5 py-2 bg-cyan-200 mb-4  mt-5'>Enrolled Subjects</div>
          <div className='px-5'>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <List>
                {subjects.map((subject, ind) => (
                  <ListItem key={ind} disablePadding>
                    <Link to={`/portal/subject/${subject}`}>
                      <ListItemButton>
                        <ListItemText primary={subject} />
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
            Enroll a Subject
          </Typography>
          <hr />
          <Button variant='outlined'>Enroll</Button>
        </div>
      </div>
    </ContainerStudent>
  );
};

export default ModulePage;
