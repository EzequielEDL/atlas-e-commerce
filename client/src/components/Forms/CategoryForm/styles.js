import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  grid: {
    margin: theme.spacing(1),
    width : "100%",
  },
  formControl: {
    margin  : theme.spacing(1),
    minWidth: 120,
  },
  input: {
    marginBottom: 18,
  },
  titleSection: {
    margin    : "auto",
  },
}));
