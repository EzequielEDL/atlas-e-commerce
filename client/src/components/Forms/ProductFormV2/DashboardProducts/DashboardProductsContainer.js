import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../../../controllers/products';
import {
  Grid
} from  '@material-ui/core';
import DashboardProducts from './DashboardProducts';
import AdminNavbar from '../../../Admin/AdminNavBar';

const DashboardProductsContainer = () => {
  const [productsApi, setProductsApi] = useState();

  useEffect(() => {
    getProducts()
    .then(data => {
        setProductsApi(data);
    })
    .catch(err => {
        console.log(err.message);
    })
  }, []);

  const handleDelete = id => {
    deleteProduct(id)
    .then(res => {
      console.log(res)
      return getProducts()
    })
    .then(data => {
      setProductsApi(data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={1} xl={2}/>
        <Grid item xs={1} sm={1} xl={1} style={{paddingRight: "16px"}}>
          <AdminNavbar />
        </Grid>
        <Grid item xs={11} sm={9} xl={7} style={{margin: "32px 0px"}}>
          <DashboardProducts products={productsApi} handleDelete={handleDelete}/>
        </Grid>
        <Grid item xs={false} sm={1} xl={2}/>
      </Grid>
    </Grid>
  );
}

export default DashboardProductsContainer;
