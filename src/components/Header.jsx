import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartSharp";
import { Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar>
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
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton size="large" aria-label="shows cart items count" color="inherit">
            <Badge badgeContent={2} color="error">
              <ShoppingCartIcon></ShoppingCartIcon>
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
