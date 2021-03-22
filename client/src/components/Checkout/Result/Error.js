import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";

import useStyles from "./styles";

const ErrorComponent = ({ error }) => {
  const handleClick = () => {
    window.location.reload();
  };
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
            src="http://localhost:3000/images/error.svg"
            alt="errorimage"
            className={classes.image}
          />
          <Grid xs={12} container justify="center">
            <Typography variant="h3">Payment error</Typography>
          </Grid>
          <Grid xs={12} container justify="center"></Grid>
          <Typography variant="h6">{error}</Typography>
          <Grid xs={12} container justify="center">
            <Grid xs={12} container justify="center"></Grid>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.button}
              onClick={handleClick}
            >
              TRY AGAIN
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ErrorComponent;
