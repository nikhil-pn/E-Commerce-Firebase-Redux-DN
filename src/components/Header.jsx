import React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import {Badge} from "@mui/icons-material"

export default function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          sx={{
            flexGrow: 1,
            color: "whitesmoke"
          }}
        >
          H3lios Design
        </Typography>
        <IconButton>
            <Badge badgeContent={1}></Badge>
        </IconButton>
       
      </Toolbar>
    </AppBar>
  );
}
