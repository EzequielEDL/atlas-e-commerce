import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button
} from  '@material-ui/core';
import { UserIcon } from '../../../SvgIcons/IconsMaterial'
import useStyles from "./styles";


const ForgetPassEmail = ({ handleSubmitFinal }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({ email: ''});
  const classes = useStyles();

  const handleInputChange = event => {
    event.preventDefault();
    setEmail({
      [event.target.name]: event.target.value
    })
  }

  const validations = formInput => {
    let error = {
      email: "",
    };
    if (!formInput) error.email = "Email is required";
    return error
  }

  const handleSubmit = event => {
    event.preventDefault();
    setError(validations(email));
    if (error.email === '') {
      handleSubmitFinal(email);
    }
  }

  return (
    <Grid item container>
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <form onSubmit={handleSubmit}>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="h6">Password assistance</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color="textSecondary">Enter your email to recover your password. You will receive an email with instructions.</Typography>
              </Grid>
              <Grid item container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    className={classes.textField}
                    type="text"
                    name="email"
                    error={!!error.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    InputProps={{
                      endAdornment: <UserIcon className={classes.icon}/>,
                      min: "0",
                      max: "20",
                      maxLength: "20",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" type="submit" className={classes.button}>CONTINUE</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
};

export default ForgetPassEmail;
