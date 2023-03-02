import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
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
      <main>
        <Outlet></Outlet>
      </main>
      <footer>footer</footer>
    </ThemeProvider>
  );
}
