import React from "react";
import AppBar from "@mui/material/AppBar";
import { Button, Toolbar } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartSharp";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getItemCount } from "../utilis";
import { styled, alpha } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { fetchAllCategories } from "../feature/categories-slice";
import { useNavigate } from "react-router-dom";

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
  const theme = useTheme();
  const products = useSelector((state) => state.products?.value);
  const categories = useSelector((state) => state.categories?.value);
  const dispatch = useDispatch();

  const [selectedCategory, setselectedCategory] = useState("All");

  const navigate = useNavigate();

  console.log(categories, "cat");
  if (!categories.length) {
    dispatch(fetchAllCategories());
  }
  function handleCategoryChange(event) {
    const { value } = event.target;
    setselectedCategory(value);
    navigate(selectedCategory === "All" ? "/" : `/?category=${value}`);
  }
  return (
    <Search>
      <Select
        value={selectedCategory}
        size="small"
        sx={{
          m: 1,
          textTransform: "capitalize",
          "&": {
            "::before": {
              ":hover": {
                border: "none",
              },
            },
            "::before, &::after": {
              border: "none",
            },
            ".MuiSelect-standard": {
              color: "common.white",
            },
            ".MuiSelect-icon": {
              fill: theme.palette.common.white,
            },
          },
        }}
        variant="standard"
        labelId="selected-category"
        id="selected-category-id"
        onChange={handleCategoryChange}
      >
        <MenuItem value="all">All</MenuItem>
        {categories?.map((category) => (
          <MenuItem
            sx={{
              textTransform: "capitalize",
            }}
            key={category}
            value={category}
          >
            {category}
          </MenuItem>
        ))}
      </Select>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Array.from(products, (prod) => ({
          id: prod.id,
          label: prod.title,
        }))}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Search>
  );
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
