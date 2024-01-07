import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Typography, TextField, Select, MenuItem, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';

const FacilityFee = () => {
  const [openModal, setOpenModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent]=useState({
    year:2024
  });

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

  const handleOpenModal = (row) => {
    setSelectedStudent(row)
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  const navigate = useNavigate();

  const handlePayNow = () => {
      handleCloseModal();
      navigate(`/dashboard/payment-api/${selectedStudent._id}`,{ state: { selectedStudent } }); 
  };
  
  useEffect(()=>{
    getStudents();
  },[])


  return (
    <div style={{ textAlign: 'center' }} className='w-full'>
      <h1 style={{ fontSize: '2em' }}>Facility Fee Payment</h1>

      <h1 className='text-xl text-left my-3'>Your Children</h1>
      <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
        {students.map((row, index) => (
          <nav aria-label="main mailbox folders" className='w-full'>
          <List fullWidth>
              <ListItem fullWidth>
                <ListItemButton fullWidth>
                  <ListItemIcon>
                    {index + 1}
                  </ListItemIcon>
                  <ListItemText primary={`${row.firstName} ${row.lastName}`} />
                  <ListItemIcon>
                    <ListItemText primary={`${row.classId.grade} ${row.classId.subClass}`} />
                  </ListItemIcon>
                </ListItemButton>
                <Button variant='contained' onClick={()=>handleOpenModal(row)}>Pay Now</Button>
              </ListItem>
            </List>
          </nav>
        ))}
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Payment Details
          </Typography>
          <form>
            <TextField
              label="Student Name"
              disabled
              value={selectedStudent.firstName + ' ' + selectedStudent.lastName}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Student ID"
              disabled
              value={selectedStudent._id}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              type="number"
              name="amount"
              value={selectedStudent.amount}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              name="year"
              type='number'
              value={selectedStudent.year}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            >
            </TextField>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handlePayNow}
              fullWidth
            >
              Pay Now
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default FacilityFee;
