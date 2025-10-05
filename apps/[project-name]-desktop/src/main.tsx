import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from 'ui-components';

const desktopTheme = theme('light', "'Inter', sans-serif");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={desktopTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);