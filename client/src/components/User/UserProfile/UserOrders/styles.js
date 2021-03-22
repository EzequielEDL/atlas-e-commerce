import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        textAlign: 'center',
        margin: 30,
      },
      emptyButton: {
        margin: 5,
        color: 'black',
      },
      checkoutButton: {
        margin: 5,
        color: 'white',
        backgroundColor: '#e33371',
      }
}))