import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'Number Of Periods',
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
    WorkedPeriods: 59,
    month: 'Jan',
  },
  {
    WorkedPeriods: 50,
    month: 'Fev',
  },
  {
    WorkedPeriods: 47,
    month: 'Mar',
  },
  {
    WorkedPeriods: 54,
    month: 'Apr',
  },
  {
    WorkedPeriods: 57,
    month: 'May',
  },
  {
    WorkedPeriods: 60,
    month: 'June',
  },
  {
    WorkedPeriods: 59,
    month: 'July',
  },
  {
    WorkedPeriods: 65,
    month: 'Aug',
  },
  {
    WorkedPeriods: 51,
    month: 'Sept',
  },
  {
    WorkedPeriods: 60,
    month: 'Oct',
  }
];

const valueFormatter = (value) => `${value}`;

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'WorkedPeriods', label: 'Worked Periods', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}