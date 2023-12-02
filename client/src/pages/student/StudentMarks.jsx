import React, { useState } from 'react'
import PageTitle from '../../components/StudentDashboard/PageTitle'
import AbcIcon from '@mui/icons-material/Abc';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Typography, colors } from '@mui/material';
import MarksTable from '../../components/StudentDashboard/MarksTable';
import ColorCard from '../../components/StudentDashboard/ColorCard';
import FunctionsIcon from '@mui/icons-material/Functions';
import StarIcon from '@mui/icons-material/Star';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const StudentMarks = () => {
  const [term, setTerm] = useState(1);

  const handleTermChange = (e)=>{
    setTerm(e.target.value)
  }
  return (
    <ContainerStudent>
      <PageTitle title={'Your Marks'} icon={<AbcIcon fontSize='large' />} bgColor='bg-red-500' />
      <div className='px-5 space-y-5'>
        <div className='flex items-center justify-evenly flex-wrap'>
        <ColorCard name={'Your Current Average'} count={55.5} bgColor={'#eafce8'} icon={<FunctionsIcon/>}/>
        <ColorCard name={'Highest Mark'} count={95} bgColor={'#eafce8'} icon={<StarIcon/>}/>
        <ColorCard name={'Best Performed Subject'} count={'English'} bgColor={'#eafce8'} icon={<MenuBookIcon/>}/>
        <ColorCard name={'Best Performed Term'} count={'1/3'} bgColor={'#eafce8'} icon={<AcUnitIcon/>}/>
        
        </div>
       
        <Typography color={colors.red[900]}>Term 1</Typography>
        <div className='w-full overflow-auto'>
          <MarksTable/>
        </div>
        <Typography color={colors.red[700]} >Term 2</Typography>
        <div className='w-full overflow-auto'>
          <MarksTable/>
        </div>
        <Typography color={colors.red[500]}>Term 3</Typography>
        <div className='w-full overflow-auto'>
          <MarksTable/>
        </div>
      </div>
    </ContainerStudent>


  )
}

export default StudentMarks