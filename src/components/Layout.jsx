import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>Displaying the content</main>
      <footer>footer</footer>
    </ThemeProvider>
  );
}
