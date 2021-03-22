import { TextField } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiAlert-standardSuccess": {
      backgroundColor: "red",
    },
  },

  containerForm: {
    borderRadius: "5px",
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'full',
    padding: 30,
    marginTop: 25,
  },
  title: {
    fontSize: "1.9rem",
    margin: 20,
    fontWeight: "500",
  },
  textField: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  input: {
    fontSize: "1rem",
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
