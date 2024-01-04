import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/StudentDashboard/PageTitle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ContainerStudent from '../../components/StudentDashboard/ContainerStudent';
import { Typography, colors, Link } from '@mui/material';
import { toast } from 'react-toastify';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import Loader from '../../components/Loader/Loader';
import Cookies from 'js-cookie'; // Import the 'js-cookie' package or relevant library

export default function Notifications() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllNotices = async (userRole) => {
      try {
        const allNotices = await authAxios.get(`${apiUrl}/notices/${userRole}`);

        const designedNotices = allNotices.data.map((el) => {
          const createdAt = new Date(el.createdAt);
          const formattedDate = createdAt.toLocaleDateString('en-GB');
          return {
            id: el.id, // Assuming your notice object has a unique identifier 'id'
            title: el.title,
            description: el.description, // Ensure 'description' exists in your data
            createdAt: formattedDate
          };
        });

        setNotices(designedNotices);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching notices:', error);
        toast.error('Failed to fetch notices');
      }
    };

    const userRole = Cookies.get('userRole');
    if (userRole) {
      getAllNotices(userRole);
    }
  }, []);

  return (
    <div>Notifications</div>
  )
}