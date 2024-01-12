import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Modal, Box, TextField } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import WelcomeCardTeacher from "../../components/WelcomeCardTeacher";
import authAxios from '../../utils/authAxios';
import { apiUrl } from "../../utils/Constants";
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import { toast } from "react-toastify";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMessage, setSelectedMessage] = useState({});
  const [refresh, setRefresh] = useState(false);

  const getAllMessages = async () => {
    try {
      const messages = await authAxios.get(`${apiUrl}/teacher/messages`);
      setMessages(messages.data);
     // console.log(messages.data);
    } catch (error) {
      console.log(error);
    }
  }
  const updateMessaggeStatus = async (id) => {
    try {
      const updatedMessage = await authAxios.put(`${apiUrl}/teacher/messages/${id}`);
     // console.log(message.data);

      // Update the messages array with the updated message
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          console.log(msg);
          // Check if the current message is the one that was updated
          if (msg._id === updatedMessage.data._id) {
            // If it is, update the message status
            return { ...msg, status: updatedMessage.data.status };
          } else {
            // If it's not the updated message, return the original message
            return msg;
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllMessages()
  }, [])

  const handleClose = () => {
    setOpen(false);
  }
  const handleOpen = (row) => {
    setSelectedMessage(row);
    updateMessaggeStatus(row._id)
    setOpen(true);
  }

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [refresh]);

  const sendEmail = async () => {
    const data = {
      sendTo: selectedMessage?.stdId?.email,
      subject: subject,
      description: description
    }
    try {
      const isSent = await authAxios.post(`${apiUrl}/send-email`, data);
      if (isSent) {
        toast.success('Email has sent successfully!...')
        const deletedMessage = await authAxios.delete(`${apiUrl}/teacher/messages/${selectedMessage._id}`);
        if(deletedMessage){
        toast.success('Message deleted successfully!...')
        setRefresh((prev)=>!prev)
        }
      }
      handleClose();

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div>
        {isLoading ? <Loader /> : null}
        <WelcomeCardTeacher />
      </div>
      <div className="text-center font-bold">
        <h2 className="text-3xl">Private Messages From Students</h2>
      </div>
      <br></br>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1"><strong>Name</strong></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Email</strong></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Title</strong></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Message</strong></Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1"><strong>Status</strong></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{`${item.stdId.firstName} ${item.stdId.lastName}`}</TableCell>
                <TableCell>{item.stdId.email}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{'*******'}</TableCell>
                <TableCell><Button onClick={() => handleOpen(item)}>{item.status == 1 ? <DraftsIcon /> : <EmailIcon />}</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex items-center flex-col w-full space-y-5'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Contact Stuent immediately
            </Typography>

            <Typography id="modal-modal-title" variant="subtitle2" color={"GrayText"} component="h2">
               Stuent's Message
            </Typography>
            <div className="text-xs font-bold bg-amber-300 rounded-xl w-full p-2 capitalize ">
              {selectedMessage.content }
            </div>

            <Typography className="text-center" variant="subtitle2">
              Send to: {selectedMessage?.stdId?.email} <br /> or <br /> Call Now : {selectedMessage?.stdId?.contactNo}
            </Typography>
            <TextField onChange={(e) => setSubject(e.target.value)} value={subject} type='text' variant='outlined' label='subject' fullWidth>
            </TextField>

            <TextField onChange={(e) => setDescription(e.target.value)} value={description} type='text' variant='outlined' label='description' fullWidth multiline rows={5}>
            </TextField>

            <Button onClick={sendEmail} variant='contained'>Send Email and Delete Message</Button>
          </div>
        </Box>
      </Modal>

    </>
  );
};


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

export default Chat;
