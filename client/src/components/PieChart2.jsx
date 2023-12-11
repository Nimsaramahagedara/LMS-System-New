import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

const PieChart2 = ({value1 = 5, value2 = 5}) => {

    const data = [
        { id: 0, value: value1, label: 'Male' },
        { id: 1, value: value2, label: 'Female' },
    ];

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

export default PieChart2