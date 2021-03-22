import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@material-ui/core";
import useStyle from "./styles";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../../../stores/cart/actions/all_actions";

const Navbar = ({ idUser }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const productsQuantity = useSelector((state) => state.cart_store.products);
  const cartIconQuantity = productsQuantity.length;

  useEffect(() => {
    if (idUser) {
      dispatch(allActions.getCart(idUser));
    }
  }, [dispatch, idUser]);

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))(Badge);

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.div}>
            <Link to="/" className={classes.link}>
              <Typography>Home</Typography>
            </Link>
            <Link to="/products" className={classes.link}>
              <Typography>Products</Typography>
            </Link>
            <Link to="/aboutus" className={classes.link}>
              <Typography>About us</Typography>
            </Link>
          </div>

          <div className={classes.div}>
            <Link to="/cart" className={classes.link}>
              <IconButton style={{ color: "white" }}>
                <StyledBadge badgeContent={cartIconQuantity} color="secondary">
                  <ShoppingCartOutlinedIcon />
                </StyledBadge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(Navbar);
