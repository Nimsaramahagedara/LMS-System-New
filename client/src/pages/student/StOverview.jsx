import React, { useEffect, useState } from 'react'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ColorCard from '../../components/StudentDashboard/ColorCard';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Notifications from '@mui/icons-material/Notifications';
import BarsDataset from '../../components/AdminBarChart';
import { Container } from '@mui/material';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { countAcademicDays, getTerm } from '../../utils/usefulFunctions';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
const StOverview = () => {
  const [classOf, setClass]= useState('');

  const getStudentOverview = async()=>{
    try {
      const data = await authAxios.get(`${apiUrl}/student/get-student-overview`);
      console.log(data.data);
      setClass(data.data?.className);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getStudentOverview();
  },[])
  return (
    <ContainerStudent>
      <div>
        <h1 className='px-4 py-2 bg-blue-950 text-white'><StackedLineChartIcon fontSize='large'/> Progress</h1>
      </div>
      <div className='flex flex-wrap items-center md:justify-between justify-around md:gap-0 gap-2 '>
        <ColorCard bgColor={'#eafce8'} name={'Current Term'} count={`${getTerm()}/3`} icon={<SignalCellularAltIcon/>}/>
        <ColorCard bgColor={'#f5f5dc'} name={'Your Class'} count={classOf} icon={<AddHomeWorkIcon/>}/>
        <ColorCard bgColor={'#ffdab9'} name={'Academic Day'} count={countAcademicDays()} icon={<StackedLineChartIcon/>}/>
        <ColorCard bgColor={'#87ceeb'} name={'Notifications'} count={'10'} icon={<Notifications/>}/>
      </div>
      <div className='px-2 overflow-auto'>
      <div className='w-fit mx-auto'>
        <BarsDataset/>
      </div>
      </div>
      </ContainerStudent>
     
  )
}

export default StOverview