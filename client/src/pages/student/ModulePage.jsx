import React from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Card, Link, Typography, colors } from '@mui/material';
import AllNotices from '../../components/StudentDashboard/allNotices';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const ModulePage = () => {

  const subjects = [
    'Sinhala Language and Literature',
    'English Language and Literature',
    'Mathematics',
    'Science',
    'Health and Physical Education',
    'Religion and Civilization',
  ]
  return (

    <ContainerStudent>
      <PageTitle title={'Subjects'} icon={<CircleNotificationsIcon fontSize='large' />} bgColor='bg-purple-800' />
      <div className='flex items-start mt-5 justify-between'>
        <div className='md:w-5/6 w-full'>
          <div className='px-5 py-2 bg-cyan-200 mb-4'>
            Enrolled Subjects
          </div>
          <div className='px-5'>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <List>

                {
                  subjects.map((subjects, ind) => (
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary={subjects} />
                      </ListItemButton>
                    </ListItem>
                  )
                  )
                }
              </List>
            </Box>
          </div>
        </div>
        <div className='md:w-1/6 hidden md:block border-l-2 border-gray-500 px-3'>
          <Typography variant='h6' color={colors.yellow[900]}>Enroll Subject</Typography>
          <hr />
          <Button variant="outlined">Entoll</Button>
          {/* {
            subjects.map((subjects) => (
              <Link ><Typography variant='subtitle2' color={colors.grey[500]}>{subjects}</Typography></Link>
            )
            )
          } */}
        </div>

      </div>

    </ContainerStudent>
  )
}

export default ModulePage