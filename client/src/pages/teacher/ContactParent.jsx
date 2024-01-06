import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Modal, Box, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import TeacherAttendanceDateCard from '../../components/TeacherAttendanceDateCard';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import WelcomeCardTeacher from '../../components/WelcomeCardTeacher';
import Loader from '../../components/Loader/Loader';


const ContactParent = () => {
  const [studentList, setStudentList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredStudentList, setFilteredStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }


const handleSelectedEmail = (email) => {
  setSelectedEmail (email);
  handleOpen();
  console.log('function called');
}

const sendToParent = async () => {
  const data={
    sendTo: selectedEmail,
    subject : subject,
    description : description}
  try {
    const isSent = await authAxios.post(`${apiUrl}/send-email`, data );
    if (isSent){
      toast.success ('Email has sent successfully!...')
    }
    handleClose();

  } catch(error){
    toast.error (error.response.data.message)
  }
}


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };


  useEffect(() => {
    const getStudentList = async () => {
      try {
        const userDetails = await authAxios.get(`${apiUrl}/parent/get-students`);
        setStudentList(userDetails.data);
        setIsLoading(false);
        console.log(userDetails.data);
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
      {isLoading ? <Loader /> : <></>}
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

      <Paper elevation={3}>
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
                <TableCell>
                  <Button  sx={{textTransform:'lowercase'}} onClick={() => handleSelectedEmail(student.parentId.email)}>{student.parentId ? student.parentId.email : 'N/A'}</Button></TableCell>


              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex items-center flex-col w-full space-y-5'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Send Email
          </Typography>

          <Typography>
            Send to: {selectedEmail}
          </Typography>
          <TextField onChange={(e)=> setSubject (e.target.value)} value={subject} type='text' variant='outlined' label='subject' fullWidth>
           </TextField>

          <TextField onChange={(e) => setDescription (e.target.value)} value={description} type='text' variant='outlined' label='description' fullWidth multiline rows={5}>
            </TextField>   

          <Button onClick={sendToParent} variant='contained'>Send</Button>
          </div>
        </Box>
      </Modal>

    </div>

  );
};

export default ContactParent;
