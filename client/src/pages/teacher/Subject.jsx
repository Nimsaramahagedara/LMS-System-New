import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authAxios from '../../utils/authAxios'
import { apiUrl } from '../../utils/Constants'
import { toast } from 'react-toastify'
import Divider from '@mui/material/Divider';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const Subject = () => {
  const [mySubjects, setMySubjects] = useState([])

  const getMySubjects = async () => {
    try {
      const data = await authAxios.get(`${apiUrl}/teacher/my-subjects`);
      setMySubjects(data.data)
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  useEffect(() => {
    getMySubjects();
  }, [])

  return (
    <>
      <div className='flex flex-col items-center space-y-4 bg-white p-3 rounded shadow-md relative'>
        <Typography variant='h5'>My Subjects</Typography>
        {/* <br />
        {mySubjects.length > 0 ? (
          mySubjects.map((subject, key) => (
            <Link to={`../mysub/${subject._id}/${subject.subName}/${subject.classId.grade + subject.classId.subClass}`} key={key}>
              {subject.subName + ' - ' + subject.classId.grade + ' ' + subject.classId.subClass}
            </Link>
          ))
        ) : (
          <Loader />
        )} */}

        {mySubjects.map((subject, index) => (
          <nav aria-label="main mailbox folders">
          <Divider />
            <Link to={`../mysub/${subject._id}/${subject.subName}/${subject.classId.grade + subject.classId.subClass}`} key={index}>
              <List sx={{ width: 500, maxWidth: '100%', bgcolor: 'background.paper' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index + 1}
                    </ListItemIcon>
                    <ListItemText primary={`${subject.subName}`} />
                    <ListItemIcon>
                      <ListItemText primary={`${subject.classId.grade}-${subject.classId.subClass}`} />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
          </nav>
        ))}
      </div></>
  )
}

export default Subject