import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

export const theme = extendTheme({
  breakpoints,
  colors: {
    primary: '#bc0812',
    gray: {
      lg: '#f4f6f7',
      md: '#575958',
      dk: '#282828',
    },
  },
  fonts: {
    mono: `'Menlo', monospace`,
    body: `'Roboto', sans-serif`,
    heading: `'Roboto', sans-serif`,
  },
  fontSizes: {
    sm: '1rem',
    md: '1.25rem',
    lg: '2.25rem',
    xl: '2.5rem',
  },
  sizes: {
    xs: '15rem',
    sm: '22.5rem',
  },
  radii: {
    sm: '5px',
  },
});
