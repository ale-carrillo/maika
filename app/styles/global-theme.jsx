"use client"; // Puedes omitir esto si no es necesariWe can ommit this is not necesary 

import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#800020",
    },
    secondary: {
      main: "#C0A35E",
    },
    background: {
      default: "#FDF6E3",
    },
    text: {
      primary: "#000000",
      secondary: "#7D7D7D",
    },
    highlight: {
      main: "#50C878",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: {
      fontWeight: 400,
      color: "#333333",
    },
  },
});
