import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';




const PublishNotices = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleAudienceChange = (event) => {
    const value = event.target.value;
    console.log(value);
  
    if (selectedAudience.includes(value)) {
      // Remove the audience if it's already selected
      setSelectedAudience(selectedAudience.filter((audience) => audience !== value));
      console.log(selectedAudience);
    } else {
      // Add the audience if it's not selected
      setSelectedAudience([...selectedAudience, value]);
      console.log(selectedAudience);
    }
  };
  

  function createData(title, date, audience, discription) {
    return { title, date, audience, discription };
  }

  const rows = [
    createData('Exploring the Impact of Renewable Energy Sources on Sustainable Development', '20/11/2023', 'ALL Students', 'Discription Here'),
  ];
  return (
    <>
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
                />
              </div>
              <div>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={selectedAudience.includes('1')} onChange={handleAudienceChange} value={1} />}
                    label="Teachers"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedAudience.includes('2')} onChange={handleAudienceChange} value={2} />}
                    label="Students"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedAudience.includes('3')} onChange={handleAudienceChange} value={3} />}
                    label="Parents"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedAudience.includes('4')} onChange={handleAudienceChange} value={4} />}
                    label="All"
                  />
                </FormGroup>
              </div>



              <div>
                <TextField
                  id="notice-discription"
                  label="Discription"
                  multiline
                  rows={4}
                  fullWidth
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Publish</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Target Audience</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.audience}</TableCell>
                <TableCell align="right">
                  <React.Fragment>
                    <Button variant="outlined" startIcon={<VisibilityIcon />} color="secondary" onClick={handleClickOpen2}> View </Button>
                    <Dialog open={open2} onClose={handleClose2}>
                      <DialogTitle>{row.title}</DialogTitle>
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
                            <h5>Publish Date : {row.date}</h5>
                          </div>

                          <Typography variant='subtitle1'>Target Audience: {row.audience}</Typography>
                          <div>
                            <h5>Content</h5>
                            <p>{row.discription}</p>
                          </div>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button variant="outlined" startIcon={<EditIcon />} color="primary" onClick={handleClose2}> Update </Button>
                        <Button variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={handleClose2}> Delete </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>



                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PublishNotices