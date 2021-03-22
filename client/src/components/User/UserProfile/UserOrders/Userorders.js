import axios from 'axios'
import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper
} from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import UserView from "./Userview";
import { NavLink as Link } from "react-router-dom";
import { GET_ORDERS_BY_ID } from '../../../../constants/api'

const Userorders = () => {
  const classes = useStyles();

  const [userOrders, setUserOrders] = useState([])
  const user = useSelector(state => state.user_store.user)
  console.log(user.id)

  useEffect(() => {
    const token = window.localStorage.getItem("session");
    if(token){
      axios({
        method: "GET",
        url: `${GET_ORDERS_BY_ID}/${user.id}/orders`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization" : `BEARER ${token}`
        }
      })
      .then(res => {
        const orders = res.data.filter(o => o.status !== 'onCart')
        setUserOrders(orders)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [user]);
  console.log(userOrders)
  const EmptyOrders = () => (
    <Grid container>
      <Grid item xs={12}>
        <Typography align='center' style={{fontSize: '1.3rem'}}>
          You have no orders right now,
          <Link to='/products' style={{ color: "#45E8E8" }}>
            start shopping!
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );

  const FullOrders = () => (
    <>
      {userOrders.map((order) => (
            <UserView order={order} />
        ))}
    </>
  )

  return (
    <Grid container direction='column'>
      <Typography variant='h4' className={classes.paper} align='center'>
        ORDER HISTORY
      </Typography>
      <Paper style={{padding: 20, width: 700 }}>
      {!userOrders.length ? <EmptyOrders /> : <FullOrders /> }   
      </Paper>
    </Grid>
  );
};

export default Userorders;
