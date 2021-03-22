import React from 'react';

import {
  Grid,
  Typography,
  Paper,
  GridList,
  GridListTile,
  Select,
  MenuItem,
  FormControl,
  Avatar
} from  '@material-ui/core';
import LoadingAnim from './../../LoadingAnim/LoadingAnim.js'
import ManSvg from './../../SvgIcons/ManSvg'
import useStyles from "./styles";
import { GET_PRODUCTS } from '../../../constants/api'

const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const OrderDetails = ({ order, user, handleStatus }) => {
  const classes = useStyles();

  console.log(order, user)


  const LeftContent = (
    <Grid item xs={12}>
    {order
      ?(
        <GridList className={classes.gridList} cols={1} spacing={5} cellHeight={140}>
            {order.products.map((item, index) => (
                <GridListTile key={index} cols={1} >
                  <Paper className={classes.root}>
                    <Grid item container xs={12} style={{margin:"auto"}}>
                      <Grid item container xs={3} direction="row"  className={classes.card}>
                        <Grid item>
                          <img className={classes.cover} alt="coverimage" src={`${GET_PRODUCTS}/images/${item.images[0]}`}/>
                        </Grid>
                      </Grid>

                      <Grid item container xs={9} style={{margin: "auto"}}>
                        <div className={classes.details}>
                          <Grid item container xs={12} direction="column" justify="space-between" alignContent="space-between">
                            <Grid item xs={12}><Typography variant="h6">{item.name.substring(0, 40) + '...'}</Typography></Grid>
                            <Grid item container xs={12}>
                              <Grid item xs={8}>
                                <Typography variant="subtitle1" color="textSecondary" className={classes.price}>
                                  {parseFloat(item.price).toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {item.description.substring(0, 40) + '...'}
                                </Typography>
                              </Grid>
                            </Grid>

                          </Grid>
                        </div>
                      </Grid>

                    </Grid>
                  </Paper>
                </GridListTile>
              ))
            }
        </GridList>
      )
      :(
        <LoadingAnim message={"No products"} />
      )
    }
    </Grid>
  );

  const RightContent = (
    <Grid item container xs={12} direction="column" justify="space-between" alignContent="space-between">
      <Grid item><Typography variant="h6" >Made by</Typography></Grid>
      <Grid item>
      {user &&
        <Grid item container xs={12} direction="row" style={{margin: "auto"}} spacing={2}>
          <Grid item>
            <Avatar
              alt="https://i.ibb.co/nbypcHd/default-avatar.jpg"
              sizes="24"
              className={classes.avatar}
            >
              {user.name[0].toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" styles={{padding: "0px"}}>{user.name}</Typography>
            <Typography variant="caption" styles={{padding: "0px"}}>{user.email}</Typography>
          </Grid>
        </Grid>
      }
      </Grid>
      <Grid item>
        <ManSvg width={"100%"} height={"100%"}/>
      </Grid>
      <Grid item>
        {order &&
          <FormControl className={classes.button}>
            <Typography variant="h6" >Change Status</Typography>
            <Select
              variant='outlined'
              className={`${classes.textField} ${classes.button}`}
              onChange={handleStatus}
              name="status"
              value=''
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style={
                (order.status === "Create"   && {color: "rgba(255, 102, 0, 1)", borderColor: "rgba(255, 102, 0, 1)", background: "rgba(255, 102, 0, 0.1)"}) ||
                (order.status === "Process"  && {color: "rgba(255, 255, 0, 1)", borderColor: "rgba(255, 255, 0, 1)", background: "rgba(255, 255, 0, 0.1)"}) ||
                (order.status === "Canceled" && {color: "rgba(255, 0, 0, 1)", borderColor: "rgba(255, 0, 0, 1)", background: "rgba(255, 0, 0, 0.1)"})||
                (order.status === "Success"  && {color: "rgba(0, 255, 0, 1)", borderColor: "rgba(0, 255, 0, 1)", background: "rgba(0, 255, 0, 0.1)"})
              }
            >
              <MenuItem value="" disabled>{order.status}</MenuItem>
              {['Create','Process','Canceled', 'Success'].map((selectStatus, index) => (
                  <MenuItem
                    key={index}
                    value={selectStatus}>
                    {selectStatus}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        }{""}
      </Grid>
    </Grid>
  );

  return (
    <Grid item container>
      <Grid item xs={12}>
        <Paper className={classes.body}>

          <Grid item xs={12} align="center">
            <div className={classes.header}>
              <Typography variant="h6" styles={{padding: "0px"}}>
                {order && `Order created on
                  ${ pad(new Date(order.createdAt).getDay(), 2) }/
                  ${ pad(new Date(order.createdAt).getMonth(), 2) }/
                  ${ pad(new Date(order.createdAt).getDate(), 2) }`
                }
              </Typography>
            </div>
          </Grid>

          <Grid item container>
            <Grid item container xs={8} className={classes.bodyLeft}>
              {LeftContent}
            </Grid>
            <Grid item container xs={4} className={classes.bodyRight}>
              {RightContent}
            </Grid>
          </Grid>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default OrderDetails;
