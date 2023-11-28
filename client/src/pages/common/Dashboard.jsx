import  React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { adminListItems, teacherListItems, studentListItems,supportListItems, secondaryListItems } from '../admin/listItems';
import { Outlet } from 'react-router-dom';
import Notifications from '@mui/icons-material/Notifications';

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3030/">
        Dharmapala Knowledge Base
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [notiOpen, setNotiOpen] = useState(false);

  const toggleNotification =()=>{
    setNotiOpen(!notiOpen);
  }
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [userRole, setUserRole] = useState(1);
  const [navLinks , setNavlinks] = useState(studentListItems);
  /*DEPEND ON LOGGED IN USER, WE CAN CHANGE THE NAVIGATION BAR LINKS */

  useEffect(()=>{
    switch(userRole){
      case 1: //Admin
        setNavlinks(adminListItems);
        break;
      case 2: //Student
        setNavlinks(studentListItems);
        break;
      case 3: //Support
        setNavlinks(supportListItems);
        break;
      case 4: //Teacher
        setNavlinks(teacherListItems);
        break;
    }
    console.log(userRole);
  },[]);

   const notifications = (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <Notifications />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
        <Notifications />
        </ListItemIcon>
        <ListItemText primary="Last Term" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
        <Notifications />
        </ListItemIcon>
        <ListItemText primary="Last Year" />
      </ListItemButton>
    </React.Fragment>
  );
  
 
  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
             {userRole == 1 ? 'Admin' : userRole == 2 ? 'Student' : userRole == 3 ? 'Support': 'Teacher'} Dashboard
            </Typography>
            <IconButton color="inherit" onClick={toggleNotification}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon/>
              </Badge>
            </IconButton>
          </Toolbar>
          <Box sx={{position:'absolute', top:'60px',right:'20px',background:'white', color:'black'}} visibility={notiOpen ? 'visible' : 'hidden'}>
          <List component="nav">
            {/* Notification Object goes here */}
            {notifications}
            <Divider sx={{ my: 1 }} />
          </List>
          </Box>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {navLinks}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* PAGES INCLUDED INTO HERE */}
            <Outlet/>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
  );
}