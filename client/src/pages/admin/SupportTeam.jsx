import React, { useEffect, useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, RadioGroup, FormControlLabel, Radio, colors, } from '@mui/material';
import AdminWelcomeCard from '../../components/AdminWelcomeCard';
import DateInput from '../../components/DateInput';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import SimpleCard from '../../components/SimpleCard';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ColorCard from '../../components/StudentDashboard/ColorCard';
import Loader from '../../components/Loader/Loader';
const SupportTeam = () => {
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedSupport, setselectedSupport] = useState({});
    const [data, setData] = useState('');
    const [allSupport, setAllSupport] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //UPDATE SUPPORT FORM DATA
    const [updateFormData, setUpdateFormData] = useState({
        regNo: data.regNo,
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

    //ACCOUNT UPDATE FORM VALUES HANDLER
    const handleChange = (field, value) => {
        setselectedSupport((prevData) => ({ ...prevData, [field]: value }));
    };

    //HANDLE THE ACCOUNT CREATION FIELDS
    const handleCreateChange = (field, value) => {
        setSupportFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleUpdate = async () => {
        try {
            const result = await authAxios.put(`${apiUrl}/admin/update-support/${selectedSupport.email}`, selectedSupport);

            if (result) {
                toast.success('Account Details Updated');
            }
            refreshPage();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleDelete = async () => {
        try {
            const result = await authAxios.delete(`${apiUrl}/admin/delete-support/${selectedSupport.email}`);

            if (result) {
                toast.warning('Account Deleted Success');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            refreshPage();
            handleViewClose();
        }
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
        setselectedSupport(row);
        setViewOpen(true);
    };

    const refreshPage = ()=>{
            setRefresh((prev)=> !prev)
    }


    //ACCOUNT CREATION
    const handleSupportSubmit = async () => {
        console.log(createSupportFormData);
        try {
            const result = await authAxios.post(`${apiUrl}/admin/create-support`, createSupportFormData);
            if (result) {
                toast.success(result.data.message);
            }
            refreshPage();
            setOpen(false);
        } catch (error) {
            //console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const getAllSupportMembers = async () => {
            try {
                const result = await authAxios.get(`${apiUrl}/admin/get-all-support`);
                if (result) {
                    setAllSupport(result.data);
                    setIsLoading(false);
                } else {
                    toast.error('Support Accounts None');
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }

        }

        getAllSupportMembers();
    }, [refresh])


    return (
        <div>

            <AdminWelcomeCard />

            <ColorCard count={allSupport.length} name={'Support Teams'} icon={<VolunteerActivismIcon/>} bgColor={colors.cyan[400]}/>
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
                        {/* <TextField
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
                        /> */}

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
                            onChange={(e) => handleCreateChange('gender', e.target.value)}
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




            {/* View support accounts Table Start Here... */}
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
                    {
                        !isLoading ? <TableBody>
                        {allSupport.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.regNo}</TableCell>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                                <TableCell>{row.email}</TableCell>
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
                    </TableBody> : <Loader/>
}
                </Table>
            </TableContainer>
            {/* View support accounts Table Ends Here... */}


            {/* View Support member Details Dialog Table Starts here.. */}
            <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="xl">
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Support Member Details - {selectedSupport.firstName} {selectedSupport.lastName}
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            label="Reg No"
                            value={selectedSupport.regNo}
                            disabled
                            fullWidth
                        />
                        <TextField
                            label="First Name"
                            value={selectedSupport.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Last Name"
                            value={selectedSupport.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={selectedSupport.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            disabled
                            value={selectedSupport.password}
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