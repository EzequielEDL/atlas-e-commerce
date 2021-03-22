import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding        : '0px 60px',
        minWidth       : 250,
        maxWidth       : 250,
        "&:hover"      : {
        	boxShadow  : theme.shadows[8],
            color      : theme.palette.primary.dark,
        },
        "&:active"     : {
        	boxShadow  : theme.shadows[16],
        	filter	   : "brightness(0.9)",
        }
    },
  	link: {
        textDecoration:"none",
        margin        : "0px 8px",
  	  	color         : '#000',
  	  	"&:link"      : {
  	    	textDecoration: 'none',
        },
        "&:hover"     : {
            textShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        }
  	},
    header             : {
        position       : "fixed",
        bottom :         "0px",
        button         : "100px",
        height         : "44px",
        background     : '#F2A207',
        maxWidth       : "100%",
        padding        : '0px 80px',
        alignContent:"center",
        alignItems:"center"
    },
    div: {
        display: "flex",
        paddingBottom : 20
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    }
        
        
}))