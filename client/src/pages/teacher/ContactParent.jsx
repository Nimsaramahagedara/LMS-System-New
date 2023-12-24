import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TeacherAttendanceDateCard from '../../components/TeacherAttendanceDateCard';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import WelcomeCardTeacher from '../../components/WelcomeCardTeacher';

const ContactParent = () => {
  const [studentList, setStudentList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredStudentList, setFilteredStudentList] = useState([]);

  useEffect(() => {
    const getStudentList = async () => {
      try {
        const userDetails = await authAxios.get(`${apiUrl}/teacher/get-students-in-class`);
        setStudentList(userDetails.data);
        setFilteredStudentList(userDetails.data); // Initialize filtered list with all students
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getStudentList();
  }, []);

  const columns = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'parentEmail', label: 'Parent Email' },
  ];

  // Function to filter the student list based on search input
  const handleSearch = () => {
    const filteredList = studentList.filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        student.email.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredStudentList(filteredList);
  };

  return (
    <div>
      <WelcomeCardTeacher />

      {/* Search bar */}
      <TextField
        label="Search by first name or email"
        variant="outlined"
        margin="normal"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e) {
            handleSearch();
          }
        }}
      />

      <Paper elevation={3} style={{ margin: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
                
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredStudentList.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.parentID ? student.parentID.email : 'N/A'}</TableCell>

              
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default ContactParent;
