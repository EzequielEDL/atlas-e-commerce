import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    maxHeight: 360,
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
    height: 250,
    width: 200,
    paddingTop: "56.25%",
    backgroundSize: "cover",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  link: {
    textDecoration: "none",
    margin: "0px 8px",
    color: theme.palette.text.primary,
    cursor: "pointer",
    "&:link": {
      textDecoration: "none",
    },
    "&:hover": {
      textShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
    },
  },
  title: {
    fontSize: '1rem'
  }
}));
