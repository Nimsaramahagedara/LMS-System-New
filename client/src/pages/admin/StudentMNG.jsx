import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, RadioGroup, FormControlLabel, Radio, } from '@mui/material';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';
import DateInput from '../../components/DateInput';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/Constants';



const StudentMNG = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const [viewData, setViewData] = useState([]);
  const [AllClasses, setAllClasses] = useState([]);
  const [refresh, changeRefresh] = useState(false);

  //UPDATE SUPPORT FORM DATA
  const [createStudentData, setCreateStudent] = useState({
    regNo: 0,
    firstName: "",
    lastName: "",
    gender: "male",
    contactNo: 0,
    dob: '',
    parentId: null,
    email: "",
    password: "",
    parentEmail: '',
    role: "student",
    classId: '',
    ownedClass: ''
  });

  //HANDLE THE ACCOUNT CREATION FIELDS
  const handleCreateChange = (field, value) => {
    setCreateStudent((prevData) => ({ ...prevData, [field]: value }));
  };

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

  const handleSubmit =async () => {
    try {
      const result = await authAxios.post(`${apiUrl}/student/create-student`, createStudentData);
      if(result){
        toast.success('Account Created Successfully')
        handleClose(); 
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    
  };


  useEffect(() => {
    const getAllClasses = async () => {
      try {
        const allClasses = await authAxios.get(`${apiUrl}/class`);
        setAllClasses(allClasses.data);
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    getAllClasses();
  }, [refresh])


  return (
    <div>

      <AdminWelcomeCard />
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2em' }}>Manage Students</h1>
      </div>

      {/* Adding New Student Part Start Here... */}
      <Button variant="contained" onClick={handleAddStudent}>
        Add New Student
      </Button>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Add New Student</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Fill out the form below to add a new student.
          </DialogContentText>

          {/* Form Start */}
          <div>
            {/* Show Index Number - Auto Increment */}
            {/* <TextField
              id="outlined-read-only-input"
              label="Index Number"
              type='Number'
              fullWidth
              margin="normal"
              variant="outlined"
              value={createStudentData.regNo}
              onChange={e => handleCreateChange('regNo', e.target.value)}
            /> */}

            {/* Student Name Input */}
            <TextField
              required
              id="outlined-required"
              label="Student First Name"
              placeholder="e.g., Deneth"
              fullWidth
              margin="normal"
              variant="outlined"
              value={createStudentData.firstName}
              onChange={e => handleCreateChange('firstName', e.target.value)}

            />

            {/* Student Name Input */}
            <TextField
              required
              id="outlined-required"
              label="Student Last Name"
              placeholder="e.g., Pinsara"
              fullWidth
              margin="normal"
              variant="outlined"
              value={createStudentData.lastName}
              onChange={e => handleCreateChange('lastName', e.target.value)}

            />

            {/* Student DOB Input */}
            <DateInput
              label='Date of birth'
              value={createStudentData.dob}
              onChange={e => handleCreateChange('dob', e)}
            />

             {/* Student Email Input */}
             <TextField
              required
              id="outlined-required"
              label="Student Email"
              placeholder="e.g., 'deneth@mail.com'"
              fullWidth
              margin="normal"
              variant="outlined"
              value={createStudentData.email}
              onChange={e => handleCreateChange('email', e.target.value)}

            />

            {/* Student Password Input */}
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              placeholder="Enter new password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={createStudentData.password}
              onChange={e => handleCreateChange('password', e.target.value)}
            />

            {/* Student Password Re-Enter */}
            <TextField
              required
              id="outlined-re-password-input"
              label="Re-enter Password"
              type="password"
              placeholder="Re-enter new password"
              fullWidth
              margin="normal"
              variant="outlined"
            />

            {/* Guardian Email Input */}
            <TextField
              required
              id="outlined-required"
              label="Guardian's Email"
              placeholder="e.g., guradian@gmail.com"
              fullWidth
              margin="normal"
              variant="outlined"
              value={createStudentData.parentEmail}
              onChange={e => handleCreateChange('parentEmail', e.target.value)}

            />

            {/* Student Address Input */}
            <TextField
              required
              id="outlined-required"
              label="Address"
              placeholder="e.g., home, village, city"
              fullWidth
              margin="normal"
              variant="outlined"
              value={createStudentData.address}
              onChange={e => handleCreateChange('address', e.target.value)}

            />

            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={createStudentData.gender}
              onChange={(e) => handleCreateChange('gender', e.target.value)}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>

            <Select
              fullWidth
              placeholder='Grade'
              value={createStudentData.classId}
              onChange={e => handleCreateChange('classId', e.target.value)}
            >
              {AllClasses.map((eachClass, index) => (
                <MenuItem value={eachClass._id} key={index}>{eachClass.grade + ' - ' + eachClass.subClass}</MenuItem>
              ))}

            </Select>
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




      {/* Students and class Table Start Here... */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Grade</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Class Teacher</TableCell>
              <TableCell>QTY of Students</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllClasses.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.grade}</TableCell>
                <TableCell>{row.subClass}</TableCell>
                <TableCell>{row.ownedBy ? (row.ownedBy.firstName + ' ' + row.ownedBy.lastName) : 'Not Assigned'}</TableCell>
                <TableCell>{row.students.length} /40</TableCell>
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
          Class Details - {selectedClass.grade} {selectedClass.subClass}
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
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Add a row for total number of students */}
                <TableRow>
                  <TableCell colSpan={6} align="right">
                    <strong>Total number of students:</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>{viewData.length}</strong>
                  </TableCell>
                </TableRow>
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

export default StudentMNG;
