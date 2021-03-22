import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    toolbar  : {
      // backgroundColor: theme.elevation[0],
      width: "100%",
    },
    contentDrawer   : {
      backgroundColor: theme.elevation[0],
    	borderRadius: "0px",
    	padding		: "32px",
        height		: "100%",
    },
    contentCategory: {
        margin     : "32px 0px",
    },
}))
