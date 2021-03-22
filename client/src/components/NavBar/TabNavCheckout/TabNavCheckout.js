import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import useStyle from "./styles";
import { Link } from "react-router-dom";

const TabNavCheckout = () => {
  const classes = useStyle();

  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.div}>
            <Link to="/" className={classes.link}>
              <Typography>Hey! Congratulations! you have a products in your Cart  Check Sold Out</Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TabNavCheckout;
