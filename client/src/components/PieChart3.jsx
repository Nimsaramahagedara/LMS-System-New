import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

const PieChart3 = ({data =  [
  { id: 0, value: 10, label: 'Teachers' },
  { id: 1, value: 15, label: 'Halls' },
  { id: 2, value: 20, label: 'Students' },
],}) => {
  return (
    <PieChart
  series={[
    {
      data: data
    },
  ]}
  width={'400'}
  height={200}
/>
  )
}

export default PieChart3