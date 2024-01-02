import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
  event.preventDefault();
}

export default function NextClassTeacher({count = 0}) {
  return (
    <>
      <h5>Academic Day</h5>
      <Typography component="p" variant="h4">
        {count}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>

      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          count again
        </Link>
      </div>
    </>
  );
}