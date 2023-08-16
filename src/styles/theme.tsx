import { extendTheme } from "@chakra-ui/react"

export const padding = ["2.25rem 1rem", "2.25rem", "5rem", "5rem 12.5rem"]

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      primary: "#bc0812",
      secondary: "#f2f2f2",
      text: "#333",
    },
  },
  fonts: {
    mono: `'Menlo', monospace`,
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
  styles: {
    global: {
      "html, body": {
        color: "text",
        bg: "#fff",
      },
    },
  },
})
