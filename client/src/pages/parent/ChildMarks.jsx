import React, { useState } from 'react';
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,} from '@mui/material';
import ParentWelcomeCard from '../../components/ParentWelcomeCard';



const ChildMarks = () => {
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
      { index: 22436, subject: 'Science', subteacher: 'Mrs.P.G.Kusuma', marks: '85', grade: 'A' },
      { index: 22436, subject: 'Maths', subteacher: 'Mr.W.M.Sugath', marks: '80', grade: 'A' },
      { index: 22436, subject: 'English', subteacher: 'Mrs.A.R.Kumari', marks: '75', grade: 'A' },
      { index: 22436, subject: 'Sinhala', subteacher: 'Mr.B.D.Saman', marks: '70', grade: 'B' },
      { index: 22436, subject: 'Religion', subteacher: 'Mr.S.M.W.Samarakoon', marks: '77', grade: 'A' },
      { index: 22436, subject: 'History', subteacher: 'MR.A.R.C.Arunapriya', marks: '82', grade: 'A' },
      { index: 22436, subject: 'Geography', subteacher: 'Mr.C.G.Kelum', marks: '90', grade: 'A' },
      { index: 22436, subject: 'Drama', subteacher: 'Mrs.Kumarasingha', marks: '91', grade: 'A' },
      { index: 22436, subject: 'Tamil', subteacher: 'Mr. T.Thilakaran', marks: '55', grade: 'C' },
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
    { grade: '6', term: '1', teacher: 'Mrs.P.G. Kusuma', place: 3 },
    { grade: '6', term: '2', teacher: 'Mrs.P.G. Kusuma', place: 2 },
    { grade: '6', term: '3', teacher: 'Mrs.P.G. Kusuma', place: 3 },
    { grade: '7', term: '1', teacher: 'Mr.B.D. Saman', place: 4 },
    { grade: '7', term: '2', teacher: 'Mr.B.D. Saman', place: 5 },
    { grade: '7', term: '3', teacher: 'Mr.B.D. Saman', place: 2 },
  ];

// Calculate the sum of all marks
const sumOfMarks = viewData.reduce((sum, item) => sum + parseInt(item.marks), 0);

// Calculate the average marks
const averageMarks = sumOfMarks / viewData.length;
  

  return (
          <div>

            <ParentWelcomeCard />
            <div style={{ textAlign: 'center'}}>
              <h1 style={{ fontSize: '2em' }}>Academic Report Of My Child</h1>
            </div>

    {/* Students and class Table Start Here... */}
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Grade</TableCell>
              <TableCell>Term</TableCell>
              <TableCell>Class Teacher</TableCell>
              <TableCell>Place of the Class</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.grade}</TableCell>
                <TableCell>{row.term}</TableCell>
                <TableCell>{row.teacher}</TableCell>
                <TableCell>{row.place}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleView(row)}
                  >
                    More
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
    Marks Of my Child - Grade {selectedClass.grade}: Term {selectedClass.term}
  </DialogTitle>
  <DialogContent>
    <TableContainer style={{ marginTop: '20px' }} sx={{ maxWidth: '100%' }}>
      <Table sx={{ maxWidth: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell>Index No</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Subject Teacher</TableCell>
            <TableCell>Marks</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {viewData.map((student, index) => (
            <TableRow key={index}>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{student.index}</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{student.subject}</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{student.subteacher}</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{student.marks}</TableCell>
              <TableCell style={{ whiteSpace: 'nowrap' }}>{student.grade}</TableCell>
            </TableRow>
          ))}
          {/* Add a row for Show the Average Marks of this term */}
<TableRow>
  <TableCell colSpan={6} align="right">
    <strong>Average Marks Of this Term:</strong>
  </TableCell>
  <TableCell align="center">
    <strong>{averageMarks.toFixed(2)}</strong>
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

export default ChildMarks;
