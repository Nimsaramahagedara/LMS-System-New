import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const EditProfileForm = ({ student, onSave }) => {
  const [editedProfile, setEditedProfile] = useState(student);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editedProfile);
  };

  return (
    <div>
      <h2 className='mb-4'>Edit Profile</h2>
     
      <TextField
        label="First Name"
        name="firstName"
        value={editedProfile.firstName}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={editedProfile.lastName}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
       <TextField
        label="Email"
        name="email"
        value={editedProfile.email}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Mobile"
        name="contactNo"
        value={editedProfile.contactNo}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Address"
        name="address"
        value={editedProfile.address}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      
      {/* Add other TextField components for email, mobile, address, gender, grade, class, etc. */}
      <Button variant="contained" onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
};

export default EditProfileForm;
