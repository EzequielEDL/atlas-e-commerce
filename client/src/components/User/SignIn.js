import React, { useEffect, useState } from "react";
import { Button, InputLabel, Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import MuiAlert from "@material-ui/lab/Alert";
import ErrorIcon from "@material-ui/icons/Error";
import { signInUser, signInUserWithGoogle } from "../../controllers/users";
import useStyles, { CustomTextField } from "./styles";
import { Link, Redirect } from "react-router-dom";
import { getUser } from "../../stores/user/actions/user_actions";
import { GoogleLogin } from "react-google-login";
import GoogleSvg from "../SvgIcons/GoogleSvg";
import { validations } from "../../validations/signin";
import { connect } from "react-redux";
import { getCart } from "../../stores/cart/actions/cart_actions";
import { handleCreateCart } from "../../controllers/cart";
import {API_HOST} from "../../constants/api";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SignIn = ({ getUser, getCart }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [signInResult, setSignInResult] = useState({
    state: false,
    msg: "",
    alert: "",
    redirect: false,
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      errors.email.length < 1 &&
      errors.password.length < 1 &&
      values.email.length > 0 &&
      values.password.length > 5
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [errors, values]);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validations({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
    console.log(errors);
  };

  /*const responseFailureGoogle = () => {
    setSignInResult({
      state: false,
      msg: "there was an error logging in with google",
      alert: "error",
    });
  };*/

  const responseSuccessGoogle = (response) => {
    signInUserWithGoogle(response)
      .then((response) => {
        if (response.msg === "Login successful") {
          setSignInResult({
            state: true,
            msg: "Sign in with Google successful",
            alert: "success",
          });
          window.localStorage.setItem("session", response.token);
          handleCreateCart(response.user.id).then(() => {
            getUser(response.user);
            getCart(response.user.id);
            setTimeout(() => {
              setSignInResult({
                ...signInResult,
                redirect: true,
              });
            }, 2000);
          });
        } else {
          setSignInResult({
            state: false,
            msg: "There was an error logging in with google",
            alert: "error",
          });
        }
      })
      .catch(() => {
        setSignInResult({
          state: false,
          msg: "There was an error logging in with google",
          alert: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser({
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        if (response.msg === "Login successful") {
          setSignInResult({
            state: true,
            msg: response.msg,
            alert: "success",
          });
          window.localStorage.setItem("session", response.token);
          getUser(response.user);
          getCart(response.user.id);
          setTimeout(() => {
            setSignInResult({
              ...signInResult,
              redirect: true,
            });
          }, 2000);
        }
        if (
          response.msg === "Password invalid" ||
          response.msg === "Email invalid"
        ) {
          setSignInResult({
            state: false,
            msg: response.msg,
            alert: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className={classes.container}
        xs={12}
      >
        <Grid
          container
          xs={6}
          xl={4}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          className={classes.containerCenter}
        >
          <Grid
            item
            xs={6}
            container
            justify="center"
            alignItems="center"
            className={classes.containerLeft}
          >
            {signInResult.alert.length > 1 ? (
              <Alert
                className={classes.alert}
                icon={
                  signInResult.state ? (
                    <CheckIcon fontSize="inherit" />
                  ) : (
                    <ErrorIcon fontSize="inherit" />
                  )
                }
                severity={signInResult.alert}
              >
                {signInResult.msg}
              </Alert>
            ) : (
              <div></div>
            )}
            {signInResult.redirect ? <Redirect to="/" /> : <div></div>}
            <div className={classes.containerForm}>
              <Typography variant="h4" className={classes.title}>
                SIGN-IN
              </Typography>

              <Grid
                item
                container
                xs={12}
                justify="center"
                alignItems="center"
                className={classes.form}
              >
                <form onSubmit={handleSubmit}>
                  <Grid item>
                    <InputLabel
                      color="primary"
                      required={true}
                      className={classes.input}
                    >
                      Email address
                    </InputLabel>
                    <CustomTextField
                      variant="outlined"
                      size="small"
                      name="email"
                      value={values.email}
                      onChange={handleInputChange}
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <InputLabel
                      color="primary"
                      required={true}
                      className={classes.input}
                    >
                      Password
                    </InputLabel>
                    <CustomTextField
                      variant="outlined"
                      size="small"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleInputChange}
                      className={classes.textFieldSignInPassword}
                      fullWidth
                    />
                    <Typography className={classes.forgotPassword}>
                      <Link className={classes.linkPassword} to="/reset">
                        Forgot your password?
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item container justify="center" alignItems="center">
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      className={classes.buttonSignIn}
                      fullWidth
                      disabled={buttonDisabled}
                    >
                      SIGN IN
                    </Button>
                  </Grid>
                  <Grid item container justify="center" alignItems="center">
                    <GoogleLogin
                      clientId="252397862705-ske39b9h6sbcfhst45llmp0glait6i52.apps.googleusercontent.com"
                      buttonText="Sign in with google"
                      onSuccess={responseSuccessGoogle}
                      cookiePolicy={"single_host_origin"}
                      render={(renderProps) => (
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          startIcon={<GoogleSvg />}
                          className={classes.buttonGoogle}
                        >
                          Sign in with Google
                        </Button>
                      )}
                    />
                  </Grid>
                  <Grid>
                    <Typography className={classes.signinText}>
                      New here?
                      <Link className={classes.link} to="/signup">
                        CREATE AN ACCOUNT
                      </Link>
                    </Typography>
                  </Grid>
                </form>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.containerRight}>
            <img
              className={classes.mediaSignIn}
              src={`${API_HOST}/images/signin.png`}
              alt="signupimage"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    getUser: (user) => dispatch(getUser(user)),
    getCart: (userId) => dispatch(getCart(userId)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SignIn);
