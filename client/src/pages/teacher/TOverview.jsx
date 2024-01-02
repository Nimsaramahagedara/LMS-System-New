import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SimpleCard from '../../components/SimpleCard'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import GradingIcon from '@mui/icons-material/Grading';
import ContactsIcon from '@mui/icons-material/ImportContacts';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PieChart3 from '../../components/PieChart3';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WelcomeCardTeacher from '../../components/WelcomeCardTeacher';
import LineChartTeacher from '../../components/LineChartTeacher';
import NextClassTeacher from '../../components/NextClassTeacher';
import ActiveAssignments from '../../components/ActiveAssignments';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';
import { countAcademicDays } from '../../utils/usefulFunctions';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TOverview = () => {
  const date = new Date();
  const [overview, setOverview] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [academicDays, setDays] = useState('');

  const getOverview = async()=>{
    try {
      const data = await authAxios.get(`${apiUrl}/teacher/get-overview`);
      setOverview(data.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(()=>{
    getOverview();
    setDays(countAcademicDays())
  },[])

  return (
    <Container maxWidth={'800px'} >
      {
        isLoading ? <Loader/> : <></>
      }
      <WelcomeCardTeacher/>
      <Box component={'div'} className='flex justify-between items-center'>
        <SimpleCard name={'Attendance'} to={''} count={30} icon={<GradingIcon color='primary' fontSize='large'/>}/>
        <SimpleCard name={'Subjects'} to={'manageacc'} count={9} icon={<ContactsIcon color='error' fontSize='large'/>}/>
        <SimpleCard name={'Fasility Fee'} to={'manageacc'} count={25} icon={<AccountBalanceWalletIcon color='secondary' fontSize='large'/>}/>
        <SimpleCard name={'Owned Class'} to={'manageacc'} count={overview.className || 'Loading'} icon={<MeetingRoomIcon color='warning' fontSize='large'/>}/>
      </Box>

      <Grid container spacing={2} marginTop={1}>
      <Grid item xs={8}>
          <Item sx={{height:'50vh'}}>
            <Typography variant='h6'>Attendance</Typography>
            <LineChartTeacher/>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{height:'20vh'}}>
            <NextClassTeacher count={academicDays}/>
          </Item>
          <br></br>
          <Item sx={{height:'16vh'}}>
            <ActiveAssignments/>
          </Item>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TOverview