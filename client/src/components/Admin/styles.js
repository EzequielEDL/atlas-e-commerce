import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
  bodyMargin: {
    margin  : `${theme.spacing(3)}px 0px`,
  },
  grid          : {
    borderRadius: `${theme.spacing(1)}px`,
    background  : theme.palette.background.default,
  },
  header        : {
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px 0px`,
    background  : theme.elevation[1],
    padding     : theme.spacing(2),
  },
  body        : {
    background: theme.elevation[3],
  },
  bodyLeft      : {
    padding     : `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    borderRadius: `0px 0px ${theme.shape.borderRadius}px 0px`,
  },
  bodyRight     : {
    padding     : `${theme.spacing(3)}px ${theme.spacing(2)}px`,
    borderRadius: `0px 0px ${theme.shape.borderRadius}px 0px`,
    background  : theme.elevation[0],
  },

// NEW CODE OUT OF ALL THE CONTENT SCREEN
  formControl: {
    width    : "100%",
  },
  icon   : {
    color: theme.palette.text.disabled,
  },
  textField     : {
    margin      : `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    background  : theme.elevation[0],
    borderRadius: theme.shape.borderRadius,
  },
  boxField        : {
    display       : "flex",
    justifyContent: "space-between",
  },
  textFieldHalf: {
    flexGrow   : 1,
    margin     : `${theme.spacing(1)}px ${theme.spacing(1)}px`,
  },
  boxImages: {
    margin : `${theme.spacing(1)}px ${theme.spacing(1)}px`,
  },
  gridList   : {
    padding  : `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    flexWrap : 'nowrap',
    transform: 'translateZ(0)',
  },
  listTile: {
    height: 10,
  },
  title  : {
    color: theme.palette.text.disabled,
  },
  titleBar    : {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  button : {
    width:"100%",
  },
  gridListVertical: {
    margin        : "0px",
    root          : {
      margin      : "0px",
    },
    height              : "480px",
    padding             : theme.spacing(1),
    '@global'           : {
      'MuiGridList-root': {
        margin          : '0px'
      },
    }
  },
  link                : {
      textDecoration  :"none",
      color           : theme.palette.text.primary,
      "&:link"        : {
        textDecoration: 'none',
      }
  },
}));

export default useStyle;
