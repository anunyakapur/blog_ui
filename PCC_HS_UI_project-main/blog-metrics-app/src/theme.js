// theme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
    primary: {
      main: '#1976d2', // Slightly darker blue
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

export default darkTheme;
