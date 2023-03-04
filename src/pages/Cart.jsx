import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import  Typography  from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { useTheme } from "@emotion/react";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import { TextField } from "@mui/material";
import { getSubtotal } from "../utilis";


export default function Cart() {
  const theme = useTheme()
  const cart = useSelector((state) => state.cart?.value);
  return (
    <Container sx={{ py: 8 }}>
      <Grid container>
        <Grid item>
        {cart?.map(({ product, quantity }) => {
            const { title, id, price, description, rating, image } = product;
            return (
              <Grid item key={id} xs={12}>
                <Card
                  sx={{
                    display: "flex",
                    py: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    sx={{
                      width: theme.spacing(30),
                      height: theme.spacing(30),
                      objectFit: "contain",
                      pt: theme.spacing(),
                    }}
                    alt={title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <Typography variant="h5">{title}</Typography>
                      <Rating readOnly precision={0.5} value={rating.rate} />
                      <form>
                        <TextField
                          sx={{
                            width: theme.spacing(8),
                          }}
                          inputProps={{
                            min: 0,
                            max: 10,
                          }}
                          id={`${id}-product-id`}
                          type="number"
                          variant="standard"
                          label="Quantity"
                          value={quantity}
                          onChange={(e) => updateQuantity(e, { product, quantity })}
                        ></TextField>
                      </form>
                    </Box>
                    <Box>
                      <Typography variant="h5" paragraph>
                        {getSubtotal([{ product, quantity }])?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Grid item>
          <Typography variant="h4">SubTotal</Typography>
          <Typography variant="h4">{getSubtotal(cart)}</Typography>
          
        </Grid>
      </Grid>
    </Container>
  );
}
