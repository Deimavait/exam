import React from 'react';
import Typography from '@mui/material/Typography';

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
    </nav>
  );
}
