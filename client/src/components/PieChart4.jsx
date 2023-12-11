import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const PieChart4 = ({data}) => {
  return (
    <>
      <h1>Student Diversity</h1>
      <h3>(All Time)</h3>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 15, label: 'May' },
              { id: 1, value: 33, label: 'June' },
              { id: 2, value: 35, label: 'July' },
              { id: 3, value: 12, label: 'August' },
              { id: 4, value: 20, label: 'September' },
              { id: 5, value: 25, label: 'October' },
            ],
          },
        ]}
        width={'400'}
        height={200}
      />
    </>
  );
};

export default PieChart4;