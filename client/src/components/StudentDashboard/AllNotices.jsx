import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';

export default function AllNotices({ role }) {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/notices/${role}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const dataText = await response.text();
        console.log('Response text:', dataText);

        // Parse the response text only if it's not empty
        const data = dataText ? JSON.parse(dataText) : {};
        setNotices(data.notices || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [role]);

  return (
    <div>
      {notices.map((value) => (
        <Accordion key={value._id} style={{ margin: '2 16px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: 'bold' }}>{value.title}</Typography>
            <Typography sx={{ color: 'text.secondary', opacity: 0.5, marginLeft: 'auto' }}>
              10/13/2023
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {value.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
