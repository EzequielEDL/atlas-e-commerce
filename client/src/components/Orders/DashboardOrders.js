import React from 'react';
import { Link } from 'react-router-dom';

import {
  Grid,
  Typography,
  Button,
  Paper,
  GridList,
  GridListTile,
  Chip,
  Select,
  MenuItem,
  FormControl,
  TextField
} from  '@material-ui/core';
import {
  UpdateIcon,
  UserIcon
} from "./../SvgIcons/IconsMaterial";
import LoadingAnim from './../LoadingAnim/LoadingAnim.js'
import ManSvg from './../SvgIcons/ManSvg'
import useStyles from "./styles";

const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const DashboardOrders = ({ orders, handleFilter }) => {
  const classes = useStyles();

  const getTotalPrice = products => {
    let total = 0;
    for (var i = 0; i < products.length; i++) {
      total += parseFloat(products[i].orderLine.price);
    }
    return total.toFixed(2);
  }

  const getTotalQuantity = products => {
    let total = 0;
    for (var i = 0; i < products.length; i++) {
      total += parseFloat(products[i].orderLine.quantity);
    }
    return total.toFixed(2);
  }

  const RightContent = (
    <Grid item xs={12}>
    {orders
      ?(
        <GridList className={classes.gridList} cols={1} spacing={5} cellHeight={140}>
            {orders.map((item, index) => (
                <GridListTile key={index} cols={1}>
                  <Paper className={classes.root}>
                      <Grid item container xs={12} direction="row" justify="space-between" alignContent="space-between" style={{margin: "auto"}}>
                        <Grid item container xs={8} direction="column" justify="flex-start" alignContent="space-between" spacing={1}>
                            <Grid item>
                              <Typography variant="h6">
                                {`Order created on
                                    ${ pad(new Date(item.createdAt).getDay(), 2) }/
                                    ${ pad(new Date(item.createdAt).getMonth(), 2) }/
                                    ${ pad(new Date(item.createdAt).getDate(), 2) }`
                                }
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1" className={classes.price}>
                                {getTotalPrice(item.products)}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {getTotalQuantity(item.products)} Items
                              </Typography>
                            </Grid>
                        </Grid>

                        <Grid item container direction="column" justify="space-between" alignItems="flex-end" xs={4} spacing={1}>

                          <Grid item>
                            <Chip
                              variant="outlined"
                              size="medium"
                              label={item.status}
                              style={
                                (item.status === "Create"   && {color: "rgba(255, 102, 0, 1)", borderColor: "rgba(255, 102, 0, 1)", background: "rgba(255, 102, 0, 0.1)"}) ||
                                (item.status === "Process"  && {color: "rgba(255, 255, 0, 1)", borderColor: "rgba(255, 255, 0, 1)", background: "rgba(255, 255, 0, 0.1)"}) ||
                                (item.status === "Canceled" && {color: "rgba(255, 0, 0, 1)", borderColor: "rgba(255, 0, 0, 1)", background: "rgba(255, 0, 0, 0.1)"})||
                                (item.status === "Success"  && {color: "rgba(0, 255, 0, 1)", borderColor: "rgba(0, 255, 0, 1)", background: "rgba(0, 255, 0, 0.1)"})
                              }
                            />
                          </Grid>

                          <Grid item>
                            <Link to={`orders/edit/${item.id}`} className={classes.link}>
                              <Button startIcon={<UpdateIcon />}>
                                <Typography variant="button">MORE INFORMATION</Typography>
                              </Button>
                            </Link>
                          </Grid>

                        </Grid>

                      </Grid>
                  </Paper>
                </GridListTile>
              ))
            }
        </GridList>
      )
      :(
        <LoadingAnim message={"No orders"} />
      )
    }
    </Grid>
  );

  const LeftContent = (
    <Grid item container xs={12} direction="column" justify="space-between" alignContent="space-between">
      <Grid item>
        <FormControl className={classes.button}>
          <Typography variant="h6" >Filter</Typography>
          <Select
            variant='outlined'
            className={`${classes.textField} ${classes.button}`}
            onChange={handleFilter}
            name="status"
            value=''
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }} >
            <MenuItem value="" disabled>Status</MenuItem>
            {['All', 'Create','Process','Canceled', 'Success'].map((selectStatus, index) => (
                <MenuItem
                  key={index}
                  value={selectStatus}>
                  {selectStatus}
                </MenuItem>
              ))
            }
          </Select>
          <TextField
            variant='outlined'
            className={`${classes.textField}`}
            type="text"
            name="username"
            onChange={handleFilter}
            placeholder="Username"
            InputProps={{
              endAdornment: <UserIcon className={classes.icon}/>,
              min: "0",
              max: "20",
              maxLength: "20",
            }}
          />
        </FormControl>
      </Grid>
      <Grid item>
        <ManSvg width={"100%"} height={"100%"}/>
      </Grid>
    </Grid>
  );

  return (
    <Grid item container>
      <Grid item xs={12}>
        <Paper className={classes.body}>

          <Grid item xs={12} align="center">
            <div className={classes.header}>
              <Typography variant="h6" styles={{padding: "0px"}}>Orders List</Typography>
            </div>
          </Grid>

          <Grid item container>
            <Grid item container xs={4} className={classes.bodyLeft}>
              {LeftContent}
            </Grid>
            <Grid item container xs={8} className={classes.bodyRight}>
              {RightContent}
            </Grid>
          </Grid>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardOrders;
