import { Box, Button, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';
import Markings from './Markings';

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
    const [marks, setMarks] = useState([]);

    const handleChange = (event, studentId) => {
        const { value } = event.target;

        // Find the index of the student in the marks array
        const studentIndex = marks.findIndex((mark) => mark.studentId === studentId);

        // If the student is already in the marks array, update their mark
        if (studentIndex !== -1) {
            const updatedMarks = [...marks];
            updatedMarks[studentIndex].mark = Number(value); // Convert to a number if needed
            setMarks(updatedMarks);
        } else {
            // If the student is not in the marks array, add them with the new mark
            setMarks([...marks, { studentId, mark: Number(value) }]);
        }
    };

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

    const handleMarkSubmit = async () => {
        try {
            const markPayload = {
                term,
                marks
            }
            console.log(markPayload);
            const payload = await authAxios.post(`${apiUrl}/marks/subject-marks/${subjId}`, markPayload);
            if(payload.data){
                toast.success('Marks Added Success!');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white p-5'>
            {
                isLoading && <Loader />
            }
            <Typography variant='h5' textAlign={'center'}>{subject + ' - ' + grade}</Typography>
            <Button onClick={handleOpen} variant='contained'>Publish Marks</Button>
            
            <Markings/>

            {/* Modal for publish the marks */}
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
                    <Typography variant='subtitle2' textAlign={'center'}>{subject + ' - ' + grade}</Typography>
                    <InputLabel style={{ color: 'black' }} htmlFor="term-select">
                        Select The Term
                    </InputLabel>
                    <Select placeholder='Term' fullWidth value={term} color='secondary' labelId="term-select" onChange={(e)=>setTerm(e.target.value)}>
                        <MenuItem value={1}>Term 1</MenuItem>
                        <MenuItem value={2}>Term 2</MenuItem>
                        <MenuItem value={3}>Term 3</MenuItem>
                    </Select>

                    <Typography id="modal-modal-title" variant="subtitle1" component="h2" margin={'20px 0px'}>
                        Student List
                    </Typography>
                    <div className='flex items-center justify-between bg-blue-600 p-5'>
                        <Typography>Student Name</Typography>
                        <Typography>Mark</Typography>
                    </div>
                    <div className='max-h-screen overflow-y-scroll'>
                        {
                            studentList.length > 0 ? studentList.map((student, index) => (
                                <div className='flex items-center justify-between mt-5' key={index}>
                                    <div className='w-10'>
                                        {index}
                                    </div>
                                    <div className='flex items-center justify-between w-full'>
                                        <Typography>{student.firstName + ' ' + student.lastName}</Typography>
                                        <TextField type='number'
                                            value={marks[index]?.mark || 0}
                                            onChange={(e) => handleChange(e, student._id)}
                                            inputProps={{
                                                min: 0,
                                                max: 100,
                                            }} />
                                    </div>

                                </div>
                            )) : <>No Students</>
                        }
                    </div>
                    <Button variant='contained' sx={{ float: 'right', marginTop: '40px' }} onClick={handleMarkSubmit}>Submit Marks</Button>
                </Box>
            </Modal>

        </div>
    )
}

export default PublishSubjectMarks