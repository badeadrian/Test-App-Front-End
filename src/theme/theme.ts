import { createTheme } from '@mui/material/styles';

// Define a custom theme for MUI components
const theme = createTheme({
  // Define primary and secondary color palettes
  palette: {
    primary: {
      light: '#D8BFD8',
      main: '#D8BFD8',  // Main primary color
      dark: '#4B4B4B',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#4db6ac',
      main: '#19857b',  // Main secondary color
      dark: '#00796b',
      contrastText: '#ffffff',
    },
  },
  // Configure typography settings
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',  // Default font family
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  // Define a spacing unit for margin and padding
  spacing: 8,
  // Define border radius for components
  shape: {
    borderRadius: 4,
  },
  // Provide reusable style definitions
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48,
      },
      '@media (min-width:600px)': {
        minHeight: 64,
      },
    },
  },
});

export default theme;
