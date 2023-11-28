import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import SimpleCard from '../../components/SimpleCard'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SchoolIcon from '@mui/icons-material/School';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WelcomeCard from '../../components/WelcomeCard';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PieChart3 from '../../components/PieChart3';
import SimpleTable from '../../components/SimpleTable';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SpOverview = () => {
  const date = new Date();

  return (
    <Container maxWidth={'800px'} >
      <WelcomeCard/>
      <Box component={'div'} className='flex justify-between items-center'>
        <SimpleCard name={'Current Term'} to={''} count={'1/3'} icon={<DateRangeIcon color='primary' fontSize='large'/>}/>
        <SimpleCard name={'Students'} to={'manageacc'} count={200} icon={<DirectionsWalkIcon color='secondary' fontSize='large'/>}/>
        <SimpleCard name={'Teachers'} to={'manageacc'} count={20} icon={<SchoolIcon color='error' fontSize='large'/>}/>
        <SimpleCard name={'Subjects'} to={'manageacc'} count={20} icon={<AutoStoriesIcon color='warning' fontSize='large'/>}/>
      </Box>

      <Grid container spacing={2} marginTop={1}>
      <Grid item xs={8}>
          <Item sx={{height:'50vh', overflowY:'scroll'}}>
            <Typography variant='h6'>Avtivities</Typography>
            <SimpleTable/>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <PieChart3/>
          </Item>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SpOverview