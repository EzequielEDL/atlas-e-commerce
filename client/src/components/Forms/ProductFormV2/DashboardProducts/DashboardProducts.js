import React from 'react';
import { Link } from 'react-router-dom';

import {
  Grid,
  Typography,
  Button,
  Paper,
  GridList,
  GridListTile,
} from  '@material-ui/core';
import { DeleteIcon, UpdateIcon } from "../../../SvgIcons/IconsMaterial";
import LoadingAnim from '../../../LoadingAnim/LoadingAnim.js'
import ManProductSvg from '../../../SvgIcons/ManProductSvg'
import useStyles from "./styles";


const DashboardProducts = ({ products, handleDelete }) => {
  const classes = useStyles();

  const LeftContent = (
    <Grid item xs={12}>
    {products
      ?(
        <GridList className={classes.gridList} cols={1} spacing={5} cellHeight={140}>
            {products.map((item, index) => (
                <GridListTile key={index} cols={1} className={classes.gridlisttile}>
                  <Paper className={classes.root}>
                    <Grid item container xs={12} style={{margin:"auto"}}>
                      <Grid item container xs={3} direction="row"  className={classes.card}>
                        <Grid item>
                          <img className={classes.cover} alt="coverimage" src={item.images[0]}/>
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
                              <Grid item container justify="flex-end" xs={4}>
                                <Grid>
                                <Button
                                  onClick={() => handleDelete(item.id)}
                                  startIcon={<DeleteIcon />}><Typography variant="button">DELETE</Typography>
                                </Button>
                                <Link to={`products/edit/${item.id}`} className={classes.link}>
                                  <Button
                                    startIcon={<UpdateIcon />}><Typography variant="button">EDIT</Typography>
                                  </Button>
                                </Link>
                                </Grid>
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
      <Grid item>
        <ManProductSvg width={"100%"} height={"100%"}/>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" color="textSecondary">Administrative control panel to modify, add or delete products.</Typography>
      </Grid>
        <Grid item >
          <Link to='products/create/' className={classes.link}>
            <Button variant='contained' color='secondary' className={classes.button}>
              NEW PRODUCT
            </Button>
          </Link>
        </Grid>
    </Grid>
  );

  return (
    <Grid item container>
      <Grid item xs={12}>
        <Paper className={classes.body}>

          <Grid item xs={12} align="center">
            <div className={classes.header}>
              <Typography variant="h6" styles={{padding: "0px"}}>Products List</Typography>
            </div>
          </Grid>

          <Grid item container>
            <Grid item container xs={4} className={classes.bodyRight}>
              {RightContent}
            </Grid>
            <Grid item container xs={8} className={classes.bodyLeft}>
              {LeftContent}
            </Grid>
          </Grid>

        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardProducts;
