import React from 'react';
import UsersList from './UsersList/UsersList'

import {
  Grid
} from  '@material-ui/core';
import AdminNavbar from './AdminNavBar';


const AdminDashboard = () => {


  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={1} xl={2}/>
        <Grid item xs={1} sm={1} xl={1} style={{paddingRight: "16px"}}>
          <AdminNavbar />
        </Grid>
        <Grid item xs={11} sm={9} xl={7} style={{margin: "32px 0px"}}>
          <UsersList />
        </Grid>
        <Grid item xs={false} sm={1} xl={2}/>
        <Grid item xs={false} sm={1} xl={2}/>
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
