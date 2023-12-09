import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'Average of All Subjects',
    },
  ],
  width: 700,
  height: 300,
  
  sx: {
    [`.${axisClasses.center} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const dataset = [
  {
    Average: 68,
    term: 'Grade:6:1st',
  },
  {
    Average: 75,
    term: 'Grade:6:2nd',
  },
  {
    Average: 81,
    term: 'Grade:6:3rd',
  },
  {
    Average: 88,
    term: 'Grade:7:1st',
  },
  {
    Average: 67,
    term: 'Grade:7:2nd',
  },
  {
    Average: 47,
    term: 'Grade:7:3rd',
  },
 
];

const valueFormatter = (value) => `${value}`;

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'term' }]}
      series={[
        { dataKey: 'Average', label: 'Average of All Subjects Per Term', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}