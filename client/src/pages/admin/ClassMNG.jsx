import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, Typography, MenuItem, colors, } from '@mui/material';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';
import DateInput from '../../components/DateInput';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import SubjectMNG from './SubjectMNG';
import Loader from '../../components/Loader/Loader';

const ClassMNG = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const [viewData, setViewData] = useState([]);
  const [selectedClassTeacher, setClassTeachr] = useState('');
  const [AllClasses, setAllClasses] = useState([]);
  const [refresh, changeRefresh] = useState(false);
  const [allTeachers, setAllTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //UPDATE SUPPORT FORM DATA
  const [createClassData, setCreateClassData] = useState({
    grade: '',
    subClass: 'A',
    students: [null],
    ownedBy: null,
    subjects: [null]
  });

  //ACCOUNT UPDATE FORM VALUES HANDLER
  const handleCreateClassData = (field, value) => {
    setCreateClassData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleClassTeacherChange = (e) => {
    setClassTeachr(e.target.value)
  }

  const handleCreateClass = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };
  const updateClassTeacher = async () => {
    try {
      const data = {
        ownedBy: selectedClassTeacher
      }
      const result = await authAxios.put(`${apiUrl}/class/assign-teacher/${selectedClass._id}`, data)

      console.log(result.data);
      toast.success(result.data.message);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  const getStudentsInClass = async (id) => {
    const inClassStudents = await authAxios.get(`${apiUrl}/class/get-students/${id}`);
    console.log(inClassStudents.data);
    setViewData(inClassStudents.data);
  }

  const handleView = async (row) => {
    setSelectedClass(row);
    if (row.ownedBy) {
      setClassTeachr(row.ownedBy._id)
    } else {
      setClassTeachr(null);
    }

    await getStudentsInClass(row._id);
    setViewOpen(true);
  };

  const handleCreateClassSubmit = async () => {
    try {
      const isClass = await authAxios.post(`${apiUrl}/class/create`, createClassData);
      if (isClass) {
        toast.success('Class Created SuccessFully');
        changeRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const getAllClasses = async () => {
    try {
      const allClasses = await authAxios.get(`${apiUrl}/class`);
      setAllClasses(allClasses.data);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const getAllTeachers = async () => {
    try {
      const allT = await authAxios.get(`${apiUrl}/admin/get-all-teachers`);
      setAllTeachers(allT.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  useEffect(() => {
    getAllClasses();
    getAllTeachers();
  }, [refresh])


  return (
    <div>

      <AdminWelcomeCard />
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2em' }}>Manage Students Classes</h1>
      </div>

      {/* Adding New Student Part Start Here... */}
      <Button variant="contained" onClick={handleCreateClass}>
        Create New Class
      </Button>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>Create New Class</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Fill out the form below to Create a new Class.
          </DialogContentText>

          {/* Form Start */}
          <div>

            {/* Grade Input */}
            <TextField
              required
              id="outlined-required"
              type='number'
              label="Grade"
              placeholder="e.g., 10"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={e => handleCreateClassData('grade', e.target.value)}
            />

            {/* Sub Class Input */}
            <TextField
              required
              id="outlined-required"
              label="Sub Class"
              placeholder="e.g., A / B"
              fullWidth
              margin="normal"
              variant="outlined"
              inputProps={{
                maxLength: 1,
              }}
              onChange={e => handleCreateClassData('subClass', e.target.value)}
            />
          </div>
          {/* Form Ends Here.. */}

        </DialogContent>

        <DialogActions style={{ justifyContent: 'center' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateClassSubmit} variant="contained" color="primary">
            Create Class
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
          {
            !isLoading ? <TableBody>
            {AllClasses.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.grade}</TableCell>
                <TableCell>{row.subClass}</TableCell>
                <TableCell>{row.ownedBy ? (row.ownedBy.firstName + ' ' + row.ownedBy.lastName) : 'Not Assigned'}</TableCell>
                <TableCell>{row.studentCount}</TableCell>
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
          </TableBody> : <Loader/>
}
        </Table>
      </TableContainer>
      {/* Students and class Table Ends Here... */}

      {/* SECOND SECTION */}
      {
        AllClasses && <SubjectMNG ClassList={AllClasses}/>
      }
      

      {/* View Class Details Dialog Table Starts here.. */}
      <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="xl">
        <DialogTitle sx={{ textAlign: 'center' }}>
          Class Details - {selectedClass.grade} {selectedClass.subClass}
        </DialogTitle>
        <Typography>Class Teacher</Typography>
        <Select
          value={selectedClassTeacher}
          onChange={handleClassTeacherChange}
          label="Class Teacher"
          color='warning'
          variant="outlined"
        >
          {allTeachers.map((teac, index) => (
            <MenuItem value={teac._id} key={index}>{teac.firstName + ' ' + teac.lastName}</MenuItem>
          ))}
        </Select>
        <Button variant='contained' color='warning' onClick={() => updateClassTeacher()}>Update Class Teacher</Button>
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
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{index}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.regNo}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.firstName}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.dob}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.contactNo}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{student.address}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>
                      <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                        Update
                      </Button>
                      <Button variant="contained" color="error">
                        Remove
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

export default ClassMNG;
