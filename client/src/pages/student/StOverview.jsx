import React from 'react'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ColorCard from '../../components/StudentDashboard/ColorCard';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Notifications from '@mui/icons-material/Notifications';
import BarsDataset from '../../components/AdminBarChart';
const StOverview = () => {
  return (
    <div className='px-4 py-10 bg-white space-y-3'>
      <div>
        <h1 className='px-4 py-2 bg-blue-950 text-white'><StackedLineChartIcon sx={{fontSize:'48px'}}/> Progress</h1>
      </div>
      <div className='flex flex-wrap items-center md:justify-between justify-around md:gap-0 gap-2 '>
        <ColorCard bgColor={'#eafce8'} name={'Current Term'} count={'1/3'} icon={<SignalCellularAltIcon/>}/>
        <ColorCard bgColor={'#f5f5dc'} name={'Your Class'} count={'11/A'} icon={<AddHomeWorkIcon/>}/>
        <ColorCard bgColor={'#ffdab9'} name={'Progress'} count={'105%'} icon={<StackedLineChartIcon/>}/>
        <ColorCard bgColor={'#87ceeb'} name={'Notifications'} count={'10'} icon={<Notifications/>}/>
      </div>
      <div className='px-2 overflow-auto'>
      <div className='w-fit mx-auto'>
        <BarsDataset/>
      </div>
      </div>
      
    </div>
  )
}

export default StOverview