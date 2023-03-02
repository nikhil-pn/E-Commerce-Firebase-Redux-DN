import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Rating
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [products, setproducts] = useState(["prodcut"]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  async function fetchAllProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const result = await response.json();
    setproducts(result);
  }
  return (
    <Container sx={{ py: 8 }} maxWidth="8">
      <Grid container spacing={4}>
        {products.map(({ title, id, price, description, rating, image }) => (
          <Grid item key={id} xs={12} sm={6} md={3}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{}}
                image={image}
                alt={title}
              ></CardMedia>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography>{description}</Typography>
                <Rating readOnly precision={0.5} ></Rating>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
