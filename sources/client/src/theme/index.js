import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#4cc5a3',
      main: '#00AD7C',
      dark: '#007956',
    },
    secondary: {
      light: '#DFDFDF',
      main: '#B0B0B0',
      dark: '#8C8C8C',
    },
    third: {
      main: '#f65026',
    },
    background: {
      white: '#FFFFFF',
      whiteSmoke: '#f4f4f4',
      shadow: '#aaaaaa',
    },
  },
  // overrides: { TODO
  //     MuiTypography: {
  //         h1: {
  //             fontSize: "5rem"
  //         }
  //     }
  // }
});

export default theme;
