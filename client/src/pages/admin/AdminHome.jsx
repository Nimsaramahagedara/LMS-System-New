import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SimpleCard from '../../components/SimpleCard'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SchoolIcon from '@mui/icons-material/School';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PieChart4 from '../../components/PieChart4';
import BarChart from '../../components/AdminBarChart';
import AdminSimpleTable from '../../components/AdminSimpleTable';
import { getTerm } from '../../utils/usefulFunctions';
import PieChart2 from '../../components/PieChart2';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const AdminHome = () => {
  const date = new Date();
  const [overview, setOverview] = useState({});
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    const getOverview = async()=>{
      const data =  await authAxios.get(`${apiUrl}/admin/get-overview`);
      setOverview(data.data);
      setIsLoading(false);
    }
    getOverview();
  },[])

  return (
    <>
    {
      !isLoading ? (<Container maxWidth={'800px'} >
      <AdminWelcomeCard/>
      <Box component={'div'} className='flex justify-between items-center'>
        <SimpleCard name={'Current Term'} to={''} count={`${getTerm()}/3`} icon={<DateRangeIcon color='primary' fontSize='large'/>}/>
        <SimpleCard name={'Subjects'} to={'manageacc'} count={overview.subjectCount} icon={<AutoStoriesIcon color='warning' fontSize='large'/>}/>
        <SimpleCard name={'Students'} to={'manageacc'} count={overview.studentCount} icon={<DirectionsWalkIcon color='secondary' fontSize='large'/>}/>
        <SimpleCard name={'Teachers'} to={'manageacc'} count={overview.teacherCount} icon={<SchoolIcon color='error' fontSize='large'/>}/>
      </Box>

      <Grid container spacing={2} marginTop={1}>
      <Grid item xs={8}>
          <Item sx={{height:'55vh'}}>
            <Typography variant='h8'>Progress Of All Teachers</Typography>
            <BarChart/>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Typography>Student Diversity</Typography>
            <PieChart2 value1={overview.maleCount} value2={overview.femaleCount}/>
            </Item>
          </Grid>
      </Grid>
           
    </Container>) : (<Loader/>)
    }

    </>
  
  )
}

export default AdminHome