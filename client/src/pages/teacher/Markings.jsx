import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
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

const Markings = () => {

  const [refresh, setRefresh] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [rowDialogOpen, setRowDialogOpen] = useState(Array(subjects.length).fill(false));

  const handleClickOpen2 = (index) => {
    setRowDialogOpen((prev) => {
      const newState = [...prev];
      newState[index] = true; // Set the selected row index to true
      return newState;
    })
  };

  const handleClose2 = () => {
    setRowDialogOpen(Array(subjects.length).fill(false));
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));


  const getSubjectList = async () => {
    try {
      const result = await authAxios.get(`${apiUrl}/teacher/marks/`);
      if (result) {
        setSubjects(result.data.marksData);
        console.log(subjects);
      } else {
        toast.error('Data Not Available');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {

    getSubjectList();
  }, [refresh]);


  return (
    <div>
      <Typography textAlign={'center'} variant='h5'>Marks of your Subjects</Typography>
      {/* <Button variant="outlined" style={{ marginRight: '20px' }}>
        Update Marks
      </Button>

      <Button variant="outlined">
        Generate PDF
      </Button> */}

      <Box sx={{ flexGrow: 1, maxWidth: "100%" }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Subjects
          </Typography>
          <Demo>
            <List>
              {Array.isArray(subjects) && subjects.map((subject, index) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete"
                      onClick={() => handleClickOpen2(index)}>
                      <VisibilityIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={subject.subId.subName}
                  />
                  <ListItemText
                    primary={'Term : ' + subject.term}
                  />
                  <Dialog open={rowDialogOpen[index]} onClose={handleClose2}>
                    <DialogTitle>{subject.subId.subName} Term: {subject.term}</DialogTitle>
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
                                <TableCell>Marks</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {(subject.marks).map((student, index) => (
                                <TableRow key={index}>
                                  <TableCell>{student.studentId.regNo}</TableCell>
                                  <TableCell>{student.studentId.firstName} {student.studentId.lastName}</TableCell>
                                  <TableCell>{student.mark}</TableCell>
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
                </ListItem>

              ))}
            </List>
          </Demo>
        </Grid>
      </Box>


    </div>

  )
}

export default Markings