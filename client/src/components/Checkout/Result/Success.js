import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";

import useStyles from "./styles";

const SuccessComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container justify="center" alignItems="center" xs={12}>
        <Grid
          container
          xs={6}
          justify="center"
          className={classes.paymentContainer}
        >
          <img
            src="http://localhost:3000/images/success.svg"
            alt="successimage"
            className={classes.image}
          />
          <Grid xs={12} container justify="center">
            <Typography variant="h3">Your payment was successful</Typography>
          </Grid>
          <Grid xs={12} container justify="center">
            <Typography variant="h6">
              Thank you for your payment, we will be in contact for more details
              shortly.
            </Typography>
          </Grid>
          <Grid xs={12} container justify="center">
            <Link to="/" className={classes.link}>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className={classes.button}
              >
                GO TO HOME
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SuccessComponent;
