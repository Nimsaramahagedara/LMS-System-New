import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
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
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Attendance = () => {

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rowDialogOpen, setRowDialogOpen] = useState(Array(attendance.length).fill(false));


  const refreshPage = () => {
    setRefresh((prev) => !prev)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = (index) => {
    setRowDialogOpen((prev) => {
      const newState = [...prev];
      newState[index] = true; // Set the selected row index to true
      return newState;
    });
  };

  const handleClose2 = () => {
    setRowDialogOpen(Array(attendance.length).fill(false));
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
        toast.success('Attendance Marked Successfully');
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
        console.log(attendance);
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


  function generatePDF(subject) {
    console.log(subject);
    const pdf = new jsPDF();

    // Function to calculate the center position for text
    const getCenterPosition = (text, fontSize, pageWidth) => {
      const textWidth = pdf.getTextWidth(text);
      return (pageWidth - textWidth) / 2;
    };

    // Center the subject name
    const subNameCenterX = getCenterPosition(`${subject.classId.grade} ${subject.classId.subClass}`, 12, pdf.internal.pageSize.width);
    pdf.text(`${subject.classId.grade} ${subject.classId.subClass}`, subNameCenterX, 10);

    // Center the term text
    const termTextCenterX = getCenterPosition('Term : ' + subject.date, 12, pdf.internal.pageSize.width);
    pdf.text('Date : ' + subject.date, termTextCenterX, 20);

    const header = [["No", "Reg No", "Name"]];

    const data = subject.attendedStudents.map((student, index) => [
      index + 1,
      student.regNo,
      `${student.firstName} ${student.lastName}`
    ]);

    // Add table to pdfument
    pdf.autoTable({
      startY: 30,
      head: header,
      body: data
    });

    // Download the PDF pdfument
    pdf.save(`${subject.classId.grade} ${subject.classId.subClass} Date${subject.date}.pdf`);
  }


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
                  <Button
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    color="secondary"
                    onClick={() => handleClickOpen2(index)} // Pass the row index to the function
                    sx={{ marginRight: 2 }}
                  >
                    View
                  </Button>
                  <Dialog open={rowDialogOpen[index]} onClose={handleClose2}>
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
                      <Button
                        startIcon={<PictureAsPdfIcon />}
                        onClick={() => generatePDF(row)} 
                        variant='outlined'>
                          Report
                      </Button>
                      <Button onClick={handleClose2} variant='outlined'>Cancel</Button>
                    </DialogActions>
                  </Dialog>

                  <Button
                    // size="small"
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    color="error"
                    onClick={() => deleteAttendance(row._id)}
                    sx={{ marginRight: 2 }}
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
