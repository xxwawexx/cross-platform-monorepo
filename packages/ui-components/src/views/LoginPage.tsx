"use client";

import React from 'react';
import { Box, Paper, Typography, TextField, Grid } from '@mui/material';
import { Button } from '../components/elements/Button';

export const LoginPage = () => {
  
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        size={{ xs: false, sm: 4, md: 7 }}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
        }}
      />
      <Grid
        size={{ xs: 12, sm: 8, md: 5 }}
        component={Paper}
        elevation={6}
        square
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};