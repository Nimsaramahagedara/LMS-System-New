import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import authAxios from '../utils/authAxios';
import { apiUrl } from '../utils/Constants';

export default function LineChartTeacher() {
  const theme = useTheme();

  const [attendanceCountArray, setAttendanceCountArray] = useState([]);

  const getAttendance = async () => {
    try {
      const result = await authAxios.get(`${apiUrl}/teacher/attendance`);
      if (result) {
        const attendanceData = result.data.attendanceData;

        const newAttendanceCountArray = attendanceData.map((attendanceItem) => {
          return {
            date: attendanceItem.date,
            amount: attendanceItem.attendedStudents.length,
          };
        });

        setAttendanceCountArray(newAttendanceCountArray);
      } else {
        toast.error('Data Not Available');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);


  return (
    <ResponsiveContainer>
      <LineChart
        data={attendanceCountArray}
        margin={{
          top: 16,
          right: 16,
          bottom: 20,
          left: 24,
        }}
      >
        <XAxis
          dataKey="date"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        />
        <YAxis
          dataKey="amount"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        >
          <Label
            angle={270}
            position="left"
            style={{
              textAnchor: 'middle',
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          >
            Students
          </Label>
        </YAxis>
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="amount"
          stroke={theme.palette.primary.main}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}