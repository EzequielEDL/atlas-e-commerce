import React, { useEffect, useState } from "react";
import ItemCart from "./ItemCart/ItemCart";
import ItemGuestCart from "./ItemCart/ItemGuestCart";
import useStyles from "./styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { NavLink as Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import allActions from "../../stores/cart/actions/all_actions";

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user_store.user);
  const userId = user.id;
  const cartItems = useSelector((state) => state.cart_store.products);
  const cartTotal = useSelector((state) => state.cart_store.total);
  
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (user.hasOwnProperty('role')) {
      dispatch(allActions.getCart(user.id));
    }
    /* eslint-disable */
  }, []);

  const EmptyCart = () => (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography className={classes.paper}>
          You have no items in your shopping cart,
          <Link to="/products" style={{ color: "#45E8E8" }}>
            start adding some!
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );

  const FilledGuestCart = () => (
    <>
      <Grid
        container
        xs={12}
        direction="row"
        justify="center"
        className={classes.root}
        spacing={6}
        wrap="wrap"
      >
        <Grid container xs={8} justify="center">
          <div>
            <Grid item>
              {cartItems &&
                cartItems.map((item) => (
                  <ItemGuestCart
                    key={item.name}
                    product={item}
                  />
                ))}
            </Grid>
          </div>
        </Grid>

        <Grid container xs={8} justify="center">
          <div className={classes.paper}>
            <Typography variant="h6" color="primary">
              TOTAL:
            </Typography>
            <Typography variant="h4"> US$: {parseFloat(cartTotal).toFixed(2)} </Typography>

            <Button
              className={classes.emptyButton}
              variant="contained"
              color="primary"
              onClick={() => dispatch(allActions.emptyCart(userId))}
            >
              Empty cart
            </Button>
            <Button
              className={classes.checkoutButton}
              component={Link}
              to="/checkout"
              variant="contained"
              color="secondary"
            >
              Checkout
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );

  const FilledCart = () => (
    <>
      <Grid
        container
        xs={12}
        direction="row"
        justify="center"
        className={classes.root}
        spacing={6}
        wrap="wrap"
      >
        <Grid container xs={8} justify="center">
          <div>
            <Grid item>
              {cartItems &&
                cartItems.map((item) => (
                  <ItemCart
                    key={item.name}
                    product={item}
                    cartId={item.orderLine.cartId && item.orderLine.cartId}
                    change={change}
                    setChange={setChange}
                  />
                ))}
            </Grid>
          </div>
        </Grid>

        <Grid container xs={8} justify="center">
          <div className={classes.paper}>
            <Typography variant="h6" color="primary">
              TOTAL:
            </Typography>
            <Typography variant="h4"> US$: {parseFloat(cartTotal).toFixed(2)} </Typography>

            <Button
              className={classes.emptyButton}
              variant="contained"
              color="primary"
              onClick={() => dispatch(allActions.emptyCart(userId))}
            >
              Empty cart
            </Button>
            <Button
              className={classes.checkoutButton}
              component={Link}
              to="/checkout"
              variant="contained"
              color="secondary"
            >
              Checkout
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );

  if (user.hasOwnProperty('role')) {
    return (
      <>
        <Typography className={classes.title}>Shopping Cart</Typography>
        {!cartItems.length ? <EmptyCart /> : <FilledCart />}
      </>
    );
  } else {
    console.log('here')
    return (
      <>
        <Typography className={classes.title}>Shopping Cart</Typography>
        {!cartItems.length ? <EmptyCart /> : <FilledGuestCart />}
      </>
    );

  }

};

export default Cart;
