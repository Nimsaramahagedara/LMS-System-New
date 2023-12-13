import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';
import React, { useState, useEffect } from 'react';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';

const TeacherMNG = () => {
  const [notices, setNotices] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [createTeacherFormData, setTeacherFormData] = useState({
    regNo: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    dob: '',
    contactNo: '',
    gender: ''
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/get-all-teachers`);
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleCreateChange = (field, value) => {
    setTeacherFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleAddTeacher = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const refreshPage = () => {
    setRefresh((prev) => !prev)
  }

  const handleTeacherSubmit = async () => {
    try {
      const result = await fetch(`${apiUrl}/admin/create-teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createTeacherFormData),
      });
      const data = await result.json();

      if (result.ok) {
        console.log('Teacher created successfully:', data);
        toast.success(data.message);
        refreshPage();
        setOpen(false);
        handleClose();
      } else {
        console.error('Error creating teacher:', data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
      toast.error('An error occurred while creating the teacher.');
    }
  };

  const handleDeleteTeacher = async (email) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/admin/delete-teacher/${email}`);

      if (result) {
        toast.warning('Account Deleted Success');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  return (
    <div>
      <AdminWelcomeCard />
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2em' }}>Manage Teachers</h1>
      </div>

      <Button variant="contained" onClick={handleAddTeacher}>
        Add New Teacher
      </Button>

      <Dialog open={open} onClose={handleClose} sx={{ border: '2px solid #ccc' }}>
        <DialogTitle sx={{ textAlign: 'center' }}>Add New Teacher</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Fill out the form below to add a new Teacher.
          </DialogContentText>

          <div>
            <TextField
              id="outlined-read-only-input"
              label="Teacher ID"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('regNo', e.target.value)}
              value={createTeacherFormData.regNo}
            />

            <TextField
              required
              id="outlined-required"
              label="First Name"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('firstName', e.target.value)}
              value={createTeacherFormData.firstName}
            />

            <TextField
              required
              id="outlined-required"
              label="Last Name"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('lastName', e.target.value)}
              value={createTeacherFormData.lastName}
            />

            <TextField
              required
              id="outlined-required"
              type='date'
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('dob', e.target.value)}
              value={createTeacherFormData.dob}
            />

            <TextField
              required
              id="outlined-password-input"
              label="Email"
              type="email"
              placeholder="Enter new password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('email', e.target.value)}
              value={createTeacherFormData.email}
            />

            <TextField
              required
              id="outlined-password-input"
              label="Password"
              placeholder="Re-enter new password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('password', e.target.value)}
              value={createTeacherFormData.password}
            />

            <TextField
              required
              id="outlined-required"
              label="Address"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('address', e.target.value)}
              value={createTeacherFormData.address}
            />

            <TextField
              required
              id="outlined-required"
              label="Gender"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('gender', e.target.value)}
              value={createTeacherFormData.gender}
            />

            <TextField
              required
              id="outlined-required"
              label="Contact No"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => handleCreateChange('contactNo', e.target.value)}
              value={createTeacherFormData.contactNo}
            />
          </div>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleTeacherSubmit} variant="contained" color="primary">
              Add Teacher
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.regNo}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.contactNo}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleView(row)} sx={{ marginRight: 2 }}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteTeacher(row.email)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={6} align="right">
                <strong>Total number of Teachers:</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{notices.length}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TeacherMNG;