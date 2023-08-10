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
        fontWeight: '500',
      }}
    >
      <Typography variant='h2'>Hi Admin!</Typography>
    </nav>
  );
}
