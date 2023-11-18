import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(sName, grade, dob, gender, address) {
  return { sName, grade, dob, gender, address };
}

const rows = [
];

export default function AdminSimpleTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Student Name</TableCell>
            <TableCell align="right">grade</TableCell>
            <TableCell align="right">dob&nbsp;(D/M/Y)</TableCell>
            <TableCell align="right">gender&nbsp;(Male/Female)</TableCell>
            <TableCell align="right">address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.grade}</TableCell>
              <TableCell align="right">{row.dob}</TableCell>
              <TableCell align="right">{row.gender}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}