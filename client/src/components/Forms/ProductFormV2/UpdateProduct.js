import React, { useState, useEffect } from 'react';
import {
  Grid
} from  '@material-ui/core';
import ProductForm from './ProductForm';
import { getProductById, updateProduct, addCategories } from "../../../controllers/products";
import { getCategories } from "../../../controllers/categories";
import useStyles from "./styles";
import LoadingAnim from './../../LoadingAnim/LoadingAnim.js'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AdminNavbar from './../../Admin/AdminNavBar';

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const UpdateProduct = ({ id }) => {

  const [categoriesApi, setCategoriesApi] = useState([]);
  const [applyChangeDisabled, setApplyChangeDisabled] = useState(false)
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState();
  const classes = useStyles();
  const [ready, setReady] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getProductById(id)
    .then(data => {
        setProduct(data);
        setReady(true)
    })
    .catch((err) => {
      console.log(err.message);
    });
    getCategories()
    .then((data) => {
      setCategoriesApi(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
  },[id])

  const handleFinalSubmit = (inputs, categories) => {
    setApplyChangeDisabled(true)
    console.log(inputs)
    updateProduct(id, inputs)
    .then(() => (
      addCategories(id, categories)
    ))
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
            {ready
              ?(
                <ProductForm
                  categoriesApi={categoriesApi}
                  product={product}
                  handleFinalSubmit={handleFinalSubmit}
                  applyChangeDisabled={applyChangeDisabled}
                  init={{
                    title: "Edit a Product",
                    button: "APPLY CHANGES"
                }}/>
              )
              :(
                <LoadingAnim />
              )
            }
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Changes submit !
              </Alert>
            </Snackbar>
          </Grid>
        <Grid item xs={false} sm={1} xl={2}/>
      </Grid>
    </Grid>
  );
};

export default UpdateProduct;
