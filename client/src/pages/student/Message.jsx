import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const MessageTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNewRequest = () => {
    // Add logic to handle new request
    // You can fetch the values from the form fields here
    handleCloseModal();
  };

  const data = [
    {
      firstName: 'John',
      lastName: 'Peter',
      email: 'email@gmail.com',
      message: 'This is a Sample message',
    },
    {
      firstName: 'John',
      lastName: 'Peter',
      email: 'email@gmail.com',
      message: 'This is a Sample message',
    },
  ];

  return (
    <>
      <div className="text-center font-bold">
        <h2 className="text-3xl">Request Advice From Teacher</h2>
      </div>
      <TableContainer component={Paper}>
        <div className="text-2xl">
          <h3>My Past Requests</h3>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">
                  <strong>Request Sent To</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <strong>Teacher's Email</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <strong>Message</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginLeft: '20px' }}
        onClick={handleOpenModal}
      >
        New Request
      </Button>

      {/* Modal for New Request Form */}
      <Dialog className="text-center font-bold" open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>New Request Form</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
          <TextField
            label="Teacher's Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseModal} color="error">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleNewRequest} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageTeacher;
