import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function MarksTable() {

const [term1Marks, setTerm1Marks] = useState([]);
const [term2Marks, setTerm2Marks] = useState([]);
const [term3Marks, setTerm3Marks] = useState([]);

const getMarks = async () => {
  try {
    const user = await authAxios.get(`${apiUrl}/get-user`);
    const id = user.data._id;
    const result = await authAxios.get(`${apiUrl}/student/get-marks-by-student/658a8cddf00e429147987698`);
    // const result = await authAxios.get(`${apiUrl}/student/get-marks-by-student/${id}`);
    
    if (result) {
      const { data } = result;

      // Separate data into different terms
      const term1Data = data.filter(mark => mark.term === 1);
      const term2Data = data.filter(mark => mark.term === 2);
      const term3Data = data.filter(mark => mark.term === 3);

      setTerm1Marks(term1Data);
      setTerm2Marks(term2Data);
      setTerm3Marks(term3Data);

      console.log('Term 1 Marks:', term1Marks);
      console.log('Term 2 Marks:', term2Marks);
      console.log('Term 3 Marks:', term3Marks);
    } else {
      toast.error('Data Not Available');
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};

useEffect(() => {
  getMarks();
}, []);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" size='small'>
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="right">Subject Name</StyledTableCell>
            <StyledTableCell align="right">Subject Code</StyledTableCell>
            <StyledTableCell align="right">Makrs</StyledTableCell>
            <StyledTableCell align="right">Average</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {term3Marks.map((row) => (
            <StyledTableRow key={row.subId.subName}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.subId.subName}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.mark}</StyledTableCell>
              <StyledTableCell align="right">`${row.mark} / ${term1Marks.length}`</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
