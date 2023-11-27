import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Notices = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
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
              '& .MuiTextField-root': { m: 1, 
              width: 500,
              maxWidth: '100%',},
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="notice-title"
                label="Title"
              />
            </div>
            <div>
              <TextField
                id="notice-discription"
                label="Discription"
                autoComplete="current-password"
                multiline
                rows={4}
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
  )
}

export default Notices