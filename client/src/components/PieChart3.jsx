import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import authAxios from '../utils/authAxios';
import { apiUrl } from '../utils/Constants';

const PieChart3 = () => {

  const [overview, setOverview] = useState({});

  useEffect(() => {
    const getOverview = async () => {
      const data = await authAxios.get(`${apiUrl}/admin/get-overview`);
      setOverview(data.data);
    }
    getOverview();
  }, []);

  const data = [
    { id: 0, value: `${overview.teacherCount}`, label: 'Teachers' },
    { id: 1, value: `${overview.studentCount}`, label: 'Students' },
  ]

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