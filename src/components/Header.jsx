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
import { useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../firebase/Auth";

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

//styled autocomplete componet
const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiTextField-root": {
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
  },
  "& .MuiInputBase-input": {
    color: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    fill: theme.palette.common.white,
  },
}));

//search button componet styled wrapper
const SearchIconWrapper = styled("section")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
}));

function SearchBar() {
  const theme = useTheme();
  const products = useSelector((state) => state.products?.value);
  const categories = useSelector((state) => state.categories?.value);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchterm");
  const [selectedCategory, setselectedCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setselectedCategory(category ? category : "all");
  }, [category]);

  if (!categories.length) {
    dispatch(fetchAllCategories());
  }
  function handleCategoryChange(event) {
    const { value } = event.target;
    navigate(value === "all" ? "/" : `/?category=${value}`);
  }

  function handleSearchChange(searchText) {
    if (searchText) {
      navigate(
        selectedCategory === "all"
          ? `?searchterm=${searchText}`
          : `/?category=${selectedCategory}&searchterm=${searchText}`
      );
    } else {
      navigate(
        selectedCategory === "all" ? `/` : `/?category=${selectedCategory}`
      );
    }
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
      <StyleAutocomplete
        freeSolo
        id="selected-product"
        onChange={(e, value) => {
          console.log(value);
          handleSearchChange(value?.label);
        }}
        disablePortal
        options={Array.from(
          selectedCategory === "all"
            ? products
            : products.filter((prod) => prod.category === selectedCategory),
          (prod) => ({
            id: prod.id,
            label: prod.title,
          })
        )}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} />}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
}

export default function Header() {
  const { user, signOut } = useAuth();

  const cartItems = useSelector((state) => state.cart?.value);
  const count = getItemCount(cartItems);
  const navigate = useNavigate();
  function navigateToCart() {
    navigate("/cart");
  }
  return (
    <AppBar
      sx={{
        py: 1,
      }}
    >
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Typography
          variant="h6"
          color="inherit"
          sx={{
            flexGrow: 1,
            color: "whitesmoke",
          }}
        >
          <StyledLink to="/">H3lios Design</StyledLink>
        </Typography>
        <SearchBar></SearchBar>
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton
            onClick={navigateToCart}
            size="large"
            aria-label="shows cart items count"
            color="inherit"
          >
            <Badge badgeContent={count} color="error">
              <ShoppingCartIcon></ShoppingCartIcon>
            </Badge>
          </IconButton>

          {user ? (
            <Button  color="inherit">
              Hello, {user.displayName ?? user.email}
            </Button>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Box>
        
      </Toolbar>
    </AppBar>
  );
}
