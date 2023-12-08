import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, RadioGroup, FormControlLabel, Radio, } from '@mui/material';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';
import DateInput from '../../components/DateInput';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';

const SupportTeam = () => {
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState({});
    const [viewData, setViewData] = useState([]);
    const [data, setData] = useState('');

    const [formData, setFormData] = useState({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
    });

    // CREATE SUPPORT ACCOUNT FORM DATA
    const [createSupportFormData, setSupportFormData] = useState({
        regNo: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        dob: '',
        contactNo: '',
        gender: 'male'
    });

    const handleChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleCreateChange = (field, value) => {
        setSupportFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleUpdate = () => {
        // Add validation if needed

        // Call the update function with the updated data
        onUpdate(formData);
    };

    const handleDelete = () => {
        // Call the delete function with the ID of the item to delete
        onDelete(formData.id);
    };

    const handleAddSupport = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleViewClose = () => {
        setViewOpen(false);
    };

    const handleView = (row) => {
        setSelectedClass(row);
        setViewData(getDummyStudentData()); // Replace with your logic to fetch student data for the selected class
        setViewOpen(true);
    };

    const getDummyStudentData = () => {
        // Dummy data for the students in a class
        return [
            { number: 1, index: 22436, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
            { number: 2, index: 22437, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
            { number: 3, index: 22438, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
            { number: 4, index: 22439, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
            { number: 5, index: 22440, name: 'A.R.D. Pinsara', dob: '08/07/1999', mobile: '0769379809', address: 'No 13, Yakabe, Pugoda.' },
            // Add more dummy data as needed
        ];
    };

    const handleSupportSubmit = async () => {
        // Add logic to handle form submission
        console.log(createSupportFormData);
        try {
            const result = await authAxios.post(`${apiUrl}/admin/create-support`, createSupportFormData);
            if (result) {
                toast.success(result.data.message);
            }
        } catch (error) {
            //console.log(error);
            toast.error(error.response.data.message);
        }




    };


    const dummyData = [
        { grade: '1', class: 'A', teacher: 'Mrs.P.G. Kusuma', qty: 38 },
        { grade: '1', class: 'B', teacher: 'Mr.W.M. Sugath', qty: 35 },
        { grade: '2', class: 'A', teacher: 'Mrs.A.R. Kumari', qty: 40 },
        { grade: '2', class: 'B', teacher: 'Mr.B.D. Saman', qty: 39 },
        { grade: '3', class: 'A', teacher: 'Mr.S.M.W. Samarakoon', qty: 37 },
    ];


    return (
        <div>

            <AdminWelcomeCard />
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '2em' }}>Manage Support Team</h1>
            </div>

            {/* Adding New Student Part Start Here... */}
            <Button variant="contained" onClick={handleAddSupport}>
                Add Support Account
            </Button>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Add New Support Member</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Fill out the form below to add a new Support Member.
                    </DialogContentText>

                    {/* Form Start */}
                    <div>
                        {/* Show Index Number - Auto Increment */}
                        <TextField
                            id="outlined-read-only-input"
                            label="Index Number"
                            InputProps={{
                                readOnly: false,
                            }}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => handleCreateChange('regNo', e.target.value)}
                            value={createSupportFormData.regNo}
                        />

                        {/* Support F Name Input */}
                        <TextField
                            required
                            id="outlined-firstName"
                            label="First Name"
                            placeholder="e.g., John"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => handleCreateChange('firstName', e.target.value)}
                            value={createSupportFormData.firstName}
                        />
                        {/* Support L Name Input */}
                        <TextField
                            required
                            id="outlined-lastNAme"
                            label="Last Name"
                            placeholder="e.g., Cameron"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => handleCreateChange('lastName', e.target.value)}
                            value={createSupportFormData.lastName}
                        />

                        {/* Student DOB Input */}
                        <DateInput label='Date Of Birth' onChange={(newValue) => handleCreateChange('dob', newValue)} />

                        {/* Support Password Input */}
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            placeholder="Enter new password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => handleCreateChange('password', e.target.value)}
                            value={createSupportFormData.password}
                        />

                        {/* Support Password Re-Enter */}
                        <TextField
                            required
                            id="outlined-password-input2"
                            label="Re-enter Password"
                            type="password"
                            placeholder="Re-enter new password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                        />

                        {/*  Address Input */}
                        <TextField
                            required
                            id="outlined-address"
                            label=" Address"
                            placeholder="e.g., home, village, city"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => handleCreateChange('address', e.target.value)}
                            value={createSupportFormData.address}
                        />

                        {/*  Email Input */}
                        <TextField
                            required
                            id="outlined-email"
                            label="Email"
                            placeholder="e.g., 'john@mail.com'"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => handleCreateChange('email', e.target.value)}
                            value={createSupportFormData.email}
                        />

                        {/*  ContactNo Input */}
                        <TextField
                            required
                            id="outlined-contact"
                            label="Contact Number"
                            placeholder="e.g., 763355762"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={(e) => handleCreateChange('contactNo', e.target.value)}
                            value={createSupportFormData.contactNo}
                            type='number'
                        />
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={createSupportFormData.gender}
                            onChange={(e)=>handleCreateChange('gender', e.target.value)}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </div>
                    {/* Form Ends Here.. */}

                </DialogContent>

                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSupportSubmit} variant="contained" color="primary">
                        Create Account
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Adding New Student Part Ends Here... */}




            {/* Students and class Table Start Here... */}
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.grade}</TableCell>
                                <TableCell>{row.class}</TableCell>
                                <TableCell>{row.teacher}</TableCell>
                                <TableCell>{row.qty}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleView(row)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Students and class Table Ends Here... */}

            {/* View Support member Details Dialog Table Starts here.. */}
            <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="xl">
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Support Member Details - {selectedClass.grade} {selectedClass.class}
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            label="ID"
                            value={formData.id}
                            disabled
                            fullWidth
                        />
                        <TextField
                            label="First Name"
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" color="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleDelete}>
                            Delete
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <Button onClick={handleViewClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default SupportTeam