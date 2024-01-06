import authAxios from '../utils/authAxios';
import { toast } from 'react-toastify';
import { apiUrl } from '../utils/Constants';
import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export default function BarsDataset() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [rowDialogOpen, setRowDialogOpen] = useState(Array(students.length).fill(false));

  

  const handleClickOpen2 = (index, id) => {
    setRowDialogOpen((prev) => {
      const newState = [...prev];
      newState[index] = true; // Set the selected row index to true
      return newState;
    })
    getMarks(id);
  };

  const handleClose2 = () => {
    setRowDialogOpen(Array(students.length).fill(false));
    clearAllState();
  };

  const clearAllState = () => {
    setAttendance([]);
  };

  useEffect(() => {
    const getStudents = async () => {
      try {
        const id = await authAxios.get(`${apiUrl}/get-user`);
        const result = await authAxios.get(`${apiUrl}/parent/get-students-using-parent-id/${id.data._id}`);
        if (result) {
          setStudents(result.data.students);
        } else {
          toast.error('Student Data Not Available');
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getStudents();
  }, []);

  const getMarks = async (id) => {
    try {
      const result = await authAxios.get(`${apiUrl}/parent/get-attendance/${id}`);

      if (result) {
        setAttendance(result.data.attendanceData);

      } else {
        toast.error('Data Not Available');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };


  return (
    <div>
      {students.map((row, index) => (
        <nav aria-label="main mailbox folders">
          <List onClick={() => handleClickOpen2(index, row._id)}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index + 1}
                </ListItemIcon>
                <ListItemText primary={`${row.firstName} ${row.lastName}`} />
                <ListItemIcon>
                  <ListItemText primary={`${row.classId.grade} ${row.classId.subClass}`} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
          <Dialog open={rowDialogOpen[index]} onClose={handleClose2}>
            <DialogTitle>{`${row.firstName} ${row.lastName}`} Attendance <p className="opacity-50">Class: {row.classId.grade} {row.classId.subClass}</p></DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': {
                    m: 1,
                    width: 700,
                    maxWidth: '100%',
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <List sx={{ width: 500, maxWidth: '100%', bgcolor: 'background.paper' }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>No</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {attendance.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell>{row.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </List>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} variant='outlined'>Cancel</Button>
            </DialogActions>
          </Dialog>
        </nav>
      ))}
    </div>
  );
}