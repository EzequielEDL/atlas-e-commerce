import React, { useState } from "react";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./styles";
import { AddShoppingCart } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../stores/cart/actions/all_actions";
import { addOneItemToCart, handleItemToCart } from "../../../controllers/cart";

const Product = ({ product, type }) => {
  const classes = useStyles();
  const { id, price, name } = product;
  const cart = useSelector((state) => state.cart_store);
  const products = useSelector((state) => state.cart_store.products);
  const user = useSelector((state) => state.user_store.user);
  const [open, setOpen] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const dispatch = useDispatch();

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseStock = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOutOfStock(false);
  };

  const handleAddToCart = () => {
   if (user.hasOwnProperty('role')) {
      const isInCart = products.filter((p) => p.id === product.id);
      if (isInCart.length === 1) {
        addOneItemToCart(cart.id, product.id)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      } else {
        handleItemToCart(cart.id, product.id, 1)
          .then((response) => {
            if (response.msg === "Product has no more stock available") {
              setOutOfStock(true);
              console.log(response);
            } else {
              console.log(response);
            }
            dispatch(allActions.getCart(user.id));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      dispatch(allActions.postCartGuest(product))
    }
  };

  return (
    <>
      <Card className={classes.root}>
        {type ? (
          <></>
        ) : (
          <div style={{ position: "relative" }}>
            <IconButton
              aria-label="Add to Cart"
              className={classes.iconButtonColor}
              onClick={handleAddToCart}
            >
              <AddShoppingCart className={classes.iconColor} />
            </IconButton>
          </div>
        )}
        <CardMedia className={classes.media} image={product.images[0]} />
        <CardContent>
          <Link to={`/products/search/${id}`} className={classes.link}>
            <Typography className={classes.names}>
              {name.length > 30 ? name.substring(30, 0) + "..." : name}
            </Typography>
          </Link>
          <div className={classes.cardContent}>
            <Typography
              variant="h6"
              color="textSecondary"
              className={classes.price}
            >
              {parseFloat(price).toFixed(2)}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert severity="warning" onClose={handleClose} variant="filled">
          The product was already added to your cart
        </MuiAlert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={outOfStock}
        autoHideDuration={3000}
        onClose={handleCloseStock}
      >
        <MuiAlert severity="error" onClose={handleCloseStock} variant="filled">
          Product is out of stock
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Product;
