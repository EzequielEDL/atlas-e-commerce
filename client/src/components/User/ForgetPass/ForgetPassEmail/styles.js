import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "space-between",
    height: "100%",
    // margin: `${theme.spacing(3)} 0px`,
    padding: `${theme.spacing(2)}px`,
    background: theme.elevation[0],
  },
  button: {
    width:"100%",
  },
  textField     : {
    width       : "100%",
    margin      : `${theme.spacing(1)}px 0px`,
    background  : theme.elevation[0],
    borderRadius: theme.shape.borderRadius,
  },
  icon   : {
    color: theme.palette.text.disabled,
  },
}));

export default useStyle;
