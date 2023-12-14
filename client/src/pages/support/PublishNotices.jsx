import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
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
  Radio,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';

// Additional imports
import { RadioGroup, FormLabel } from '@mui/material';

const PublishNotices = () => {

  const publishedBy = "support";
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({
    title: '',
    description: '',
    audience: '',
    publishedBy: publishedBy,
  });


  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    title: '',
    description: '',
    audience: '',
    publishedBy: publishedBy,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleUpdateNotice = (row) => {
    setOpen2(true);
    setUpdateFormData({
      _id: row._id,
      title: row.title,
      description: row.description,
      audience: row.audience,
    });
  };

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/notices/get-notice-by-publisher/${publishedBy}`);
        const data = await response.json();
        setNotices(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleCreateNotice = (field, value) => {
    setNewNotice((prevData) => ({ ...prevData, [field]: value }));
  };

  // Use this function to handle changes in checkboxes
  const handleCheckboxChange = (field, value) => {
    setNewNotice((prevData) => ({ ...prevData, [field]: value }));
  };

  const publishNotice = async () => {
    try {
      const result = await fetch(`${apiUrl}/notices/create-notice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNotice),
      });
      const data = await result.json();

      if (result.ok) {
        console.log('Notice Published successfully:', data);
        toast.success(data.message);
        refreshPage();
        handleClose();
      } else {
        console.error('Error creating teacher:', data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating teacher:', error);
      toast.error('An error occurred while creating the teacher.');
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/notices/delete-notice/${id}`);

      if (result) {
        handleClose2();
        toast.warning('Notice Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/notices/update-notice/${updateFormData._id}`, updateFormData);

      if (result) {
        toast.success('Notice Updated Successfully');
        handleClose2();
        refreshPage();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Publish a Notice
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Publish a Notice</DialogTitle>
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
              <div>
                <TextField
                  id="notice-title"
                  label="Title"
                  fullWidth
                  onChange={(e) => handleCreateNotice('title', e.target.value)}
                  value={newNotice.title}
                />
              </div>
              <div>
                <TextField
                  id="notice-discription"
                  label="Discription"
                  multiline
                  rows={4}
                  fullWidth
                  onChange={(e) => handleCreateNotice('description', e.target.value)}
                  value={newNotice.description}
                />
              </div>
              <div>
                <FormGroup>
                  <FormLabel id="demo-radio-buttons-group-label">Audience</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      control={<Radio />}
                      label="Teachers"
                      onChange={(e) => handleCheckboxChange('audience', 'teacher', e.target.checked)}
                      checked={newNotice.audience === 'teacher'}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Students"
                      onChange={(e) => handleCheckboxChange('audience', 'student', e.target.checked)}
                      checked={newNotice.audience === 'student'}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Parents"
                      onChange={(e) => handleCheckboxChange('audience', 'parent', e.target.checked)}
                      checked={newNotice.audience === 'parent'}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="All"
                      onChange={(e) => handleCheckboxChange('audience', 'all', e.target.checked)}
                      checked={newNotice.audience === 'all'}
                    /></RadioGroup>
                </FormGroup>
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={publishNotice} variant='outlined'>Publish</Button>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Discription</TableCell>
              <TableCell>Audience</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.audience}</TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary"
                    onClick={() => handleUpdateNotice(row)}
                    sx={{ marginRight: 2 }}
                  > View </Button>

                  <Dialog open={open2} onClose={handleClose2} sx={{ border: '2px solid #ccc' }}>
                    <DialogTitle sx={{ textAlign: 'center' }}>Edit Notice</DialogTitle>
                    <DialogContent>
                      <div>
                        <TextField
                          required
                          id="outlined-read-only-input"
                          label="Title"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                          value={updateFormData.title}
                        />

                        <TextField
                          required
                          id="outlined-required"
                          label="Description"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                          value={updateFormData.description}
                          multiline
                          rows={4}
                        />

                        <FormGroup>
                          <FormLabel id="demo-radio-buttons-group-label">Audience</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >

                            <FormControlLabel
                              control={<Radio />}
                              label="Teachers"
                              onChange={() => setUpdateFormData({ ...updateFormData, audience: 'teacher' })}
                              checked={updateFormData.audience === 'teacher'}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="Students"
                              onChange={() => setUpdateFormData({ ...updateFormData, audience: 'student' })}
                              checked={updateFormData.audience === 'student'}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="Parents"
                              onChange={() => setUpdateFormData({ ...updateFormData, audience: 'parent' })}
                              checked={updateFormData.audience === 'parent'}
                            />
                            <FormControlLabel
                              control={<Radio />}
                              label="All"
                              onChange={() => setUpdateFormData({ ...updateFormData, audience: 'all' })}
                              checked={updateFormData.audience === 'all'}
                            />
                          </RadioGroup>
                        </FormGroup>
                      </div>
                      <DialogActions style={{ justifyContent: 'center' }}>
                        <Button size="small" startIcon={<SaveIcon />} onClick={handleUpdate} variant="contained" color="primary">
                          Update
                        </Button>

                        <Button size="small" startIcon={<DeleteIcon />} variant="contained" color="error" onClick={() => handleDeleteNotice(updateFormData._id)}>
                          Remove
                        </Button>
                        <Button size="small" startIcon={<CancelIcon />} variant='outlined' onClick={handleClose2}>Cancel</Button>
                      </DialogActions>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default PublishNotices