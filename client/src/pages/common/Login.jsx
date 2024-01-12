import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiUrl } from '../../utils/Constants';


export default function Login() {
  const [role, setRole] = useState(1);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [buttonDisable, setBtnDisabled] = useState(false)


  const handleSubmit = async (event) => {
  
    event.preventDefault();
    setBtnDisabled(true);
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };
    try {
      const isLoggedin = await axios.post(`${apiUrl}/login`,payload);
      if(isLoggedin){
        console.log(isLoggedin);
        Cookies.set('firstName', isLoggedin.data.firstName);

        // This is only for the PRIVATE MSG SHOW
        if(isLoggedin.data.pvt == true){
          Cookies.set('pvt', 'true');
        }
        login(isLoggedin.data.userRole, isLoggedin.data.token)

        switch (isLoggedin.data.userRole) {
          case 'admin': //Admin
            toast.success('Login Success as an Admin')
            navigate('/dashboard');
            break;
          case 'student': //Student
            toast.success('Login Success as a Student')
            navigate('/portal');
            break;
          case 'support': //Support
          toast.success('Login Success as a Support')
            navigate('/dashboard/supoverview');
            break;
          case 'teacher': //Teacher
          toast.success('Login Success as a Teacher')
            navigate('/dashboard/overview');
            break;
          case 'parent': //Parent
            toast.success('Login Success as a Parent')
              navigate('/dashboard/paroverview');
              break;
        }
        
      }
    } catch (error) {
      if(error.message){
        toast.error(error.message);
      }
      toast.error(error.response.data.message);
    }finally{
      setBtnDisabled(false);
    }
    


  };

  // const handleRoleChange = (e) => {
  //   setRole(e.target.value);
  // }

  return (
    <Container component="main" maxWidth="xs" className='shadow-lg bg-white pt-1 pb-5'>
      <CssBaseline />
      <Box
        sx={{
          padding: '20px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Logo />
        <Typography variant='h5' margin={'10px 0px'}>
          Dharmapala Knowledge Base
        </Typography>
        <Typography variant='subtitle2'>
          Don't have an account?
          <Link href="#" variant="body2">
            {" Contact Support Team"}
          </Link>
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Age"
                onChange={handleRoleChange}
              >
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={4}>Teacher</MenuItem>
                <MenuItem value={2}>Student</MenuItem>
                <MenuItem value={3}>Support Team</MenuItem>
              </Select>
            </FormControl>
          </Box> */}
          <Box textAlign={'right'}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={buttonDisable}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}