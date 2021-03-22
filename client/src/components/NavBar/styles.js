import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(theme => ({
    searchForm   : {
        width      : '100%',
        position   : 'relative',
        margin     : '0 8px',
        textAlign  : 'center'
    },
    searchInput : {
        backgroundColor : 'rgba(189, 189, 189, .2)',
        color           : 'white',
        borderRadius    : '16px',
        height          : '32px',
        padding         : '6px 50px 7px 35px',
        width           : "75%"
    },
    searchButton : {
        borderRadius            : 0,
        position                : 'absolute',
        right                   : "12%",
        top                     : 0,
        height                  : '100%',
        borderBottomRightRadius : '16px',
        borderTopRightRadius    : '16px',
        color                   : 'rgba(255,255,255,0.70)',
    },
    header : {
        background : theme.palette.background.light,
        padding         : '0px 80px'
    },
    buttonsNav : {
        whiteSpace   : 'nowrap',
        margin       : '0px 8px',
        // borderRadius : '16px',
        color        : 'white'
    },

  buttonsContainer: {
    minWidth: "220px",
  },
  welcomeMessage: {
    fontSize: '.8rem',
    color: 'white',
    width: 150
   },
   menuLinks: {
     color: 'white',
     textDecoration: 'none'
   },
   link                : {
       textDecoration  :"none",
       color           : theme.palette.text.primary,
       "&:link"        : {
         textDecoration: 'none',
       }
   },
   avatar: {
     color: theme.palette.getContrastText(theme.palette.secondary.dark),
     backgroundColor: theme.palette.secondary.main,
   }
}));

export default useStyle;
