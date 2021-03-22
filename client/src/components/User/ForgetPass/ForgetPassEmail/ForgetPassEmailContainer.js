import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { postResetCode } from "../../../../controllers/users";
import ForgetPassEmail from "./ForgetPassEmail";
import {
  Grid,
  Snackbar
 } from  '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgetPassEmailContainer = () => {
  const [open, setOpen] = useState();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
  };

  const handleSubmitFinal = input => {
    postResetCode(input)
    .then(() => {
      setOpen(true);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={4} sm={4} xl={4}/>
        <Grid item xs={4} sm={4} xl={4} style={{margin: "32px 0px"}}>
          <ForgetPassEmail
            handleSubmitFinal={handleSubmitFinal}
          />
        </Grid>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Success, check your email
          </Alert>
        </Snackbar>
        {open && <Redirect to="/reset/code" delay={2000} />}{""}

        <Grid item xs={4} sm={4} xl={4}/>
      </Grid>
    </Grid>
  )
};

export default ForgetPassEmailContainer;
