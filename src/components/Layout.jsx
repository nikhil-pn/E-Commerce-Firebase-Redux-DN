import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header>header</header>
      <main>Displaying the content</main>
      <footer>footer</footer>
    </ThemeProvider>
  )
}
