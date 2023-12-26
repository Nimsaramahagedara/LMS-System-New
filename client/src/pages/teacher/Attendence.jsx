import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import TeacherAttendanceDateCard from '../../components/TeacherAttendanceDateCard';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
} from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';


const Attendance = () => {

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const refreshPage = () => {
    setRefresh((prev) => !prev)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getStudentList = async () => {
      try {
        const result = await authAxios.get(`${apiUrl}/teacher/get-students-in-class`);
        if (result) {
          setStudents(result.data);
        } else {
          toast.error('Data Not Available');
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getStudentList();
  }, [refresh]);


  const handleCheckboxChange = (studentId) => {
    const isSelected = selectedStudents.includes(studentId);

    if (isSelected) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleSubmit = async () => {
    // Send selected students to the backend
    try {
      const result = await authAxios.post(`${apiUrl}/teacher/submit-attendance`, { selectedStudents });
      if (result) {
        toast.success('Successfully');
        handleClose();
        getAttendance();
      } // Log the response from the backend
    } catch (error) {
      toast.error(error);
    }
  };

  const getAttendance = async () => {
    try {
      const result = await authAxios.get(`${apiUrl}/teacher/attendance`);
      if (result) {
        setAttendance(result.data.attendanceData);
        console.log(result.data.attendanceData);
      } else {
        toast.error('Data Not Available');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const deleteAttendance = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/teacher/delete-attendance/${id}`);

      if (result) {
        toast.warning('Attendance Deleted Successfully');
        getAttendance();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAttendance();
  }, [refresh]);

  return (
    <div>
      <TeacherAttendanceDateCard />

      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Mark Attendance
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': {
                  m: 1,
                  width: 500,
                  maxWidth: '100%',
                },
                minWidth: 300,
              }}
              noValidate
              autoComplete="off"
            >
              {students.map((student) => (
                <div key={student._id}>
                  <FormControlLabel
                    label={`${student.firstName} ${student.lastName}`}
                    control={<Checkbox />}
                    onChange={() => handleCheckboxChange(student._id)}
                    checked={selectedStudents.includes(student._id)}
                  />
                </div>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit} variant='outlined'>Submit</Button>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>


      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Count</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.attendedStudents.length}</TableCell>
                <TableCell>
                  <Button variant="outlined"
                    startIcon={<VisibilityIcon />}
                    color="secondary"
                    onClick={handleClickOpen2}
                    sx={{ marginRight: 2 }}
                  > View </Button>
                  <Dialog open={open2} onClose={handleClose2}>
                    <DialogTitle>{row.date}</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': {
                            m: 1,
                            width: 500,
                            maxWidth: '100%',
                          },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                          <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Reg No</TableCell>
                                <TableCell>Name</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(row.attendedStudents).map((student, index) => (
                                <TableRow key={index}>
                                  <TableCell>{student.regNo}</TableCell>
                                  <TableCell>{student.firstName} {student.lastName}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose2} variant='outlined'>Cancel</Button>
                    </DialogActions>
                  </Dialog>

                  <Button 
                    // size="small"
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    color="error"
                    onClick={() => deleteAttendance(row._id)}
                    >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default Attendance;
