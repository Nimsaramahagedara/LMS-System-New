import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



import Button from '@mui/material/Button';


const ContactParent = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Fetch data from the API
    fetch('https://fakestoreapi.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter users based on the search term
    const filteredResults = users.filter((user) =>
      `${user.name.firstname} ${user.name.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredResults);
  }, [searchTerm, users]);

  return (
    <div>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField fullWidth label="Search Student" id="input-with-icon-textfield"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonSearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Student Name</TableCell>
              <TableCell align="right">Parent Email</TableCell>
              <TableCell align="right">Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchTerm && filteredUsers.length > 0 && filteredUsers.map((user, row) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell align="right">{user.name.firstname} {user.name.lastname}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  <React.Fragment>
                  <Tooltip title="Send Email">
                    <IconButton onClick={handleClickOpen}>
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Send Mail to {user.name.firstname} {user.name.lastname}'s Parent</DialogTitle>
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
                        >
                          <div>
                            <TextField
                              id="notice-title"
                              label="Student Name"
                              defaultValue={user.name.firstname}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </div>
                          <div>
                            <TextField
                              id="notice-title"
                              label="Parent Email"
                              defaultValue={user.email}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </div>
                          <div>
                            <TextField
                              id="notice-title"
                              label="Teacher's Name"
                            />
                          </div>
                          <div>
                            <TextField
                              id="notice-discription"
                              label="Message"
                              multiline
                              rows={4}
                            />
                          </div>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Send</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  );
};

export default ContactParent;
