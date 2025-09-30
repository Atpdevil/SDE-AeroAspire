import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      main: "#4caf50"
    },
  },
});

createRoot(document.getElementById('root')).render(
<React.StrictMode>
<ThemeProvider theme={theme}>
<CssBaseline />
<App />
</ThemeProvider>
</React.StrictMode>
)