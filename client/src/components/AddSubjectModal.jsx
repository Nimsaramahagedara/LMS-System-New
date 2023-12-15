import { Box, Button, Input, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import authAxios from '../utils/authAxios';
import { apiUrl } from '../utils/Constants';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddSubjectModal = ({ classId, handleRefresh, allTeachers }) => {
    const [open, setOpen] = useState(false);
    const [subName, setSubName] = useState('');
    const [teachBy, setTeachBy] = useState('');


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            if(!subName || !teachBy){
                throw Error('Both Fields cannot be null');
            }
            const submitedSubj = await authAxios.post(`${apiUrl}/subject/${classId}`, {subName, teachBy});
            if(submitedSubj.data){
                toast.success('Subject Added Success');
                handleRefresh(classId);
                handleClose();
            }
        } catch (error) {
            if(error.message){
                toast.error(error.message);
            }
            if(error.response){
                toast.error(error.response.data.message);
            }
           
        }
    }


    return (
        <React.Fragment>
            <Button onClick={handleOpen} variant='contained'>Add New Subject</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, lineHeight: '80px' }}>
                    <Typography>Add new Subject to Existing Class</Typography>
                    <TextField
                        type='text'
                        value={subName}
                        onChange={e => setSubName(e.target.value)}
                        fullWidth
                        label='Subject Name'
                        required={true}
                    />
                    <br />
                    <Typography variant='subtitle2'>Teach By</Typography>
                    <Select
                        fullWidth
                        value={teachBy}
                        onChange={e => setTeachBy(e.target.value)}
                    >
                        {allTeachers && allTeachers.map((teacher, index)=>(
                            <MenuItem value={teacher._id} key={index}>{teacher.firstName + ' ' + teacher.lastName}</MenuItem>
                        ))}
                        
                    </Select>
                    <br />
                    <Button onClick={handleSubmit} variant='contained'>Add Subject To This Class</Button>
                    <Button onClick={handleClose} sx={{ marginLeft: '20px' }}>Close</Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default AddSubjectModal