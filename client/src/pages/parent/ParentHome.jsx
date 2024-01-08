import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  styled,
  Button,
} from '@mui/material';

import ParentWelcomeCard from '../../components/ParentWelcomeCard';
import BarChart from '../../components/ParentBarChart';

// Define the styled Item component
const Item = styled(Paper)(({ theme }) => ({
  height: '55vh',
  padding: theme.spacing(2),
  textAlign: 'center',
}));

// Style for the button container
const ButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '40%',
  right: theme.spacing(40),
  transform: 'translateY(-100%)',
}));

const ParentHome = () => {
  // Add an onClick handler for the Button
  // const handleViewChildDetails = () => {
  //   // Implement the logic to view child details
  //   console.log('View My Child Details');
  // };


  return (
    <Container maxWidth={'800px'} position="relative">
      <ParentWelcomeCard />

      <Grid container spacing={0} marginTop={1}>
        <Grid item xs={8}>
          <Item>
            <Typography variant='h6'>Attendance of Students</Typography>
            <BarChart />
          </Item>
        </Grid>
      </Grid>

      {/* Button to view my Child details as a dialog box*/}
      {/* <ButtonContainer>
        <Button variant="contained" onClick={handleViewChildDetails}>
          View My Child
        </Button>
      </ButtonContainer> */}
    </Container>


  );
};

export default ParentHome;
