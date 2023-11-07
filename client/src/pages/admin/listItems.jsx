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
import { Link } from 'react-router-dom';

export const teacherListItems = (
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
        <ShoppingCartIcon />
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
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Other" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Other" />
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
        <ShoppingCartIcon />
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
      <Link to={'/dashboard'}>
        <ListItemText primary="Overview" />
      </Link>

    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <Link to={'/dashboard/students'}>
      <ListItemText primary="Subjects" />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to={'/dashboard/teachers'}>
      <ListItemText primary="Classes" />
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
      <Link to={'/dashboard'}>
        <ListItemText primary="Dashboard" />
      </Link>

    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
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
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);