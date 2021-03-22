import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper
} from "@material-ui/core";
import {
  CategoryIcon,
  ProductIcon,
  UserIcon,
  OrderIcon
} from "../SvgIcons/IconsMaterial"

import useStyle from "./styles";

const AdminNavbar = () => {
  const classes = useStyle();

  const boxButton = [
    {
      label: "Users",
      icon: UserIcon,
      link: "/admin"
    },
    {
      label: "Products",
      icon: ProductIcon,
      link: "/admin/products"
    },
    {
      label: "Categories",
      icon: CategoryIcon,
      link: "/admin/categories"
    },
    {
      label: "Orders",
      icon: OrderIcon,
      link: "/admin/orders"
    }
  ]

  return (
    <Grid item container
      xs={12}
      direction="column"
      className={classes.bodyMargin}
      justify="space-between">
      {
              boxButton.map((box, index) => (
                <Grid item key={index} style={{padding: "8px 0px"}} xs={12}>
                <Paper className={classes.body} style={{padding: "8px auto", width:"100%"}}>
                  <Link to={box.link} className={classes.link}>
                    <Grid item container xs={12}
                      direction="column"
                      justify="space-around"
                      alignItems="center"
                    >
                      <Grid item container xs={12}
                        justify="center"
                        alignItems="center"
                        style={{padding: "8px 0px 4px 0px"}}>
                          <box.icon fontSize="large"/>
                      </Grid>
                      <Grid item container xs={12}
                        justify="center"
                        alignItems="center"
                        style={{padding: "4px 0px 8px 0px", margin:"auto"}}>
                        <Typography variant="subtitle1">{box.label}</Typography>
                      </Grid>
                    </Grid>
                  </Link>
                </Paper>
                </Grid>
              ))
            }
    </Grid>
  );
};

export default AdminNavbar;
