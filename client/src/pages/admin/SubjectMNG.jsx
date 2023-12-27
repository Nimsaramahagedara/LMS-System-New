import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, Typography, MenuItem, colors, } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import AddSubjectModal from '../../components/AddSubjectModal';

const SubjectMNG = ({ ClassList }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [allTeachers, setAllTeachers] = useState([]);
  const [selectedClass, setSelectedClass] = useState({
    grade: '',
    subClass: 'A',
    students: [null],
    ownedBy: {
      firstName: '',
      lastName: ''
    },
  });
  const [viewData, setViewData] = useState([]);
  const [refresh, changeRefresh] = useState(false);

  const getAllTeachers = async () => {
    try {
      const allT = await authAxios.get(`${apiUrl}/admin/get-all-teachers`);
      setAllTeachers(allT.data);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getAllTeachers();
  }, [])

  const handleViewClose = () => {
    setViewOpen(false);
  };

  const getSubjectsInClass = async (id) => {
    const subjectsinClass = await authAxios.get(`${apiUrl}/subject/${id}`);
    // console.log(inClassStudents.data);
    setViewData(subjectsinClass.data);
  }

  const handleView = async (row) => {
    setSelectedClass(row);
    await getSubjectsInClass(row._id);
    setViewOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const isDeleted = await authAxios.delete(`${apiUrl}/subject/${id}`);
      if (isDeleted.data) {
        toast.success('Subject Deleted Successfully');
        getSubjectsInClass(selectedClass._id)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2em' }}>Manage Subjects In Classes</h1>
      </div>


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
            {ClassList.map((row, index) => (
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
          </TableBody>
        </Table>
      </TableContainer>
      {/* Students and class Table Ends Here... */}

      {/* View Class Details Dialog Table Starts here.. */}
      <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="xl">
        <DialogTitle sx={{ textAlign: 'center' }}>
          Class Details - {selectedClass.grade} {selectedClass.subClass}
        </DialogTitle>
        <Typography className='text-center' variant='subtitle2'>Class Teacher : {selectedClass.ownedBy !== null ? (selectedClass.ownedBy.firstName + ' ' + selectedClass.ownedBy.lastName) : 'Not Assined'}</Typography>
        {
          allTeachers && <AddSubjectModal allTeachers={allTeachers} classId={selectedClass._id} handleRefresh={getSubjectsInClass} />
        }
        <DialogContent>
          <TableContainer style={{ marginTop: '20px' }} sx={{ maxWidth: '100%' }}>
            <Table sx={{ maxWidth: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {viewData.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{index}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{subject.subName}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }}>{subject.teachBy && subject.teachBy.lastName}</TableCell>

                    <TableCell style={{ whiteSpace: 'nowrap' }}>
                      <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                        Update
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDelete(subject._id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Add a row for total number of subjects */}
                <TableRow>
                  <TableCell colSpan={6} align="right">
                    <strong>Total number of subjects:</strong>
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
          <Button onClick={handleViewClose} variant='outlined'>Close</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default SubjectMNG;
