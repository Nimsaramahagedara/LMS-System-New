import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, } from '@mui/material';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';
import SimpleCard from '../../components/SimpleCard';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PieChart3 from '../../components/PieChart3';


const CreateTeacherAcc = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const [viewData, setViewData] = useState([]);

  const handleAddStudent = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  const handleView = (row) => {
    setSelectedClass(row);
    setViewData(getDummyStudentData()); // Replace with your logic to fetch student data for the selected class
    setViewOpen(true);
  };

  const getDummyStudentData = () => {
    // Dummy data for the students in a class
    return [
      { number: 1, index: 22436, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
      { number: 2, index: 22437, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
      { number: 3, index: 22438, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
      { number: 4, index: 22439, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
      { number: 5, index: 22440, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
      // Add more dummy data as needed
    ];
  };

  const handleSubmit = () => {
    // Add logic to handle form submission
    console.log('Form submitted!');
    // Add any additional logic you need, such as making an API call to add a new student.
    handleClose(); // Close the dialog after submission.
  };


  const dummyData = [
    { regNo: '1', teacher: 'Mrs.P.G. Kusuma',spec: 'Mathematics', grade:'1', class: 'A' },
    { regNo: '1', teacher: 'Mr.W.M. Sugath',spec: 'Science', grade:'2', class: 'B' },
    { regNo: '2', teacher: 'Mrs.A.R. Kumari',spec: 'Art', grade:'', class: '' },
    { regNo: '2', teacher: 'Mr.B.D. Saman',spec: 'Music', grade:'9', class: 'B' },
    { regNo: '3', teacher: 'Mr.S.M.W. Samarakoon',spec: 'Geography', grade:'11', class: 'A' },
  ];

  const TeacherStudentdata= [
    { id: 0, value: 10, label: 'Teachers' },
    { id: 1, value: 15, label: 'Subjects' },
    { id: 2, value: 20, label: 'Students' },
  ]


  return (
    <div>
      <div className='text-center'>
        <h1>Manage Teachers</h1>
        <br />
      </div>

      <Box component={'div'} className='flex justify-start gap-4 mb-5 items-center'>
        <SimpleCard name={'Current Term'} to={''} count={'1/3'} icon={<DateRangeIcon color='primary' fontSize='large' />} />
        <SimpleCard name={'Students'} to={'manageacc'} count={200} icon={<DirectionsWalkIcon color='secondary' fontSize='large' />} />
        <SimpleCard name={'Subjects'} to={'manageacc'} count={20} icon={<AutoStoriesIcon color='warning' fontSize='large' />} />
        <PieChart3 data={TeacherStudentdata}/>
      </Box>
      

      {/* Adding New Student Part Start Here... */}
      <Button variant="contained" onClick={handleAddStudent}>
        Create Teacher Account
      </Button>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Create Teacher Account</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Fill out the form below to add a new Teacher.
          </DialogContentText>

          {/* Form Start */}
          <div>
            {/* Show Index Number - Auto Increment */}
            <TextField
              id="outlined-read-only-input"
              label="Registration Number"
              defaultValue="22436"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            {/*Name Input */}
            <TextField
              required
              id="outlined-required"
              label="Name with Initials"
              name='name'
              type='text'
              placeholder="e.g., A.R.D. Pinsara"
              fullWidth
              margin="normal"
              variant="outlined"
            />
            {/*Email Input */}
            <TextField
              required
              id="outlined-required"
              label="Email"
              placeholder="eg: example@email.com"
              fullWidth
              name='email'
              margin="normal"
              variant="outlined"
              type='email'
            />
            {/*DOB Input */}
            <TextField
              required
              id="outlined-required"
              label="Date of Birth"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="normal"
              variant="outlined"
              autoComplete={false}
              type='date'
            />

            {/* Password Input */}
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

            {/*Password Re-Enter */}
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

            {/* Subject Mobile Input */}
            <TextField
              required
              id="outlined-required"
              label="Speciality"
              placeholder="e.g., Mathematics"
              fullWidth
              margin="normal"
              variant="outlined"
            />

            {/*Address Input */}
            <TextField
              required
              id="outlined-required"
              label="Student Address"
              placeholder="e.g., home, village, city"
              fullWidth
              margin="normal"
              variant="outlined"
            />

            {/* Class In charge*/}
            <TextField
              required
              id="outlined-number"
              label="Class in Charge"
              type="number"
              sx={{
                width:'200px'
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: 1,
                max: 11,
              }}
            />
            {/*Class Input */}
            <TextField
              required
              id="outlined-required"
              label="Sub Class"
              placeholder="e.g., A/B"
            />
          </div>
          {/* Form Ends Here.. */}

        </DialogContent>

        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create Teacher Account
          </Button>
        </DialogActions>
      </Dialog>
      {/* Adding New Student Part Ends Here... */}




      {/* Students and class Table Start Here... */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reg No</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Speciality</TableCell>
              <TableCell>Class in Charge</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.regNo}</TableCell>
                <TableCell>{row.teacher}</TableCell>
                <TableCell>{row.spec}</TableCell>
                <TableCell>{row.grade + '-' + row.class}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleView(row)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Students and class Table Ends Here... */}

      {/* View Class Details Dialog Table Starts here.. */}
      <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="xl">
        <DialogTitle sx={{ textAlign: 'center' }}>
          Class Details - {selectedClass.grade} {selectedClass.class}
        </DialogTitle>
        <DialogContent>
          <TableContainer style={{ marginTop: '20px' }} sx={{ maxWidth: '100%' }}>
            <Table sx={{ maxWidth: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Index No</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {viewData.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.number}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.index}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.name}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.dob}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.mobile}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.address}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>
                      <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleViewClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTeacherAcc;
