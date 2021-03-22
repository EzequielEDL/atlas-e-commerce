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


const ForgetPassCode = ({ handleSubmitFinal }) => {
  const [inputs, setInputs] = useState({
    email: '',
    code: '',
    newPassword: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    code: '',
    newPassword: ''
  });
  const classes = useStyles();

  const handleInputChange = event => {
    event.preventDefault();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  const validations = formInput => {
    let errors = {
      email: "",
      code: "",
      newPassword: ""
    };
    if (!formInput.email) errors.email = "Email is required";
    if (!formInput.code) errors.code = "Code is required";
    if (!formInput.newPassword) errors.newPassword = "Password is required";
    return errors
  }

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validations(inputs))
    if (errors.email === "" &&
        errors.code === "" &&
        errors.newPassword === "" ){
      handleSubmitFinal(inputs);
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
                <Typography variant="subtitle1" color="textSecondary">Enter your email again and the reset code.</Typography>
              </Grid>
              <Grid item container direction="column" spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    className={classes.textField}
                    type="text"
                    name="email"
                    error={!!errors.email}
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
                  <TextField
                    variant='outlined'
                    className={classes.textField}
                    type="text"
                    name="code"
                    error={!!errors.code}
                    onChange={handleInputChange}
                    placeholder="Reset Code"
                    InputProps={{
                      endAdornment: <UserIcon className={classes.icon}/>,
                      min: "0",
                      max: "20",
                      maxLength: "20",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    className={classes.textField}
                    type="password"
                    name="newPassword"
                    error={!!errors.newPassword}
                    onChange={handleInputChange}
                    placeholder="New password"
                    InputProps={{
                      endAdornment: <UserIcon className={classes.icon}/>,
                      min: "0",
                      max: "20",
                      maxLength: "20",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" type="submit" className={classes.button}>CHANGE newPassword</Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
};

export default ForgetPassCode;
