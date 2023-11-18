import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
  event.preventDefault();
}

export default function ActiveAssignments() {
  return (
    <>
      <h5>Active Assignments</h5>
      <Typography component="p" variant="h4">
        2
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View details
        </Link>
      </div>
    </>
  );
}