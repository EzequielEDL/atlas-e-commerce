import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    background: `${theme.elevation[0]}`,
    maxWidth: 200,
    margin: "16px",
    "&:hover": {
      boxShadow: theme.shadows[8],
    },
    "&:active": {
      boxShadow: theme.shadows[16],
      filter: "brightness(0.9)",
    },
  },
  media: {
    height: 240,
    width: 220,
    backgroundSize: "cover",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  iconButtonColor: {
    position: "absolute",
    right: "8px",
    top: "8px",
    color: "white",
    background: theme.palette.background.light,
    "&:hover": {
      color: theme.palette.secondary.light,
      background: "white",
      boxShadow: `0 0px 12px 0 ${theme.palette.secondary.light}`,
    }
  },
  iconColor: {
    "&:hover": {
      color: theme.palette.secondary.light,
    }
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    "&:link": {
      textDecoration: "none",
    },
  },
  price: {
    "&::before": {
      content: "'$'",
    },
  },
  names: {
    fontSize: "1rem",
  },
  snack: {
    backgroundColor: 'white'
  }
}));
