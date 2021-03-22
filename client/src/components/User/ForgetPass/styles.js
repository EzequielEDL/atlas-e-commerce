import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  orderContainer: {},
  grid: {
    borderRadius: `${theme.spacing(1)}px`,
    background: theme.palette.background.default,
  },
  gridList: {
    margin: "0px",
    root: {
      margin: "0px",
    },
    height: "480px",
    padding: theme.spacing(1),
    "@global": {
      "MuiGridList-root": {
        margin: "0px",
      },
    },
  },
  header: {
    borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0px 0px`,
    background: theme.elevation[0],
    padding: theme.spacing(2),
  },
  bodyLeft: {
    padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
  },
  bodyRight: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    borderRadius: `0px 0px ${theme.spacing(1)} 0px`,
    background: theme.elevation[1],
  },
  paper: {
    background: theme.elevation[1],
  },
  details: {
    flexGrow: 1,
  },
  button: {
    margin: "5px",
  },
}));

export default useStyle;
