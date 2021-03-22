import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Avatar,
  Link
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
     footer: {
       margin: "0px",
       marginTop: "32px",
       bottom: "0",
       padding: `${theme.spacing(2)}px 0px`,
       background: theme.elevation[0],
     }
}));

export default function AdminFooter() {
  const classes = useStyles();

  return (
    <>
      <Grid item container xs={12} justify="center" alignItems="center" className={classes.footer} spacing={1}>
        <Grid item>
            <Typography variant="overline">Atlas - E-Commerce 2021 Some Right Reserved.</Typography>
        </Grid>
        <Grid item container xs={12} spacing={2} justify="center" alignItems="center" style={{margin: "auto"}}>
          <Grid item>
            <Link href="https://github.com/dafevilo">
                <Avatar alt="Dani" src="https://avatars.githubusercontent.com/u/67719970?s=460&v=4" />
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://github.com/EzequielEDL">
                <Avatar alt="Eze" src="https://avatars.githubusercontent.com/u/64182808?s=460&u=631a2981d58969731e172dad5902d5b888771fe1&v=4" />
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://github.com/FrancoMontivero">
                < Avatar alt="Fran" src="https://avatars.githubusercontent.com/u/63619042?s=460&v=4" />
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://github.com/florgranucci">
                 <Avatar alt="Flor" src="https://avatars.githubusercontent.com/u/59897234?s=460&u=cf70b54f4ff7be83928f376d4e32aa99c384d747&v=4" />
            </Link>
          </Grid>
          <Grid item>
            <Link href="https://github.com/nicktify">
                <Avatar alt="Nick" src="https://avatars.githubusercontent.com/u/61167557?s=460&u=af86288390025c78f6f1f229b6c209295e614175&v=4" />
            </Link>
          </Grid>
        </Grid>
        <Grid item>
            <Typography variant="caption">Developed with love by Henry students.</Typography>
            <Link href="https://github.com/nicktify/atlas-e-commerce">
              <Typography variant="caption">GitHub repository</Typography>
            </Link>
        </Grid>
      </Grid>
    </>

  );
}
