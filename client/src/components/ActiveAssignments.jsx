import * as React from 'react';
import Typography from '@mui/material/Typography';
import { getTerm } from '../utils/usefulFunctions';

export default function ActiveAssignments() {
  return (
    <>
      <h5>Current Term</h5>
      <Typography component="p" variant="h4">
        {getTerm()}/3
      </Typography>
    </>
  );
}