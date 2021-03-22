import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  container: {
    padding: "30px",
  },
  userInfoContainer: {
    marginTop: "80px",
  },
  form: {
    marginTop: "40px",
    maxWidth: "260px",
  },
  inputLabel: {
    fontSize: "14px",
    minWidth: "200px",
  },
  textField: {
    marginTop: "5px",
    marginBottom: "10px",
    width: "250px",
  },
  docType: {
    marginTop: "5px",
    marginBottom: "10px",
  },
  formControl: {
    width: "100%",
  },
  textFieldExpirationDate: {
    width: "60px",
    marginRight: "10px",
    marginTop: "5px",
    marginBottom: "10px",
  },
  textFieldSecurityCode: {
    width: "80px",
    marginTop: "5px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    width: "200px",
    marginTop: "30px",
    marginBottom: "50px",
  },
  disabled: {
    "&$disabled": {
      backgroundColor: "#217575",
      width: "200px",
      color: "white",
      marginTop: "20px",
      marginBottom: "15px",
    },
  },
  backButton: {
    marginBottom: "40px",
  },
}));
