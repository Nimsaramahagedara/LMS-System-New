import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card, CardContent, Typography, colors } from '@mui/material';

export default function AllNotices() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const data = await response.json();
          
          // Filter the data to include only items with category "men's clothing"
          const menClothingData = data.filter(item => item.category === "men's clothing");
          console.log(menClothingData);
          
          setNotices(menClothingData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);    

  return (
    <div>
      {notices.map((value) => {
        return (
          <Accordion key={value.id} style={{ margin: '2 16px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography  sx={{ fontWeight: 'bold'}} >{value.title}</Typography>
              <Typography sx={{ color: 'text.secondary', opacity: 0.5, marginLeft: 'auto' }}>
                {/* {value.date} */}10/13/2023
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {value.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  )
}