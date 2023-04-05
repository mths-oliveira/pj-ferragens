import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
})

export const theme = extendTheme({
  breakpoints,
  colors: {
    primary: "#bc0812",
    gray: {
      lg: "#f4f6f7",
      md: "#575958",
      dk: "#282828",
    },
  },
  fonts: {
    mono: `'Menlo', monospace`,
    body: `'Roboto', sans-serif`,
    heading: `'Roboto', sans-serif`,
  },
  fontSizes: {
    xs: "1rem",
    sm: "1.125rem",
    md: "1.25rem",
    lg: "2.25rem",
    xl: "2.5rem",
  },
  sizes: {
    xs: "15.5rem",
    md: "22.5rem",
  },
  shadows: {
    outline: "0 0 0 2px #0000FF99",
  },
  radii: {
    sm: "5px",
  },
  styles: {
    global: {
      "html, body": {
        bg: "#fff",
        color: "#575958",
      },
      ul: {
        listStyleType: "none",
      },
    },
  },
})
