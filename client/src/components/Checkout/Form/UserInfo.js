import { Button, Grid, InputLabel, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { CustomTextField } from "../../User/styles";
import { shippingValidation } from "../../../validations/checkout/ShippingInfo";
import useStyles from "./styles";

const UserInfo = ({
  setState,
  userInfoValues,
  setUserInfoValues,
  userInfoErrors,
  setUserInfoErrors,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleChange = (e) => {
    setUserInfoValues({
      ...userInfoValues,
      [e.target.name]: e.target.value,
    });

    setUserInfoErrors(
      shippingValidation({
        ...userInfoValues,
        [e.target.name]: e.target.value,
      })
    );
  };

  useEffect(() => {
    if (
      userInfoErrors.country.length < 1 &&
      userInfoErrors.state.length < 1 &&
      userInfoErrors.city.length < 1 &&
      userInfoErrors.street.length < 1 &&
      userInfoErrors.number.length < 1 &&
      userInfoErrors.postalCode.length < 1 &&
      userInfoErrors.email.length < 1
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userInfoErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState(true);
  };

  const classes = useStyles();

  return (
    <>
      <Grid container justify="center" className={classes.userInfoContainer}>
        <Grid container justify="center">
          <Typography className={classes.title} variant="h6">
            Shipping Information
          </Typography>
          <Grid container justify="center">
            <form
              action="submit"
              onSubmit={handleSubmit}
              className={classes.form}
            >
              <InputLabel className={classes.inputLabel}>Country</InputLabel>
              <CustomTextField
                name="country"
                variant="outlined"
                size="small"
                value={userInfoValues.country}
                onChange={handleChange}
                className={classes.textField}
                error={userInfoErrors.country.length > 1}
                helperText={
                  userInfoErrors.country ? userInfoErrors.country : ""
                }
              />
              <InputLabel className={classes.inputLabel}>State</InputLabel>
              <CustomTextField
                name="state"
                variant="outlined"
                size="small"
                value={userInfoValues.state}
                onChange={handleChange}
                className={classes.textField}
                error={userInfoErrors.state.length > 1}
                helperText={userInfoErrors.state ? userInfoErrors.state : ""}
              />
              <InputLabel className={classes.inputLabel}>City</InputLabel>
              <CustomTextField
                name="city"
                variant="outlined"
                size="small"
                value={userInfoValues.city}
                onChange={handleChange}
                className={classes.textField}
                error={userInfoErrors.city.length > 1}
                helperText={userInfoErrors.city ? userInfoErrors.city : ""}
              />
              <InputLabel className={classes.inputLabel}>Street</InputLabel>
              <CustomTextField
                name="street"
                variant="outlined"
                size="small"
                value={userInfoValues.street}
                onChange={handleChange}
                className={classes.textField}
                error={userInfoErrors.street.length > 1}
                helperText={userInfoErrors.street ? userInfoErrors.street : ""}
              />
              <InputLabel className={classes.inputLabel}>
                Street Number
              </InputLabel>
              <CustomTextField
                name="number"
                variant="outlined"
                size="small"
                value={userInfoValues.number}
                onChange={handleChange}
                className={classes.textField}
                error={userInfoErrors.number.length > 1}
                helperText={userInfoErrors.number ? userInfoErrors.number : ""}
              />
              <InputLabel className={classes.inputLabel}>
                Postal Code
              </InputLabel>
              <CustomTextField
                name="postalCode"
                variant="outlined"
                size="small"
                value={userInfoValues.postalCode}
                onChange={handleChange}
                className={classes.textField}
                error={userInfoErrors.postalCode.length > 1}
                helperText={
                  userInfoErrors.postalCode ? userInfoErrors.postalCode : ""
                }
              />
              <InputLabel className={classes.inputLabel}>Email</InputLabel>
              <CustomTextField
                name="email"
                variant="outlined"
                size="small"
                value={userInfoValues.email}
                onChange={handleChange}
                className={classes.textField}
                error={userInfoErrors.email.length > 1}
                helperText={userInfoErrors.email ? userInfoErrors.email : ""}
              />
              <Grid container justify="center">
                {buttonDisabled ? (
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    classes={{ root: classes.disabled }}
                    disabled={buttonDisabled}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                  >
                    Next
                  </Button>
                )}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfo;
