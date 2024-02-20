import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import AbcIcon from '@mui/icons-material/Abc';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Typography, colors } from '@mui/material';
import ColorCard from '../../components/StudentDashboard/ColorCard';
import Loader from '../../components/Loader/Loader';
import StarIcon from '@mui/icons-material/Star';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



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

const StudentMarks = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [term1Marks, setTerm1Marks] = useState([]);
  const [term2Marks, setTerm2Marks] = useState([]);
  const [term3Marks, setTerm3Marks] = useState([]);
  const [highestMarks, setHighestMarks] = useState(null);
  const [highestMarksSubject, setHighestMarksSubject] = useState(null);
  const [termWithHighestSum, setTermWithHighestSum] = useState(null);
  const [sum, setAvg] = useState([0, 0, 0]);

  const getUserData = async () => {
    try {
      const user = await authAxios.get(`${apiUrl}/get-user`);
      return user.data._id;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  const getMarksByStudent = async (studentId) => {
    try {
      const result = await authAxios.get(`${apiUrl}/student/get-marks-by-student/${studentId}`);
      return result.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  const separateMarksByTerm = (marks) => {
    const term1Data = marks.filter(mark => mark.term === 1);
    const term2Data = marks.filter(mark => mark.term === 2);
    const term3Data = marks.filter(mark => mark.term === 3);
    return [term1Data, term2Data, term3Data];
  };
  
  const calculateAverage = (termData) => {
    const sumOfMarks = termData.reduce((sum, mark) => sum + mark.mark, 0);
    return termData.length > 0 ? sumOfMarks / termData.length : 0;
  };
  
  const getHighestMarksForTerm = (termData) => {
    return termData.reduce((max, mark) => (mark.mark > max.mark ? mark : max), { mark: 0 });
  };
  
  const getMarks = async () => {
    try {
      const userId = await getUserData();
      const marks = await getMarksByStudent(userId);
  
      if (marks.length === 0) {
        setIsLoading(false);
        return;
      }
  
      const [term1Data, term2Data, term3Data] = separateMarksByTerm(marks);
  
      setTerm1Marks(term1Data);
      setTerm2Marks(term2Data);
      setTerm3Marks(term3Data);
  
      const avgTerm1 = calculateAverage(term1Data);
      const avgTerm2 = calculateAverage(term2Data);
      const avgTerm3 = calculateAverage(term3Data);
  
      const termWithHighestSum = Math.max(avgTerm1, avgTerm2, avgTerm3);
  
      const highestTerm = getHighestMarksForTerm(
        termWithHighestSum === avgTerm1 ? term1Data :
          (termWithHighestSum === avgTerm2 ? term2Data : term3Data)
      );
  
      setAvg([avgTerm1, avgTerm2, avgTerm3]);
      setTermWithHighestSum(highestTerm.term);
      setHighestMarks(highestTerm.mark);
      setHighestMarksSubject(highestTerm.subId.subName);
  
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error('Marks Not published yet');
    }
  };
  
  useEffect(() => {
    getMarks();
  }, []);

  return (
    <ContainerStudent>
      <PageTitle title={'Your Marks'} icon={<AbcIcon fontSize='large' />} bgColor='bg-red-500' />
      {
        !isLoading ?
          <div className='px-5 space-y-5'>
            <div className='flex items-center justify-evenly flex-wrap'>
              {/* <ColorCard name={'Your Current Average'} count={55.5} bgColor={'#eafce8'} icon={<FunctionsIcon />} /> */}
              <ColorCard name={'Highest Mark'} count={highestMarks} bgColor={'#eafce8'} icon={<StarIcon />} />
              <ColorCard name={'Best Performed Subject'} count={highestMarksSubject} bgColor={'#eafce8'} icon={<MenuBookIcon />} />
              <ColorCard name={'Best Performed Term'} count={termWithHighestSum + '/3'} bgColor={'#eafce8'} icon={<AcUnitIcon />} />

            </div>

            <Typography color={colors.red[900]}>Term 1</Typography>
            <div className='w-full overflow-auto'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" size='small'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="right">Subject Name</StyledTableCell>
                      {/* <StyledTableCell align="right">Subject Code</StyledTableCell> */}
                      <StyledTableCell align="right">Makrs</StyledTableCell>
                      <StyledTableCell align="right">Average</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {term1Marks.map((row, index) => (
                      <StyledTableRow key={row.subId.subName}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.subId.subName}</StyledTableCell>
                        {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                        <StyledTableCell align="right">{row.mark}</StyledTableCell>
                        <StyledTableCell align="right">{`${sum[0]}`}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Typography color={colors.red[700]} >Term 2</Typography>
            <div className='w-full overflow-auto'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" size='small'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="right">Subject Name</StyledTableCell>
                      {/* <StyledTableCell align="right">Subject Code</StyledTableCell> */}
                      <StyledTableCell align="right">Makrs</StyledTableCell>
                      <StyledTableCell align="right">Average</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {term2Marks.map((row, index) => (
                      <StyledTableRow key={row.subId.subName}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.subId.subName}</StyledTableCell>
                        {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                        <StyledTableCell align="right">{row.mark}</StyledTableCell>
                        <StyledTableCell align="right">{`${sum[1]}`}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <Typography color={colors.red[500]}>Term 3</Typography>
            <div className='w-full overflow-auto'>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table" size='small'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell align="right">Subject Name</StyledTableCell>
                      {/* <StyledTableCell align="right">Subject Code</StyledTableCell> */}
                      <StyledTableCell align="right">Makrs</StyledTableCell>
                      <StyledTableCell align="right">Average</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {term3Marks.map((row, index) => (
                      <StyledTableRow key={row.subId.subName}>
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.subId.subName}</StyledTableCell>
                        {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                        <StyledTableCell align="right">{row.mark}</StyledTableCell>
                        <StyledTableCell align="right">{`${sum[2]}`}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          : <Loader />}
    </ContainerStudent>


  )
}

export default StudentMarks