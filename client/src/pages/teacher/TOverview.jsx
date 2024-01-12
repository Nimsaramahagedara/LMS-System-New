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
  const [balance, setBalance] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [academicDays, setDays] = useState('');
  const [subjects, setSubjects] = useState(0);

  const getOverview = async()=>{
    try {
      const data = await authAxios.get(`${apiUrl}/teacher/get-overview`);
      const res = await authAxios.get(`${apiUrl}/pay/balance`);
      const sub = await authAxios.get(`${apiUrl}/teacher/my-subjects`);
      setOverview(data.data);
      setBalance(res.data);
      setSubjects(sub.data.length);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(()=>{
    getOverview();
    getAttendance();
    setDays(countAcademicDays())
  },[])

  const getAttendance = async () => {
    try {
      const result = await authAxios.get(`${apiUrl}/teacher/attendance`);
      if (result && result.data.attendanceData.length > 0) {
        // Get the latest dataset
        const latestData = result.data.attendanceData[result.data.attendanceData.length - 1];
  
        // Get the length of attendedStudents array in the latest dataset
        const attendedStudentsLength = latestData.attendedStudents.length;

        setAttendance(attendedStudentsLength);
      } else {
        toast.error('Attendance Data Not Available');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  
  return (
    <Container maxWidth={'800px'} >
      {
        isLoading ? <Loader/> : <></>
      }
      <WelcomeCardTeacher/>
      <Box component={'div'} className='flex justify-between items-center'>
        <SimpleCard name={'Attendance'} to={'attendance'} count={attendance} icon={<GradingIcon color='primary' fontSize='large'/>}/>
        <SimpleCard name={'Subjects'} to={'subject'} count={subjects} icon={<ContactsIcon color='error' fontSize='large'/>}/>
        <SimpleCard name={'Fasility Fee'} to={'overview'} count={balance.balance} icon={<AccountBalanceWalletIcon color='secondary' fontSize='large'/>}/>
        <SimpleCard name={'Owned Class'} to={'overview'} count={overview.className || 'Loading'} icon={<MeetingRoomIcon color='warning' fontSize='large'/>}/>
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