import React, { useState } from 'react';
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,} from '@mui/material';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';



const TeacherMNG = () => {
  const [open, setOpen] = useState(false);


  const handleAddTeacher = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleSubmit() {
    // Add logic to handle form submission
    console.log('Form submitted!');
    // Add any additional logic you need, such as making an API call to add a new Teacher.
    handleClose(); // Close the dialog after submission.
  }


  const dummyData = [
    { no: '1', tName: 'A.R.D. Pinsara', tSubject: 'Physical Edu.', tMobile: '0769379809', tAddress: 'No 13, Yakabe, Pugoda.', tEmail: 'deneth@mail.com', tClass: '1-A'  },
    { no: '2', tName: 'A.R.D. Pinsara', tSubject: 'Science', tMobile: '0769379809', tAddress: 'No 13, Yakabe, Pugoda.', tEmail: 'deneth@mail.com', tClass: '2-B'  },
    { no: '3', tName: 'A.R.D. Pinsara', tSubject: 'Mathematics', tMobile: '0769379809', tAddress: 'No 13, Yakabe, Pugoda.', tEmail: 'deneth@mail.com', tClass: '3-B'  },
    { no: '4', tName: 'A.R.D. Pinsara', tSubject: 'Sinhala', tMobile: '0769379809', tAddress: 'No 13, Yakabe, Pugoda.', tEmail: 'deneth@mail.com', tClass: '5-A'  },
    { no: '5', tName: 'A.R.D. Pinsara', tSubject: 'English', tMobile: '0769379809', tAddress: 'No 13, Yakabe, Pugoda.', tEmail: 'deneth@mail.com', tClass: '4-B'  },
  ];
  
  return (
          <div>

            <AdminWelcomeCard />
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2em' }}>Manage Teachers</h1>
             
            </div>
            
            {/* Adding New Teacher Part Start Here... */}
            <Button variant="contained" onClick={handleAddTeacher}>
              Add New Teacher
            </Button>
            

            <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: 'center' }}>Add New Teacher</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  Fill out the form below to add a new Teacher.
                </DialogContentText>

                {/* Form Start */}
                <div>
                  {/* Show Teacher ID - Auto Increment */}
                  {/* <TextField
                    id="outlined-read-only-input"
                    label="Teacher ID"
                    defaultValue="0001"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  /> */}

                  {/* Teacher Name Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Teacher Name with Initials"
                    placeholder="e.g., A.R.D. Pinsara"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Subject Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Subject"
                    placeholder="subject"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Teacher's Mobile Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Mobile No."
                    placeholder="e.g., 0769379809"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Teacher Password Input */}
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    placeholder="Enter new password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  {/* Teacher Password Re-Enter */}
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Re-enter Password"
                    type="password"
                    placeholder="Re-enter new password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />

                  

                  {/* Teacher Address Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Address"
                    placeholder="e.g., home, village, city"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  {/* Teacher Email Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    placeholder="e.g., 'deneth@mail.com'"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  
                  {/* Teacher's Incharge Class Input */}
                  <TextField
                    required
                    id="outlined-required"
                    label="Incharge Class"
                    placeholder="e.g., '1-A, 2-B'"
                  />
                </div>
                {/* Form Ends Here.. */}    

        </DialogContent>

            <DialogActions style={{ justifyContent: 'center' }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Add Teacher
              </Button>
            </DialogActions>
      </Dialog>
      {/* Adding New Teacher Part Ends Here... */}


  

    {/* Teachers Table Start Here... */}
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ whiteSpace: 'nowrap' }}>No</TableCell>
              <TableCell>Teacher Name with Initials</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>Subject</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>Mobile</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>Address</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>Email</TableCell>
              <TableCell>In-Charge Class (If it is)</TableCell>
              
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{row.no}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{row.tName}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{row.tSubject}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{row.tMobile}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{row.tAddress}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{row.tEmail}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{row.tClass}</TableCell>
                
                <TableCell style={{ whiteSpace: 'nowrap' }}>
                  <Button variant="contained" color="secondary" onClick={() => handleView(row)} sx={{ marginRight: 2 }}> Update </Button>
                  <Button variant="contained" color="error" onClick={() => handleView(row)}> Remove </Button>
                </TableCell>
              </TableRow>
            ))}
             {/* Add a row for total number of Teachers */}
            <TableRow>
            <TableCell colSpan={6} align="right">
              <strong>Total number of Teachers:</strong>
            </TableCell>
            <TableCell align="center">
              <strong>{dummyData.length}</strong>
            </TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* Teachers and class Table Ends Here... */}


    </div>
  );
};

export default TeacherMNG;