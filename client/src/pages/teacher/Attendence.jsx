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

const Attendance = () => {
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TeacherAttendanceDateCard />
      <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {/* Header Row */}
        <ListItem>
          <ListItemAvatar>
            <ListItemText primary="ID" />
          </ListItemAvatar>
          <ListItemText primary="Name" />
        </ListItem>

        {/* User Rows */}
        {users.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value.id}`;
          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value.id)}
                  checked={checked.indexOf(value.id) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <ListItemText id={labelId} primary={`${value.id}`} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`${value.name.firstname} ${value.name.lastname}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <div style={{ textAlign: 'center' }} >
        <Button variant="outlined" startIcon={<SaveIcon />} color="primary" sx={{ marginTop: 2 }} >Submit Attendance</Button>
      </div>
    </div>
  );
};

export default Attendance;
