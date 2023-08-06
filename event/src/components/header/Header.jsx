import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        background: '#d2d1ca',
        width: '100vw',
      }}
    >
      <Typography variant='h6'>Hi Admin</Typography>
      <Button variant='contained' color='primary'>
        Register to Event
      </Button>
    </nav>
  );
}
