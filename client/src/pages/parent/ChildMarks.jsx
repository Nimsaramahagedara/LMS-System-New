import ParentWelcomeCard from '../../components/ParentWelcomeCard';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/Constants';
import React, { useEffect, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TaskIcon from '@mui/icons-material/Task';
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


export default function ChildMarks() {

  const [students, setStudents] = useState([]);
  const [term1Marks, setTerm1Marks] = useState([]);
  const [term2Marks, setTerm2Marks] = useState([]);
  const [term3Marks, setTerm3Marks] = useState([]);
  const [rowDialogOpen, setRowDialogOpen] = useState(Array(students.length).fill(false));
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

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
    setTerm1Marks([]);
    setTerm2Marks([]);
    setTerm3Marks([]);
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
  };

  useEffect(() => {
    const getStudents = async () => {
      try {
        const id = await authAxios.get(`${apiUrl}/get-user`);
        const result = await authAxios.get(`${apiUrl}/parent/get-students-using-parent-id/${id.data._id}`);
        if (result) {
          setStudents(result.data.students);
        } else {
          toast.error('Class Data Not Available');
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getStudents();
  }, []);

  const getMarks = async (id) => {
    try {
      const result = await authAxios.get(`${apiUrl}/student/get-marks-by-student/${id}`);

      if (result) {
        const { data } = result;

        // Separate data into different terms
        const term1Data = data.filter(mark => mark.term === 1);
        const term2Data = data.filter(mark => mark.term === 2);
        const term3Data = data.filter(mark => mark.term === 3);

        setTerm1Marks(term1Data);
        setTerm2Marks(term2Data);
        setTerm3Marks(term3Data);

      } else {
        toast.error('Data Not Available');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div><ParentWelcomeCard />
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2em' }}>Academic Report Of My Child</h1>
      </div>
      <h5 style={{ fontSize: '1.5em' }}>Students List</h5>
      <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
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
              <DialogTitle>{`${row.firstName} ${row.lastName}`} <p className="opacity-50">Class: {row.classId.grade} {row.classId.subClass}</p></DialogTitle>
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
                    <ListItemButton onClick={handleClick}>
                      <ListItemIcon>
                        <TaskIcon />
                      </ListItemIcon>
                      <ListItemText primary="Term 01" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {term1Marks.length > 0 && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                          <Table sx={{ width: 500, maxWidth: '100%'}} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Marks</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {term1Marks.map((row, index) => (
                                <TableRow key={row.subId.subName}>
                                  <TableCell component="th" scope="row">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell>{row.subId.subName}</TableCell>
                                  <TableCell>{row.mark}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </List>
                    </Collapse>
                    )}

                    {/* //term 2 */}

                    <ListItemButton onClick={handleClick2}>
                      <ListItemIcon>
                        <TaskIcon />
                      </ListItemIcon>
                      <ListItemText primary="Term 02" />
                      {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {term2Marks.length > 0 && (
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                          <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Marks</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {term2Marks.map((row, index) => (
                                <TableRow key={row.subId.subName}>
                                  <TableCell component="th" scope="row">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell>{row.subId.subName}</TableCell>
                                  <TableCell>{row.mark}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </List>
                    </Collapse>
                    )}

                    {/* //term 3 */}
                    <ListItemButton onClick={handleClick3}>
                      <ListItemIcon>
                        <TaskIcon />
                      </ListItemIcon>
                      <ListItemText primary="Term 03" />
                      {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {term3Marks.length > 0 && (
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Marks</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {term3Marks.map((row, index) => (
                                <TableRow key={row.subId.subName}>
                                  <TableCell component="th" scope="row">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell>{row.subId.subName}</TableCell>
                                  <TableCell>{row.mark}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </List>
                    </Collapse>
                    )}

                  </List>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2} variant='outlined'>Cancel</Button>
              </DialogActions>
            </Dialog>
          </nav>
        ))}
      </Box>
    </div>
  )
}
