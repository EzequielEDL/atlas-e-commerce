import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        textAlign: 'center',
        marginTop: 30,
        fontSize:'1.5rem'
      },
      emptyButton: {
        margin: 5,
        color: 'black',
      },
      checkoutButton: {
        margin: 5,
        color: 'white',
        backgroundColor: '#e33371',
      },
      title: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: '2rem'
      }
}))