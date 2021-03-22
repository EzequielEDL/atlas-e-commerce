import React from "react";
import {
  Grid,
  Typography,
  Chip,
  Button,
  Divider
} from "@material-ui/core";
import { NavLink as Link } from "react-router-dom";

const Userview = ({ order }) => {
  const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  };

  const totalPrice = order.products.reduce((prev, {orderLine}) => parseFloat(prev) + parseFloat(orderLine.price), 0).toFixed(2)
  return (
    <>
      <Grid container direction='column' spacing={2}>
      <Divider />
      <Grid item>
        <Chip
          label={order.status}
          style={
            (order.status === "Create" && {
              color: "rgba(255, 102, 0, 1)",
              borderColor: "rgba(255, 102, 0, 1)",
              background: "rgba(255, 102, 0, 0.1)",
              marginBottom: 10,
              marginTop: 15,
              maxWidth: 90
            }) ||
            (order.status === "Process" && {
              color: "rgba(255, 255, 0, 1)",
              borderColor: "rgba(255, 255, 0, 1)",
              background: "rgba(255, 255, 0, 0.1)",
              marginBottom: 10,
              marginTop: 15,
              maxWidth: 90
            }) ||
            (order.status === "Canceled" && {
              color: "rgba(255, 0, 0, 1)",
              borderColor: "rgba(255, 0, 0, 1)",
              background: "rgba(255, 0, 0, 0.1)",
              marginBottom: 10,
              marginTop: 15,
              maxWidth: 90
            }) ||
            (order.status === "Success" && {
              color: "rgba(0, 255, 0, 1)",
              borderColor: "rgba(0, 255, 0, 1)",
              background: "rgba(0, 255, 0, 0.1)",
              marginBottom: 10,
              marginTop: 15,
              maxWidth: 95
            })
          }
        />
        <Typography style={{ fontSize: ".9rem" }} align='left'>
          {`Order created on
                  ${pad(new Date(order.createdAt).getDay(), 2)}/
                  ${pad(new Date(order.createdAt).getMonth(), 2)}/
                  ${pad(new Date(order.createdAt).getDate(), 2)}`}
        </Typography>

      </Grid>
        {order.products.map((p) => (
          <Grid item key={p.id}>
            <Typography variant='h6'>{p.name}</Typography>
            <Typography variant='body1'>US$: {p.price}</Typography>
                <Button
                style={{margin: 5}}
                  size='small'
                  color='primary'
                  component={Link}
                  to={`/products/search/${p.id}`}>
                  View product
                </Button>
          </Grid>
        ))}
                <div>
                  <Typography align='right' style={{marginBottom: 5, fontSize: '1.1rem'}}>
                  SUBTOTAL: US${totalPrice}
                  </Typography>
                </div>
      </Grid>
    </>
  );
};

export default Userview;
