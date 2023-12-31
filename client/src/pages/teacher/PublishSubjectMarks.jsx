import { Box, Button, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const PublishSubjectMarks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { subject, grade } = useParams();
    const subjId = useParams().id;
    const [studentList, setStudents] = useState([]);
    const [open, setOpen] = useState(false);
    const [term, setTerm] = useState(1);

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const getAllStudents = async () => {
        try {
            const payload = await authAxios.get(`${apiUrl}/class/get-students-by-subject/${subjId}`);
            setStudents(payload.data);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllStudents()
    }, [])
    return (
        <div className='bg-white p-5'>
            {
                isLoading && <Loader />
            }
            <Typography variant='h5' textAlign={'center'}>{subject + ' - ' + grade}</Typography>
            <Button onClick={handleOpen} variant='contained'>Publish Marks</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'}>
                        Publish Marks
                    </Typography>
                    <InputLabel style={{ color: 'black' }} htmlFor="term-select">
                        Select The Term
                    </InputLabel>
                    <Select  placeholder='Term' fullWidth value={term} color='secondary' labelId="term-select">
                        <MenuItem value={1}>Term 1</MenuItem>
                        <MenuItem value={2}>Term 2</MenuItem>
                        <MenuItem value={3}>Term 3</MenuItem>
                    </Select>

                    
            {
                studentList.length > 0 ? studentList.map((student) => (
                    <Typography>{student.firstName}</Typography>
                )) : <>No Students</>
            }
                </Box>
            </Modal>

        </div>
    )
}

export default PublishSubjectMarks