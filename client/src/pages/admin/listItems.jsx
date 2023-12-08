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

export const teacherListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to={'/dashboard/overview'}>
        <ListItemText primary="Dashboard" />
      </Link>

    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GradingIcon />
      </ListItemIcon>
      <Link to={'/dashboard/attendance'}>
      <ListItemText primary="Attendance" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <TaskIcon />
      </ListItemIcon>
      <Link to={'/dashboard/markings'}>
      <ListItemText primary="Markings" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NoteIcon />
      </ListItemIcon>
      <Link to={'/dashboard/notices'}>
      <ListItemText primary="Notices" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ContactsIcon />
      </ListItemIcon>
      <Link to={'/dashboard/subject'}>
      <ListItemText primary="Subject" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AlternateEmailIcon />
      </ListItemIcon>
      <Link to={'/dashboard/email'}>
      <ListItemText primary="Contact Parents" />
      </Link>
    </ListItemButton>
  </React.Fragment>
);
export const adminListItems = (
  <React.Fragment>

    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to={'/dashboard'}>
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DirectionsWalkIcon />
      </ListItemIcon>
      <Link to={'/dashboard/support'}>
      <ListItemText primary="Support" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <DirectionsWalkIcon />
      </ListItemIcon>
      <Link to={'/dashboard/students'}>
      <ListItemText primary="Students" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to={'/dashboard/teachers'}>
      <ListItemText primary="Teachers" />
      </Link>
    </ListItemButton>

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
  </React.Fragment>
);

export const supportListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to={'/dashboard/supoverview'}>
        <ListItemText primary="Dashboard" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <Link to={'/dashboard/createstudents'}>
      <ListItemText primary="Student Accounts" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <Link to={'/dashboard/createteachers'}>
      <ListItemText primary="Teacher Accounts" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <ManageAccountsIcon />
      </ListItemIcon>
      <Link to={'/dashboard/manageacc'}>
      <ListItemText primary="Manage Subjects" />
      </Link>
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <NoteIcon />
      </ListItemIcon>
      <Link to={'/dashboard/publishnotices'}>
      <ListItemText primary="Publish Notice" />
      </Link>
    </ListItemButton>

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