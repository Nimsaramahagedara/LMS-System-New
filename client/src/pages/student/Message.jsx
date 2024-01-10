import React, { useEffect, useState } from 'react';
import PageTitle from '../../components/StudentDashboard/PageTitle';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const MessageTeacher = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState({
    subject: "",
    content: "",
  });

  const handleCreateChange = (field, value) => {
    setMessage((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const result = await authAxios.post(`${apiUrl}/student/send-message`, message);
      if (result) {
        toast.success('Message Send Successfully');
        handleCloseModal();
        setMessage({});
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ContainerStudent>
        <PageTitle title={'Request Advice From Teacher'} icon={<FeedbackIcon fontSize='large' />} bgColor='bg-purple-800' />
        <div className='flex items-start mt-5 justify-between'>
          <div className='md:w-5/6 w-full'>
            <div className='px-5 py-2 mt-5'>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{ margin: '5px' }}
                onClick={handleOpenModal}
              >
                New Request
              </Button>
            </div>
          </div>
        </div>
      </ContainerStudent>

      {/* Modal for New Request Form */}
      <Dialog className="text-center font-bold" open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>New Request Form</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            margin="normal"
            value={message.subject}
            onChange={e => handleCreateChange('subject', e.target.value)}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={message.content}
            onChange={e => handleCreateChange('content', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Send
            </Button>
            <Button variant="contained" onClick={handleCloseModal} color="error">
              Cancel
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageTeacher;
