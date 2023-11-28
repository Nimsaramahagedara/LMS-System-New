import React, { useState } from 'react';
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,} from '@mui/material';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';


  const StudentMNG = () => {
  const [open, setOpen] = useState(false);

  const handleAddStudent = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Add logic to handle form submission
    console.log('Form submitted!');
    // Add any additional logic you need, such as making an API call to add a new student.
    handleClose(); // Close the dialog after submission.
  };

  // Dummy data for the table
  const dummyData = [
    { grade: '1', class: 'A', qty: 38 },
    { grade: '1', class: 'B', qty: 35 },
    { grade: '2', class: 'A', qty: 40 },
    { grade: '2', class: 'B', qty: 39 },
    { grade: '3', class: 'A', qty: 37 },
  ];
  

  return (
          <div>

            <AdminWelcomeCard />
            <div style={{ textAlign: 'center' }}>
              <h1>Manage Students</h1>
              <br />
            </div>
            
            {/* Adding New Student Part Start Here... */}
            <Button variant="contained" onClick={handleAddStudent}>
              Add New Student
            </Button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Fill out the form below to add a new student.
                </DialogContentText>

                {/* Form Start */}
                <div>
                  {/* Show Index Number - Auto Increment */}
                  <TextField
                    id="outlined-read-only-input"
                    label="Index Number"
                    defaultValue="22436"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Student Name Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Student Name with Initials"
                    placeholder="e.g., A.R.D. Pinsara"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Student DOB Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Date of Birth"
                    placeholder="DD/MM/YYYY"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Student Password Input */}
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    placeholder="Enter new password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Student Password Re-Enter */}
                  <TextField
                    id="outlined-password-input"
                    label="Re-enter Password"
                    type="password"
                    placeholder="Re-enter new password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Guardian Mobile Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Guardian's Mobile No."
                    placeholder="e.g., 0769379809"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Student Address Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Student Address"
                    placeholder="e.g., home, village, city"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                </div>
                {/* Form Ends Here.. */}    

        </DialogContent>

            <DialogActions style={{ justifyContent: 'center' }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Add Student
              </Button>
            </DialogActions>
      </Dialog>
      {/* Adding New Student Part Ends Here... */}


  

    {/* Table Start Here... */}
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Grade</TableCell>
          <TableCell>Class</TableCell>
          <TableCell>QTY of Students</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dummyData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.grade}</TableCell>
            <TableCell>{row.class}</TableCell>
            <TableCell>{row.qty}</TableCell>
            <TableCell>
              <Button variant="contained" color="primary">
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  {/* Table Ends Here... */}

  </div>
  );
};

export default StudentMNG;
