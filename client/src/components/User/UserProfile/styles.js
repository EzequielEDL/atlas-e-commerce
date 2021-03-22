import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  input: {
    display: "none",
  },
  button: {
    border: "none",
    color: "white",
    fontSize: '.8rem',
  },
  large: {
    width: 150,
    height: 150,
    border: "3px solid grey",
    margin: "0 auto 16px",
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
    backgroundColor: theme.palette.secondary.main,
  },
  icons: {
    margin: 8,
  },
  body: {
      backgroundColor: theme.elevation[0],
      witdh: 'auto',
      padding: 30,
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  menuLinks: {
    color: 'white',
    textDecoration: 'none'
  }


}));
