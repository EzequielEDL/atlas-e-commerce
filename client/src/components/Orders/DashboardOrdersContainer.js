import React, { useEffect, useState } from "react";
import { getOrders, getOrdersById } from "./../../controllers/orders";
import { getUsers } from "./../../controllers/users";
import { Grid } from "@material-ui/core";
import DashboardOrders from "./DashboardOrders";
import AdminNavbar from "../Admin/AdminNavBar";

const DashboardOrdersContainer = () => {
  const [ordersApi, setOrdersApi] = useState();
  const [ordersFilter, setOrdersFilter] = useState();
  const [users, setUsers] = useState();
  // const [orderUser, setOrderUser] = useState();

  useEffect(() => {
    getOrders()
      .then((ordersRes) => {
        let ordersResult = ordersRes.filter(order => order.status !== "onCart")
        setOrdersApi(ordersResult);
        setOrdersFilter(ordersResult);
      })
      .catch((err) => console.log(err.message));

    getUsers()
      .then((usersRes) => {
        setUsers(usersRes);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleFilter = (event) => {
    let result = ordersFilter;
    if (event.target.name === "username") getOrdersUser(event.target.value);

    if (event.target.name === "status") {
      result =
        event.target.value === "All"
          ? setOrdersFilter(ordersApi)
          : setOrdersFilter(
              ordersApi.filter((order) => order.status === event.target.value)
            );
    }
    return result;
  };

  const getOrdersUser = (name) => {
    let userFinded = users.find((user) => user.name === name);
    if (userFinded) {
      getOrdersById(userFinded.id)
        .then((ordersRes) => {
          setOrdersFilter(ordersRes);
        })
        .catch((err) => console.log(err));
    } else {
      setOrdersFilter(ordersApi);
    }
  };

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={1} xl={2} />
        <Grid item xs={1} sm={1} xl={1} style={{ paddingRight: "16px" }}>
          <AdminNavbar />
        </Grid>
        <Grid item xs={11} sm={9} xl={7} style={{ margin: "32px 0px" }}>
          <DashboardOrders orders={ordersFilter} handleFilter={handleFilter} />
        </Grid>
        <Grid item xs={false} sm={1} xl={2} />
      </Grid>
    </Grid>
  );
};

export default DashboardOrdersContainer;
