import React from "react";
import Category from "./Category/Category.js";
import LoadingAnim from "../LoadingAnim/LoadingAnim.js";

import {
  Grid,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles.js";

const Catalog = ({ productsFilter, handleFilter, categories }) => {
  const classes = useStyles();

  const Drawer = () => {
    return (
      <>
        <Paper className={classes.contentDrawer}>
          <List component="nav">
            <Typography variant="h6">Categories</Typography>
            <Divider />
            <>
              <input type="button" id="-1" onClick={handleFilter} name="category" value="All" style={{display: "none"}}/>
              <label htmlFor="-1">
                <ListItem button>
                  <ListItemText primary="All" />
                </ListItem>
              </label>
              {categories ? (
                categories.map((category, index) => (
                  <div key={index}>
                    <input type="button" id={index} onClick={handleFilter} name="category" value={category.name} style={{display: "none"}}/>
                    <label htmlFor={index}>
                      <ListItem button>
                        <ListItemText primary={category.name} />
                      </ListItem>
                    </label>
                  </div>
                ))
              ) : (
                <ListItemText primary={"None Category"} />
              )}
            </>
          </List>
        </Paper>
      </>
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={9}>
          <div className={classes.contentCategory}>
            {productsFilter ? (
              <>
                {productsFilter.length > 0 ? (
                  <Category products={productsFilter}  />
                )
                :(
                  <Typography variant="h6">Products not found ! :( try again !)</Typography>
                )
                }
              </>
            ) : (
              <LoadingAnim />
            )}
          </div>
        </Grid>
        <Grid item xs={2} className={classes.toolbar}>
          <Drawer />
        </Grid>
      </Grid>
    </>
  );
};


export default Catalog;
