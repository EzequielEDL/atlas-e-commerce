import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { putResetPassword } from "../../../../controllers/users";
import ForgetPassCode from "./ForgetPassCode";
import {
  Grid,
  Snackbar
 } from  '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgetPassCodeContainer = () => {
  const [open, setOpen] = useState();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
  };

  const handleSubmitFinal = input => {
    putResetPassword(input)
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
          <ForgetPassCode
            handleSubmitFinal={handleSubmitFinal}
          />
        </Grid>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Your password was updated successfully
          </Alert>
        </Snackbar>
        {open && <Redirect to="/signin" delay={3000}/>}{""}

        <Grid item xs={4} sm={4} xl={4}/>
      </Grid>
    </Grid>
  )
};

export default ForgetPassCodeContainer;
