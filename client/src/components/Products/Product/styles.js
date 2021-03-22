import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    detailsPrice   : {
        '&::before': {  //pseudo elemento
        content    : "'$'",
        }
    },
    mainImage       : {
        width      : "100%",
        borderRadius: `${theme.spacing(1)}px`,
    },
    previewImage    : {
        width       : "100%",
        borderRadius: `${theme.spacing(1)}px`,
        "&:hover"   : {
            cursor  : 'pointer',
        boxShadow   : '0 0px 8px 0 rgba(255, 255, 255, .2)',
        }
    },
    body: {
      background: theme.palette.background.default,
    },
    bodyTopLeft         : {
      borderRadius   : `${theme.spacing(1)}px 0px 0px 0px`,
      backgroundColor: `${theme.elevation[1]}`,
      padding        : `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    bodyTopRight        : {
      borderRadius   : `0px ${theme.spacing(1)}px 0px 0px`,
      backgroundColor: `${theme.elevation[3]}`,
      padding        : `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    bodyDownRight    : {
      borderRadius   : `0px 0px ${theme.spacing(1)}px 0px`,
      backgroundColor: `${theme.elevation[3]}`,
      padding        : `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    containerButtomLeft: {
      maxHeight: '100px'
    },
    bodyDownLeft     : {
      borderRadius   : `0px 0px 0px ${theme.spacing(1)}px`,
      backgroundColor: `${theme.elevation[0]}`,
      padding        : `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    },
    bodyMargin: {
      margin: `${theme.spacing(3)}px auto`,
    },
    button : {
      width:"100%",
    },
    link: {
        textDecoration:"none",
        color         : theme.palette.text.primary,
        "&:link": {
          textDecoration: 'none',
        }
    },
    categoriesTitle: {
      width: '100%',
    }
}))
