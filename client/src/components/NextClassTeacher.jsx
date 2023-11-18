import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
  event.preventDefault();
}

export default function NextClassTeacher() {
  return (
    <>
      <h5>Next Class</h5>
      <Typography component="p" variant="h4">
        10.45 A.M
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        11 - D
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View details
        </Link>
      </div>
    </>
  );
}