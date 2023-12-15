import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, RadioGroup, FormControlLabel, Radio, } from '@mui/material';
import WelcomeCard from '../../components/WelcomeCard';
import DateInput from '../../components/DateInput';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/Constants';


const CreateStudentAcc = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const [data, setData] = useState('');
  const [AllClasses, setAllClasses] = useState([]);
  const [refresh, setRefresh] = useState(false);

 //UPDATE SUPPORT FORM DATA
 const [createStudentData, setCreateStudent] = useState({
  regNo: 0,
  firstName: "",
  lastName: "",
  gender: "male",
  contactNo: 0,
  dob: '',
  parentId: "",
  parentEmail: '',
  email: "",
  password: "",
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
  setViewOpen(true);
};

const refreshPage = ()=>{
      setRefresh((prev)=> !prev)
}





const handleSubmit = async () => {
  try {
    const result = await authAxios.post(`${apiUrl}/student/create-student`, createStudentData);
    if (result) {
      toast.success('Account Created Successfully');
      handleClose();
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


useEffect(() => {
  const getAllClasses = async () => {
    try {
      const result = await authAxios.get(`${apiUrl}/class`);
      if (result) {
        setAllClasses(result.data);
      } else {
        toast.error('Class Data Not Available');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  getAllClasses();
}, [refresh]);




    return (
      <div>
  
        <WelcomeCard />
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
  
              {/* Student First Name Input */}
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
  
              {/* Student Last Name Input */}
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

              {/* Student Gender Selection */}
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={createStudentData.gender}
                onChange={(e) => handleCreateChange('gender', e.target.value)}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>


              {/* Student Contact Number Input */}
              <TextField
                required
                id="outlined-required"
                label="Student Contact Number"
                placeholder="e.g., 0769379809"
                fullWidth
                margin="normal"
                variant="outlined"
                value={createStudentData.contactNo}
                onChange={e => handleCreateChange('contactNo', e.target.value)}
  
              />

  
              {/* Student DOB Input */}
              <DateInput
                label='Date of birth'
                value={createStudentData.dob}
                onChange={e => handleCreateChange('dob', e)}
              />



              {/* Student Parent's ID Input */}
              <TextField
                required
                id="outlined-required"
                label="Student's Parent ID'"
                fullWidth
                margin="normal"
                variant="outlined"
                value={createStudentData.parentId}
                onChange={e => handleCreateChange('parentId', e.target.value)}
  
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

  
              {/* Role Input */}
              <TextField
                required
                id="outlined-required"
                label="User Role Selection"
                placeholder="student/teacher/parent/admin/support"
                fullWidth
                margin="normal"
                variant="outlined"
                value={createStudentData.role}
                onChange={e => handleCreateChange('role', e.target.value)}
  
              />
  
              <Select
                fullWidth 
                placeholder='class Id'
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
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllClasses.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.regNo}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
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
      {/* ... Existing code ... */}
    </div>
  );
};

export default CreateStudentAcc;
