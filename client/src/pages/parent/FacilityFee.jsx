import React, { useState } from 'react';
import { Button, Modal, Box, Typography, TextField, Select, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

const FacilityFee = () => {
  const [openModal, setOpenModal] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "John Doe",
    id: "123456",
    amount: "",
    term: "Term1"
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const navigate = useNavigate();

  const handlePayNow = () => {
    
    setTimeout(() => {
      
      handleCloseModal();
      navigate('/dashboard/payment-api'); 
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '2em' }}>Facility Fee Payment</h1>
      <Button variant='contained' onClick={handleOpenModal}>Pay Now</Button>

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
              value={studentData.name}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Student ID"
              disabled
              value={studentData.id}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              type="number"
              name="amount"
              value={studentData.amount}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Select
              label="Term"
              name="term"
              value={studentData.term}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="Term1">Term 1</MenuItem>
              <MenuItem value="Term2">Term 2</MenuItem>
              <MenuItem value="Term3">Term 3</MenuItem>
            </Select>
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
