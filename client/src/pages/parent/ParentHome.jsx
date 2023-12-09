import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import SimpleCard from '../../components/SimpleCard'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SchoolIcon from '@mui/icons-material/School';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ParentWelcomeCard from '../../components/ParentWelcomeCard';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PieChart4 from '../../components/PieChart4';
import BarChart from '../../components/AdminBarChart';
import AdminSimpleTable from '../../components/AdminSimpleTable';
import { getTerm } from '../../utils/usefulFunctions';



const ParentHome = () => {
  const date = new Date();

  return (
    <Container maxWidth={'800px'} >
      <ParentWelcomeCard/>
      
      
        
    
           
    </Container>
  
  )
}

export default ParentHome