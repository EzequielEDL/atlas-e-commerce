import React, { useEffect, useState } from 'react';
import { getOrderById, updateOrder } from './../../../controllers/orders';
import { getUserById } from './../../../controllers/users';
import {
  Grid
} from  '@material-ui/core';
import OrderDetails from './OrderDetails';
import AdminNavbar from './../../Admin/AdminNavBar';


const OrderContainer = ({ id }) => {
  const [orderApi, setOrderApi] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getOrderById(id)
    .then(orderRes => {
      setOrderApi(orderRes);
      return getUserById(1);
    })
    .then(userRes => {
      setUser(userRes);
    })
    .catch(err => console.log(err.message))
  }, [id]);

  const handleStatus = event => {
    setOrderApi({
      ...orderApi,
      [event.target.name]: event.target.value
    })
    updateOrder(orderApi.id, {status: event.target.value})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={1} xl={2}/>
        <Grid item xs={1} sm={1} xl={1} style={{paddingRight: "16px"}}>
          <AdminNavbar />
        </Grid>
        <Grid item xs={11} sm={9} xl={7} style={{margin: "32px 0px"}}>
          <OrderDetails order={orderApi} user={user} handleStatus={handleStatus}/>
        </Grid>
        <Grid item xs={false} sm={1} xl={2}/>
      </Grid>
    </Grid>
  );
}

export default OrderContainer;
