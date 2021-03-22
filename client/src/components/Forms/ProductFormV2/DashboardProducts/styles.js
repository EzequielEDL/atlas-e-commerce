import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "space-between",
    height: "100%",
    margin: `${theme.spacing(3)} 0px`,
    background: theme.elevation[0],
  },
  gridlisttile: {
    minHeight: '200px'
  },
  card: {
    borderRadius: `${theme.spacing(1)}px 0px ${theme.spacing(1)}px 0px`,
  },
  cover: {
    objectFit: "scale-down",
    display: "flex",
    width: "100%",
  },
  gridList: {
    margin: "0px",
    root: {
      margin: "0px",
    },
    height: "480px",
    padding: theme.spacing(1),
    '@global': {
      'MuiGridList-root': {
        margin: '0px'
      },
    }
  },
  header: {
    borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0px 0px`,
    background: theme.elevation[1],
    padding: theme.spacing(2),
  },
  bodyLeft: {
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
  },
  bodyRight: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    borderRadius: `0px 0px 0px ${theme.spacing(1)}px`,
    background: theme.elevation[0],
  },
  body: {
    background: theme.elevation[0],
  },
  details: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  price: {
      '&::before': {
      content    : "'$'",
      }
  },
  link: {
      textDecoration:"none",
      color         : theme.palette.text.primary,
      "&:link": {
        textDecoration: 'none',
      }
  },
  button: {
    width:"100%",
  },
}));

export default useStyle;
