import { useTheme } from "@emotion/react";
import { ShoppingCart } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Rating,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart } from "../feature/cart-slice";
import { fetchAllProducts } from "../feature/products-slice";

export default function Home() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchTerm = searchParams.get("searchterm");
  const theme = useTheme();
  const state = useSelector((state) => state.products);

  const { value: products, loading } = state ?? {};
  const dispatch = useDispatch();

  if (!products?.length) {
    dispatch(fetchAllProducts());
  }

  function addProductToCart(product) {
    dispatch(addToCart({ product, quantity: 1 }));
  }

  let filteredProducts =
    category && category !== "all"
      ? products.filter((prod) => prod.category === category)
      : products;
  // filter search term product only func implemented
  filteredProducts = searchTerm
    ? filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  return (
    <Container sx={{ py: 8 }} maxWidth="8">
      <Grid container spacing={4}>
        {filteredProducts?.map(
          ({ title, id, price, description, rating, image }) => (
            <Grid item key={id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: theme.spacing(2, 0),
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    alignSelf: "center",
                    width: theme.spacing(30),
                    height: theme.spacing(30),
                    objectFit: "contain",
                    pt: theme.spacing(),
                  }}
                  image={image}
                  alt={title}
                ></CardMedia>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {description}
                  </Typography>
                  <Typography fontSize="large" paragraph>
                    {price}
                  </Typography>
                  {/* <Rating readOnly precision={0.5}  value={rating.rate}></Rating>  */}
                </CardContent>
                <CardActions
                  sx={{
                    alignSelf: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() =>
                      addProductToCart({
                        title,
                        id,
                        price,
                        description,
                        rating,
                        image,
                      })
                    }
                  >
                    <ShoppingCart></ShoppingCart>
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
}
