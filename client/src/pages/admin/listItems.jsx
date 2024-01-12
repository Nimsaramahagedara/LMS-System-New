import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradingIcon from '@mui/icons-material/Grading';
import TaskIcon from '@mui/icons-material/Task';
import NoteIcon from '@mui/icons-material/Note';
import ContactsIcon from '@mui/icons-material/ImportContacts';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from 'react-router-dom';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';


export const teacherListItems = (
  <React.Fragment>
    <Link to={'/dashboard/overview'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/attendance'}>
      <ListItemButton>
        <ListItemIcon>
          <GradingIcon />
        </ListItemIcon>
        <ListItemText primary="Attendance" />
      </ListItemButton>
    </Link>
    <Link to={'/dashboard/markings'}>
      <ListItemButton>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary="Markings" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/notices'}>
      <ListItemButton>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary="Notices" />
      </ListItemButton>
    </Link>
    <Link to={'/dashboard/subject'}>

      <ListItemButton>
        <ListItemIcon>
          <ContactsIcon />
        </ListItemIcon>
        <ListItemText primary="Subject" />
      </ListItemButton>
    </Link>
    <Link to={'/dashboard/email'}>
      <ListItemButton>
        <ListItemIcon>
          <AlternateEmailIcon />
        </ListItemIcon>
        <ListItemText primary="Contact Parents" />
      </ListItemButton>
    </Link>
    <Link to={'/dashboard/profile'}>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);


export const adminListItems = (
  <React.Fragment>
    <Link to={'/dashboard'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/support'}>
      <ListItemButton>
        <ListItemIcon>
          <DirectionsWalkIcon />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/students'}>
      <ListItemButton>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Students" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/classes'}>
      <ListItemButton>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Classes" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/teachers'}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Teachers" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/publishNotice'}>
      <ListItemButton>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary="Publish Notices" />
      </ListItemButton>
    </Link>


  </React.Fragment>
);

export const studentListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to={'/dashboard/stoverview'}>
        <ListItemText primary="Overview" />
      </Link>

    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <Link to={'/dashboard/modules'}>
        <ListItemText primary="Modules" />
      </Link>

    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to={'/dashboard/module'}>
        <ListItemText primary="ModulePage" />
      </Link>

    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to={'/dashboard/marks'}>
        <ListItemText primary="Marks" />
      </Link>

      </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ChatIcon />
      </ListItemIcon>
      <Link to={'/dashboard/message'}>
        <ListItemText primary="Request Advice" />
      </Link>

    </ListItemButton>
  </React.Fragment>
);

export const supportListItems = (
  <React.Fragment>
    <Link to={'/dashboard/supoverview'}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/createstudents'}>
      <ListItemButton>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Student Accounts" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/createteachers'}>
      <ListItemButton>
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Teacher Accounts" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/classes'}>
      <ListItemButton>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Classes" />
      </ListItemButton>
    </Link>

    {/* <Link to={'/dashboard/manageSubj'}>
      <ListItemButton>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Subjects" />
      </ListItemButton>
    </Link> */}

    <Link to={'/dashboard/publishnotices'}>
      <ListItemButton>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary="Publish Notice" />
      </ListItemButton>
    </Link>

    <Link to={'/dashboard/profile'}>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last Term" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last Year" />
    </ListItemButton>
  </React.Fragment>
);

export const parentListItems = (
  <React.Fragment>
      <Link to={'/dashboard/paroverview'}>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
        <ListItemText primary="Dashboard" />
    </ListItemButton>
    </Link>
    <Link to={'/dashboard/childmarks'}>
    <ListItemButton>
      <ListItemIcon>
        <DirectionsWalkIcon />
      </ListItemIcon>
        <ListItemText primary="Child Marks" />
    </ListItemButton>
    </Link>
    <Link to={'/dashboard/facilityfee'}>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
        <ListItemText primary="Facility Fee" />
    </ListItemButton>
    </Link>

    {/* <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to={'/dashboard/notices'}>
      <ListItemText primary="Notices" />
      </Link>
    </ListItemButton> */}

  </React.Fragment>
);