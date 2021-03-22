import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
        root: {
          backgroundColor: theme.elevation[0],
          display: 'flex',
          height: 200,
          marginTop: 50,
          borderRadius: '10px'
        },
        details: {
          width: '100%',
        },
        content: {
          height: '200px',
          width: "100%",
        },
        cover: {
          width: '50%',
          minWidth: '200px',
          display: 'flex',
          borderRadius: '10px'
        },
        infoContainer: {
          height: '70%',
          minWidth: '400px',
          width: '100%',
        },
        delete: {
            backgroundColor: '#d32f2f',
            color: 'white',
            margin: 18,
        },
        cartActions: {
          justifyContent: 'space-between',
        },
        buttons: {
          display: 'flex',
          justifyContent: 'center',
          height: '20px',
          marginTop: '25px'
        },
}))
