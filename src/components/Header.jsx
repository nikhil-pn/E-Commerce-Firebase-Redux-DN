import React from "react";
import AppBar from "@mui/material/AppBar";
import { Button, Toolbar } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartSharp";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { getItemCount } from "../utilis";
import { styled, alpha } from "@mui/material/styles";

const Search = styled("section")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

function SearchBar() {
  return <Search></Search>
}

export default function Header() {
  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          sx={{
            flexGrow: 1,
            color: "whitesmoke",
          }}
        >
          H3lios Design
        </Typography>
        <SearchBar></SearchBar>
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="shows cart items count"
            color="inherit"
          >
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon></ShoppingCartIcon>
            </Badge>
          </IconButton>
        </Box>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
