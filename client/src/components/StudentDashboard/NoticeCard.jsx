// NoticeCard.js

import React from 'react';
import { Card, CardContent, Typography, colors } from '@mui/material';

const NoticeCard = ({ title, content, createdAt }) => {
  return (
    <Card sx={{backgroundColor:colors.amber[200]}}>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <p className='text-right text-xs text-gray-300'>{createdAt}</p>
      </CardContent>
    </Card>
  );
};

export default NoticeCard;
