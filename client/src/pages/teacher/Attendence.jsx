import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';
import TeacherAttendanceDateCard from '../../components/TeacherAttendanceDateCard';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';


const Attendance = () => {

  const [studentList, setStudentList] = useState([]);
  
  useEffect(() => {
    const getStudentList = async () => {
      try {
        const userDetails = await authAxios.get(`${apiUrl}/get-user`);
        if (userDetails) {
          try {
            const classDetails = await authAxios.get(`${apiUrl}/class/get-class-by-teacher/${userDetails.data._id}`);
            if (classDetails) {
              try {
                const studentList = await authAxios.get(`${apiUrl}/class/get-students/${classDetails.data._id}`);
                if (studentList) {
                  console.log(studentList.data);
                  setStudentList(studentList.data);
                }
              } catch (error) {
                console.log(error.response.data.message);
              }
            }
          } catch (error) {
          console.log(error.response.data.message);
        }
      }
      } catch (error) {
      console.log(error.response.data.message);
    }
  };
  
  getStudentList();
  }, []);


  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  return (
    <div>
      <TeacherAttendanceDateCard />
      
    </div>
  );
};

export default Attendance;
