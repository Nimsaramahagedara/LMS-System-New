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

  const getMarks = async () => {
    try {
      const user = await authAxios.get(`${apiUrl}/get-user`);
      const id = user.data._id;
      const result = await authAxios.get(`${apiUrl}/student/get-marks-by-student/${id}`);

      if (result) {
        const { data } = result;

        // Separate data into different terms
        const term1Data = data.filter(mark => mark.term === 1);
        const term2Data = data.filter(mark => mark.term === 2);
        const term3Data = data.filter(mark => mark.term === 3);

        setTerm1Marks(term1Data);
        setTerm2Marks(term2Data);
        setTerm3Marks(term3Data);

        // Find the term with the highest sum of marks
        const sumOfMarks = (termData) => termData.reduce((sum, mark) => sum + mark.mark, 0);
        const sumTerm1 = sumOfMarks(term1Data);
        const sumTerm2 = sumOfMarks(term2Data);
        const sumTerm3 = sumOfMarks(term3Data);
        setAvg([(sumTerm1 / term1Data.length), sumTerm2 / term2Data.length, sumTerm3 / term3Data.length]);

        const termWithHighestSum = sumTerm1 > sumTerm2
          ? (sumTerm1 > sumTerm3 ? 1 : 3)
          : (sumTerm2 > sumTerm3 ? 2 : 3);

        setTermWithHighestSum(termWithHighestSum);

        // Find subject name for overall highest marks
        const highestMarksForTerm = (termData) => termData.reduce((max, mark) => (mark.mark > max.mark ? mark : max), { mark: 0 });
        const highestTerm = highestMarksForTerm(
          termWithHighestSum === 1 ? term1Data :
            (termWithHighestSum === 2 ? term2Data : term3Data)
        );

        const highestMarks = highestTerm.mark;
        setHighestMarks(highestMarks);

        const subjectNameOfHighestMarksForTerm = highestTerm.subId.subName;
        setHighestMarksSubject(subjectNameOfHighestMarksForTerm);

        setIsLoading(false)
        console.log('Term 1 Marks:', term1Marks);
        console.log('Term 2 Marks:', term2Marks);
        console.log('Term 3 Marks:', term3Marks);
        console.log('Term with Highest Sum of Marks:', termWithHighestSum);
        console.log('Subject of Highest Marks for Term:', subjectNameOfHighestMarksForTerm);
        console.log('Highest Marks:', highestMarks);
        console.log('sum:', sum);
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