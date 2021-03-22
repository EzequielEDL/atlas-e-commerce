import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    width: 280,
    height: 99,
    borderColor: "#c4c4c4",
    borderWidth: "2px",
    borderRadius: 8,
  },
  content: {
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 6,
    color: "white",
    fontWeight: 500,
    fontSize: 20,
  },
  container: {
    marginTop: 60,
    marginLeft: 0
  },
  secondaryText: {
    fontSize: 15,
    margin: 6,
  },
  icons: {
    padding: 5,
    fontSize: 60,
    color: "#c4c4c4",
  },
  bannerKids: {
    width: 1120,
    height: 210,
    marginTop: 100,
  },
  footer: {
    marginTop: 60,
    background: theme.palette.primary.dark,
    paddingBottom: 15,
    paddingTop: 15,
  },
  link: {
    textDecoration: "none",
    margin: "0px 8px",
    color: theme.palette.text.primary,
    "&:link": {
      textDecoration: "none",
    },
    "&:hover": {
      textShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
    },
  },
  section: {
    maxWidth: 380,
    width: 380,
    minWidth: 380,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  latestTitle: {
    marginBottom: '30px'
  }
}));
