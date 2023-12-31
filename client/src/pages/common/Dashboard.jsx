import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
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
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import { adminListItems, teacherListItems, studentListItems, supportListItems, secondaryListItems, parentListItems } from '../admin/listItems';
import { Outlet, useNavigate } from 'react-router-dom';
import Notifications from '@mui/icons-material/Notifications';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ClickOutHandler } from 'react-clickout-ts';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:3030/">
        Dharmapala Knowledge Base
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100 % - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [notiOpen, setNotiOpen] = useState(false);
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notices, setNotices] = useState([
    <div className='flex items-center justify-start py-2 gap-2 cursor-pointer hover:bg-gray-300 px-1 relative'>
      < ChatBubbleOutlineOutlinedIcon sx={{ color: 'green' }} />
      <p className='text-xs text-left'>Ooops! No Notifications Here</p>
    </div>]);

  const toggleNotification = () => {
    setNotiOpen(!notiOpen);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Function to handle opening the dialog
  const handleOpen = () => {
    setSelectedNotification(notification);
    setNotiOpen(true);
  };

  // Function to handle closing the dialog
  const handleClickOut = () => {
    setNotiOpen(false);
  };

  // const userRole = Cookies.get('userRole');
  const [navLinks, setNavlinks] = useState(studentListItems);
  /*DEPEND ON LOGGED IN USER, WE CAN CHANGE THE NAVIGATION BAR LINKS */




  //Handle notifications
  useEffect(() => {
    const getAllNotices = async (userRole) => {
      
      const allNotices = await authAxios.get(`${apiUrl}/notices/${userRole}`);

      const designedNotices = allNotices.data.map((el, index) => {
        const createdAt = new Date(el.createdAt);
        const formattedDate = createdAt.toLocaleDateString("en-GB");
        return (

          <div className='flex items-center justify-start py-2 gap-2 cursor-pointer hover:bg-gray-300 px-1 relative rounded-md' key={index}>
            < ChatBubbleOutlineOutlinedIcon sx={{ color: 'green' }} />
            <p className='text-xs text-left'>{el.title}</p>
            <p className='text-xs text-right text-gray-400 absolute bottom-0 right-0'>{formattedDate}</p>

          </div>
        )
      })
      if (designedNotices) {
        setNotices(designedNotices);
      }
    };

    getAllNotices(Cookies.get('userRole'));
  }, [])



  useEffect(() => {
    switch (userRole) {
      case "admin": //Admin
        setNavlinks(adminListItems);
        break;
      case "support": //Support
        setNavlinks(supportListItems);
        break;
      case "teacher": //Teacher
        setNavlinks(teacherListItems);
        break;
      case "parent": //Parent
        setNavlinks(parentListItems);
        break;
      default:
        toast.error("Login Expired ! Please Login Again");
        navigate("/");
    }

  }, []);






  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
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
            {userRole == 'admin' ? 'Admin' : userRole == 'support' ? 'Support' : userRole == 'parent' ? 'parent' : 'Teacher'} Dashboard
          </Typography>
          <IconButton color="inherit" onClick={toggleNotification}>
            <Badge badgeContent={notices.length} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
        </Toolbar>


        {/* Notifications in top */}
        {/* <Box className={relative}>
          <div onClick={handleOpen} className="cursor-pointer">
            
            <i className="fas fa-bell text-2xl"></i>
          </div>

          <Dialog sx={{position:'absolute', top:'0', left:'0'}} open={notiOpen} onClose={handleClose}>
            <DialogTitle>Notifications</DialogTitle>
            <DialogContent>
              <List component="nav" className="w-80">
               
                <React.Fragment>
                  {notices}
                </React.Fragment>
                <Divider className="my-1" />
              </List>
            </DialogContent>
          </Dialog>
        </Box> */}

        <ClickOutHandler onClickOut={handleClickOut}>
          <Box sx={{ position: 'absolute', boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)', top: '60px', right: '20px', background: 'white', color: 'black', padding: '20px', borderRadius: '10px' }} visibility={notiOpen ? 'visible' : 'hidden'}>
            <List component="nav" sx={{ width: '300px' }}>
              {/* Notification Object goes here */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Typography variant='subtitle1'>Notification</Typography>
                <SettingsOutlinedIcon />
              </Box>
              <React.Fragment>
                {notices}
              </React.Fragment>
              <Divider sx={{ my: 1 }} />
            </List>
          </Box>
        </ClickOutHandler>




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
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* PAGES INCLUDED INTO HERE */}
          <Outlet />
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
