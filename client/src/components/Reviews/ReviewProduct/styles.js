import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
  grid          : {
    borderRadius: `${theme.spacing(1)}px`,
    background  : theme.palette.background.default,
  },
  header        : {
    borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0px 0px`,
    background  : theme.elevation[0],
    padding     : theme.spacing(2),
  },
  body        : {
    background: theme.elevation[1],
  },
  starSelect : {
    cursor: "pointer",
    '&:hover': {
      color: theme.palette.secondary.main,
    }
  },
  textField     : {
    width       : "100%",
    background  : theme.elevation[0],
    borderRadius: theme.shape.borderRadius,
  },
  formControl: {
    width    : "100%",
  },
  content  : {
    padding: theme.spacing(2)
  },
  avatar: {
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
    backgroundColor: theme.palette.secondary.main,
  }
}));

export default useStyle;
