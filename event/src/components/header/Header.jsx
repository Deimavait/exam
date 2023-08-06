import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        background: '#f0f0f0',
      }}
    >
      <Typography variant='h6'>Hi Admin</Typography>
      <Button variant='contained' color='primary'>
        Register to Event
      </Button>
    </div>
  );
}
