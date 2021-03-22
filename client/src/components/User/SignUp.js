import React, { useEffect, useState } from "react";
import { Button, InputLabel, Grid, Typography } from "@material-ui/core";
/*import Alert from "@material-ui/lab/Alert";*/
import MuiAlert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import { Link, Redirect } from "react-router-dom";
import { signUpUser, signInUserWithGoogle } from "../../controllers/users";
import { getUser } from "../../stores/user/actions/user_actions";
import { validations } from "../../validations/signup";
import { getCart } from "../../stores/cart/actions/cart_actions";
import { GoogleLogin } from "react-google-login";
import GoogleSvg from "../SvgIcons/GoogleSvg";
import { connect, useSelector } from "react-redux";
import useStyles, { CustomTextField } from "./styles";
import { getCartById, handleCreateCart, handleItemToCart } from "../../controllers/cart";
import {API_HOST} from "../../constants/api";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SignUp = ({ getUser, getCart }) => {

  const cart = useSelector((state) => state.cart_store);
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordValidator: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [signUpResult, setSignUpResult] = useState({
    msg: "",
    success: false,
    redirect: false,
    isAuthenticatedGoogle: false,
  });
  useEffect(() => {
    if (
      errors.matchedPassword &&
      errors.name.length < 1 &&
      errors.email.length < 1 &&
      errors.password.length < 1
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [errors]);

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
  };

  const responseFailureGoogle = () => {
    setSignUpResult({
      msg: "there was an error logging in with google",
      alert: "error",
    });
  };

  const responseSuccessGoogle = (response) => {
    signInUserWithGoogle(response)
      .then((response) => {
        if (response.msg === "Login successful") {
          setSignUpResult({
            msg: "Sign in with Google successful",
            isAuthenticatedGoogle: true,
            success: true,
          });
          window.localStorage.setItem("session", response.token);
          handleCreateCart(response.user.id).then(() => {
            getUser(response.user);
            getCart(response.user.id);
            setTimeout(() => {
              setSignUpResult({
                ...signUpResult,
                redirect: true,
                isAuthenticatedGoogle: true,
              });
            }, 2000);
          });
        } else {
          setSignUpResult({
            msg: "There was an error logging in with google",
            success: false,
          });
        }
      })
      .then(() => {
        for (let i in cart.products) {
          handleItemToCart(cart.id, cart.products[i].id, cart.products[i].orderLine.quantity)
            .then((res) => {
              console.log(res)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(() => {
        setSignUpResult({
          msg: "There was an error logging in with google",
          success: false,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.matchedPassword &&
      errors.name.length < 1 &&
      errors.email.length < 1 &&
      errors.password.length < 1
    ) {
      signUpUser({
        name: values.name.trim(),
        email: values.email.trim(),
        password_virtual: values.password,
      }).then((res) => {
        console.log(res.msg);
        if (res.msg === "Email already exist") {
          setErrors({
            ...errors,
            email: res.msg,
          });
          setSignUpResult({
            msg: res.msg,
            success: false,
          });
        }
        if (res.msg === "User created successfuly") {
          setSignUpResult({
            msg: res.msg,
            success: true,
          });
          setTimeout(() => {
            setSignUpResult({
              ...signUpResult,
              redirect: true,
            });
          }, 2000);
          handleCreateCart(res.userId)
            .then(() => {
              getUser(res.userId);
              getCartById(res.userId)
                .then((res) => {
                  for (let i in cart.products) {
                    console.log(cart.products[i].id)
                    handleItemToCart(res[0].id, cart.products[i].id, cart.products[i].orderLine.quantity)
                  }
                })
            })
            .catch(err => console.log(err))
        }
      });
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        xs={12}
        className={classes.container}
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
            {signUpResult.success ? (
              <Alert
                className={classes.alert}
                icon={<CheckIcon fontSize="inherit" />}
                severity="success"
              >
                {signUpResult.msg}
              </Alert>
            ) : (
              <div></div>
            )}
            {signUpResult.redirect ? (
              signUpResult.isAuthenticatedGoogle ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/signin" />
              )
            ) : (
              <div></div>
            )}
            <div className={classes.containerForm}>
              <Typography variant="h4" className={classes.title}>
                CREATE ACCOUNT
              </Typography>
              <Grid
                item
                container
                xs={12}
                justify="center"
                alignItems="center"
                className={classes.form}
              >
                <form action="" onSubmit={handleSubmit}>
                  <Grid item>
                    <InputLabel
                      color="primary"
                      required={true}
                      className={classes.input}
                    >
                      Your name
                    </InputLabel>
                    <CustomTextField
                      variant="outlined"
                      size="small"
                      name="name"
                      value={values.name}
                      onChange={handleInputChange}
                      error={errors.name.length > 1}
                      helperText={errors.name ? errors.name : ""}
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <InputLabel
                      className={classes.input}
                      color="primary"
                      required={true}
                    >
                      Your email
                    </InputLabel>
                    <CustomTextField
                      variant="outlined"
                      size="small"
                      name="email"
                      value={values.email}
                      onChange={handleInputChange}
                      error={errors.email.length > 1}
                      helperText={errors.email ? errors.email : ""}
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <InputLabel
                      className={classes.input}
                      color="primary"
                      required={true}
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
                      error={errors.password.length > 1}
                      helperText={errors.password ? errors.password : ""}
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <InputLabel
                      className={classes.input}
                      color="primary"
                      required={true}
                    >
                      Re-enter password
                    </InputLabel>
                    <CustomTextField
                      variant="outlined"
                      size="small"
                      name="passwordValidator"
                      type="password"
                      value={values.passwordValidator}
                      onChange={handleInputChange}
                      error={
                        !errors.matchedPassword && values.password.length > 0
                      }
                      helperText={
                        !errors.matchedPassword && values.password.length > 0
                          ? "The password not match"
                          : ""
                      }
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item container justify="center" alignItems="center">
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      className={classes.buttonSignIn}
                      disabled={buttonDisabled}
                      fullWidth
                    >
                      CREATE ACCOUNT
                    </Button>
                    <GoogleLogin
                      clientId="252397862705-ske39b9h6sbcfhst45llmp0glait6i52.apps.googleusercontent.com"
                      buttonText="Sign in with google"
                      onSuccess={responseSuccessGoogle}
                      onFailure={responseFailureGoogle}
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
                      Already have an account?
                      <Link className={classes.link} to="/signin">
                        SIGN IN
                      </Link>
                    </Typography>
                  </Grid>
                </form>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.containerRight}>
            <img
              className={classes.mediaSignUp}
              src={`${API_HOST}/images/signup.png`}
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
    getCart: (user) => dispatch(getCart(user)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SignUp);
