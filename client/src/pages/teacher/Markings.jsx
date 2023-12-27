import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography } from '@mui/material';


const rows = [
  createData('Thissa', '-', 85, '-', '-', 95, 88, 90, 75, 82, 90, 88, 94, 85, 79, 91, 87, 93, 84, 1760, 87.5, 1),
  createData('Saman Kumara', 92, '-', '-', '-', 88, 91, 80, 86, 75, 80, 92, 84, 90, 88, 89, 86, 93, 82, 1750, 87.5, 2),
  createData('Anura', 92, '-', '-', '-', 88, 91, 80, 86, 75, 80, 92, 84, 90, 88, 89, 86, 93, 82, 1750, 87.5, 2),
  createData('Jane Smith', '-', '-', 92, '-', 88, 91, 80, 86, 75, 80, 92, 84, 90, 88, 89, 86, 93, 82, 1750, 87.5, 2),
  createData('Jane Smith', 92, '-', '-', '-', 88, 91, 80, 86, 75, 80, 92, 84, 90, 88, 89, 86, 93, 82, 1750, 87.5, 2),
];

function createData(
  name,
  buddhism,
  catholic,
  christianity,
  islam,
  sinhala,
  mathematics,
  science,
  english,
  history,
  geography,
  purawasi,
  P_T_S,
  health,
  tamil,
  art,
  dancing,
  music,
  drama,
  total,
  average,
  place

) {
  return {
    name,
    buddhism,
    catholic,
    christianity,
    islam,
    sinhala,
    mathematics,
    science,
    english,
    history,
    geography,
    purawasi,
    P_T_S,
    health,
    tamil,
    art,
    dancing,
    music,
    drama,
    total,
    average,
    place,
  };
}


const Markings = () => {
  return (
    <div>
      <Typography textAlign={'center'} variant='h5'>Publish Your Class Marks</Typography>
      <Button variant="outlined" style={{ marginRight: '20px' }}>
        Update Marks
      </Button>

      <Button variant="outlined">
        Generate PDF
      </Button>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Buddhism</TableCell>
              <TableCell align="right">Catholic</TableCell>
              <TableCell align="right">Christianity</TableCell>
              <TableCell align="right">Islam</TableCell>
              <TableCell align="right">Sinhala</TableCell>
              <TableCell align="right">Mathematics</TableCell>
              <TableCell align="right">Science</TableCell>
              <TableCell align="right">English</TableCell>
              <TableCell align="right">History</TableCell>
              <TableCell align="right">Geography</TableCell>
              <TableCell align="right">Human Science</TableCell>
              <TableCell align="right">P.T.S</TableCell>
              <TableCell align="right">Health</TableCell>
              <TableCell align="right">Tamil</TableCell>
              <TableCell align="right">Art</TableCell>
              <TableCell align="right">Dancing</TableCell>
              <TableCell align="right">Music</TableCell>
              <TableCell align="right">Drama</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Average</TableCell>
              <TableCell align="right">Place</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i+1}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.buddhism}</TableCell>
                <TableCell align="right">{row.catholic}</TableCell>
                <TableCell align="right">{row.christianity}</TableCell>
                <TableCell align="right">{row.islam}</TableCell>
                <TableCell align="right">{row.sinhala}</TableCell>
                <TableCell align="right">{row.mathematics}</TableCell>
                <TableCell align="right">{row.science}</TableCell>
                <TableCell align="right">{row.english}</TableCell>
                <TableCell align="right">{row.history}</TableCell>
                <TableCell align="right">{row.geography}</TableCell>
                <TableCell align="right">{row.purawasi}</TableCell>
                <TableCell align="right">{row.P_T_S}</TableCell>
                <TableCell align="right">{row.health}</TableCell>
                <TableCell align="right">{row.tamil}</TableCell>
                <TableCell align="right">{row.art}</TableCell>
                <TableCell align="right">{row.dancing}</TableCell>
                <TableCell align="right">{row.music}</TableCell>
                <TableCell align="right">{row.drama}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                <TableCell align="right">{row.average}</TableCell>
                <TableCell align="right">{row.place}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Markings