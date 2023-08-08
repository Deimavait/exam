import React from 'react';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
        background: '#a78a7f',
        width: '100vw',
      }}
    >
      <Typography variant='h3'>Hi Admin!</Typography>
    </nav>
  );
}
