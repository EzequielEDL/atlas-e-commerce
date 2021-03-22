import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        padding        : '0px 60px',
        minWidth       : 250,
        maxWidth       : 250,
        "&:hover"      : {
        	boxShadow  : theme.shadows[8],
            color      : theme.palette.secondary.light,
        },
        "&:active"     : {
        	boxShadow  : theme.shadows[16],
        	filter	   : "brightness(0.9)",
        }
    },
  	link: {
        display: "flex",
        textDecoration:"none",
        margin        : "0px 8px",
  	  	color         : theme.palette.text.primary,
  	  	"&:link"      : {
  	    	textDecoration: 'none',
        },
        "&:hover"     : {
            textShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        }
  	},
    header             : {
        height         : "56px",
        background     : theme.palette.primary.main,
        maxWidth       : "100%",
        padding        : '0px 80px'
    },
    div: {
        display: "flex",
        justifyContent: "space-between"
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        minHeight: "56px"
    }


}))
