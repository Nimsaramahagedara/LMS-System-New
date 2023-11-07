import { Box } from "@mui/material";
import React from 'react'
import logo from '../assets/school.jpeg';
const Logo = () => {
    return (
        <Box sx={{margin:'0px auto', width:'100px'}}>
            <Box component={'img'} src={logo} className="w-full h-full object-contain text-center" />
        </Box>
    )
}

export default Logo