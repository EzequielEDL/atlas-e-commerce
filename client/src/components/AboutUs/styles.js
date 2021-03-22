import { makeStyles } from '@material-ui/styles';

const styleUs = makeStyles ((theme) => ({
    card:{
        display: 'flex',
        justifyContent:'center',
        alignItems: 'ceter',
        flexDirection:'column',
        width: '45%',
        backgroundColor: theme.palette.primary.dark,
        borderRadius: `${theme.spacing(2)}px`,
        margin: `${theme.spacing(1)}px`,
        padding: theme.spacing(2),
    },
    cardHead: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    cardAvatar:{
        width: theme.spacing(10),
        height: theme.spacing(10),
        paddingBottom: theme.spacing(1),
    },
    cartIcon: {
        display:'flex',
        justifyContent: 'center',
        textAlign: 'center',
    },
    cartInfo: {
        display:'flex',
        justifyContent: 'center',
        flexDirection:'column',
        borderRadius: `${theme.spacing(2)}px`,
        backgroundColor: theme.palette.primary.dark
    },
    cardText: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(2),
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
    containerCards: {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        backgroundColor: theme.palette.primary.dark,
        textAlign: 'center',
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        borderRadius: `${theme.spacing(2)}px`,
        width: '92%'
    },
    titleText:{
        fontSize: `1.8rem`,
        fontWeight: '400',
        fontStyle: 'italic'
    }

}))

export default styleUs