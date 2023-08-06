import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigateTo = useNavigate();

  const handleLogin = async () => {
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/admin-login', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const body = await response.json();

      if (body.error) {
        console.error(body.error);
        alert('Incorrect email or password');
        return;
      }
      localStorage.setItem('token', body.token);
      navigateTo('/main-page');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant='h3' component='h3' sx={{ color: '#616143' }}>
        Admin Log In
      </Typography>

      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <TextField
            required
            id='outlined-required'
            label='Email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>
              Password*
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </div>
        <Button
          variant='outlined'
          sx={{ color: '#616143', border: '1px solid #616143' }}
          onClick={handleLogin}
        >
          Log In
        </Button>
      </Box>
    </>
  );
}
