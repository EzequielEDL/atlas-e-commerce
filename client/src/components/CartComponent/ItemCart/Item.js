import React from 'react';
import {
  Grid,
  CardContent,
  Typography,
  Button,
  CardMedia,
  CardActions,
} from "@material-ui/core";

import useStyles from "./styles";
import DeleteIcon from "@material-ui/icons/Delete";

function Item({ product, name, handleQuantity, handleDelete, image}) {

  const classes = useStyles();

    return (
    <>
      <Grid container>
        <Grid container xs={12} justify="center">
          <Grid item xs={12} className={classes.root}>
            <CardMedia className={classes.cover} image={image} alt={product.name} />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Grid container xs={12} className={classes.infoContainer}>
                  <Grid container xs={12}>
                    <Typography variant="h5">{name}</Typography>
                  </Grid>
                <Typography variant="h6">
                  US$ {parseFloat(product.orderLine.price).toFixed(2)}
                </Typography>
                </Grid>
                <Grid container xs={12}>
                  <Grid container xs={12}>
                    <Grid container xs={8} className={classes.buttons}>
                     {product.orderLine.quantity === 1 ? (
                      <Button type="button" size="small" disabled>
                        -
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="small"
                        onClick={() => handleQuantity("-")}
                      >
                        -
                      </Button>
                    )}
                    <Typography>
                      &nbsp;{product.orderLine.quantity}&nbsp;
                    </Typography>
                    {product.orderLine.quantity === product.stock ? (
                      <Button type="button" size="small" disabled>
                        +
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="small"
                        onClick={() => handleQuantity("+")}
                      >
                        +
                      </Button>
                    )}
                    </Grid>
                    <Grid container xs={4}>
                      <Button
                        variant="contained"
                        className={classes.delete}
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                      >
                        Delete
                    </Button>
                   </Grid>

                  </Grid>
                </Grid>
                <CardActions className={classes.cardActions}>
                </CardActions>
              </CardContent>
            </div>

          </Grid>
        </Grid>
      </Grid>
    </>
  );

}

export default Item;
