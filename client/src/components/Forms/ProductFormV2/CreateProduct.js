import React, { useState, useEffect } from 'react';
import {
  Grid
} from  '@material-ui/core';
import ProductForm from './ProductForm';
import { getCategories } from "../../../controllers/categories";
import { createProduct, addCategories } from "../../../controllers/products";
import useStyles from "./styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AdminNavbar from './../../Admin/AdminNavBar';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const CreateProduct = () => {
  const [categoriesApi, setCategoriesApi] = useState([]);
  const [applyChangeDisabled, setApplyChangeDisabled] = useState(false)
  const [open, setOpen] = useState();
  const classes = useStyles();

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getCategories()
    .then(data => {
      setCategoriesApi(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  },[]);

  const handleFinalSubmit = (inputs, categories) => {
    setApplyChangeDisabled(true)
    createProduct(inputs)
      .then(res => {
        for (let i in categories) {
          addCategories(res.product.id, categories[i])
        }
      })
      .then(() => {
        setOpen(true);
        setApplyChangeDisabled(false)
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
          <Grid item xs={11} sm={9} xl={7} className={classes.bodyMargin}>
                <ProductForm
                categoriesApi={categoriesApi}
                handleFinalSubmit={handleFinalSubmit}
                applyChangeDisabled={applyChangeDisabled}
                init={{
                  title: "Create a Product",
                  button: "ADD PRODUCT"
                }}/>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Prodduct added !
              </Alert>
            </Snackbar>
          </Grid>
        <Grid item xs={false} sm={1} xl={2}/>
      </Grid>
    </Grid>
  );
};

export default CreateProduct;
