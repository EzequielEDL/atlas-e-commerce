import { TextField } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

export default makeStyles((theme) => ({
  root: {
    "& .MuiAlert-standardSuccess": {
      backgroundColor: "red",
    },
  },
  container: {
    padding: "50px",
  },
  containerCenter: {
    backgroundColor: "radial-gradient(circle at top left, #47495b, #2F3042)",
    borderRadius: "10px",
  },
  containerLeft: {},
  containerRight: {},
  mediaSignIn: {
    padding: "5px",
    width: "100%",
    height: "fit-content",
  },
  mediaSignUp: {
    width: "100%",
    height: "fit-content",
    padding: "5px",
  },
  containerForm: {
    maxHeight: "500px",
    marginLeft: "20px",
  },
  title: {
    fontSize: "1.9rem",
    marginTop: "20px",
    marginBottom: "20px",
    fontWeight: "500",
  },
  form: {},
  textField: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  input: {
    fontSize: "1.2rem",
  },
  button: {
    marginTop: "20px",
    marginBottom: "15px",
  },
  disabled: {
    "&$disabled": {
      backgroundColor: "#217575",
      color:"white",
      marginTop: "20px",
      marginBottom: "15px",
    },
  },
  signinText: {
    fontSize: "1rem",
  },
  link: {
    color: "white",
    marginLeft: "15px",
  },
  textFieldSignInPassword: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  forgotPassword: {
    fontSize: "0.9rem",
  },
  linkPassword: {
    color: "white",
  },
  alert: {
    "& .MuiAlert-message": {
      color: "white",
    },
  },
  buttonGoogle : {
    backgroundColor : "rgba(255, 255, 255, .9)",
    textTransform   : "none",
    margin : "10px 0px",
    color  : "rgb(0,0,0)",
    "&:hover" : {
      backgroundColor : "rgba(255, 255, 255, .9)",
      boxShadow: "0 0px 10px 0 rgb(255, 255, 255)"
    },
    "&:disabled" : {
      backgroundColor : "rgba(255, 255, 255, .4)",
      color  : "rgba(0,0,0,.4)",
    }
  },
  buttonSignIn : {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgba(33, 117, 117, .7)",
    margin : "10px 0px",
    "&:disabled" : {
      color: "rgba(255, 255, 255, .4)",
      backgroundColor: "rgba(33, 117, 117, .4)",
    },
    "&:hover" : {
      backgroundColor: "rgba(33, 117, 117, 1)"
    }
  }
}));

export const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#1FD8D8",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1FD8D8",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#1FD8D8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1FD8D8",
      },
    },
  },
})(TextField);

export const CustomAlert = withStyles({
  root: {
    color: "white",
    "& .MuiAlert-outlinedSuccess": {
      backgroundColor: "black",
    },
    "& .MuiAlert-root": {
      backgroundColor: "red",
    },
  },
})(Alert);
