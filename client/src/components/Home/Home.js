 import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import { Grid, CssBaseline, Typography, Box } from "@material-ui/core";

import Item from "./Item/Item";
import ItemsHome from "./Item/ItemsHome";

import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import HelpOutlineIcon from "@material-ui/icons/HelpOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";

import useStyles from "./styles";
import { connect } from "react-redux";
import { fetchAllProducts } from "../../stores/products/actions";

const Home = ({ products, getAllProducts,fetchUserCartEffect }) => {
  const classes = useStyles();


  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  var items = [
    {
      link: "/products/telescopes",
      image: "https://i.ibb.co/bBHXsLX/BANNER-1.jpg",
    },
    {
      link: "/products/telescopes",
      image: "https://i.ibb.co/ZLS0rL7/BANNER-2.jpg",
    },
    {
      link: "/products/telescopes",
      image: "https://i.ibb.co/R900tpn/BANNER-3.jpg",
    },
  ];

  let homeProducts = [];
  let kidsProducts = [];
  let counterKidsCategory = 0;

   for (let i = products.length - 1; i > products.length - 6 && i >= 0; i--) {
    if (products.length >= 1 && products[i] !== undefined) {
      homeProducts.push(products[i]);
    }
  }

  let isKidCategory = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].categories.length === 1) {
      for (let j = 0; j < products[i].categories.length; j++) {
        if (products[i].categories[j].name === "Kids") {
          isKidCategory = true;
        }
      }
    }
    if (isKidCategory && counterKidsCategory < 5) {
      kidsProducts.push(products[i]);
      counterKidsCategory++;
      isKidCategory = false;
    }
  }

  return (
    <>
      <CssBaseline />
      <Carousel autoPlay>
        {items.map((item, i) => (
          <Item item={item} />
        ))}
      </Carousel>

      <Grid
        item
        container
        xs={12}
        direction="row"
        spacing={4}
        wrap="wrap"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item>
          <Box
            border={1}
            className={classes.paper}
            display="flex"
            direction="row"
          >
            <div className={classes.content}>
              <LocalShippingOutlinedIcon className={classes.icons} />
              <div>
                <Typography className={classes.title} variant="h5">
                  Payment & Delivery
                </Typography>
                <Typography variant="h6" className={classes.secondaryText}>
                  Free Shipping
                </Typography>
              </div>
            </div>
          </Box>
        </Grid>

        <Grid item>
          <Box
            border={1}
            className={classes.paper}
            display="flex"
            direction="row"
          >
            <div className={classes.content}>
              <CheckCircleOutlineOutlinedIcon className={classes.icons} />
              <div>
                <Typography className={classes.title} variant="h5">
                  Original Products
                </Typography>
              </div>
            </div>
          </Box>
        </Grid>

        <Grid item>
          <Box
            border={1}
            className={classes.paper}
            display="flex"
            direction="row"
          >
            <div className={classes.content}>
              <HelpOutlineIcon className={classes.icons} />
              <div>
                <Typography className={classes.title} variant="h5">
                  Quality Support
                </Typography>
                <Typography variant="h6" className={classes.secondaryText}>
                  Online feedback 24/7
                </Typography>
              </div>
            </div>
          </Box>
        </Grid>

        <Grid item>
          <Box
            border={1}
            className={classes.paper}
            display="flex"
            direction="row"
          >
            <div className={classes.content}>
              <ThumbUpAltOutlinedIcon className={classes.icons} />
              <div>
                <Typography className={classes.title} variant="h5">
                  Two Years Guarantee
                </Typography>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
      <div style={{ marginTop: 100 }}>
        <Grid item container xs={12} direction="column">
          <div>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.latestTitle}
            >
           <Typography variant="h5" align="left">
             Latest products
           </Typography>
            </Grid>
           <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {homeProducts.length >= 1 ? (
                homeProducts.map((p, index) => <Link key={index} to={`/products/search/${p.id}`} className={classes.link}><ItemsHome p={p} key={p.id} /></Link>)
              ) : (
                <div></div>
              )}
            </Grid>
          </div>
        </Grid>
      </div>
      <Grid item container xs={12} justify="center" alignItems="center">
        <Grid item>
          <img
            alt="ASTRO SHOP"
            className={classes.bannerKids}
            src="https://i.ibb.co/5Mk74hR/BANNER-3.jpg"
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: 100 }}>
        <Grid item container xs={12} direction="column">
          <div>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.latestTitle}
            >
           <Typography variant="h5" align="left">
             Latest products
           </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {kidsProducts.map((p) => (
                <Link to={`/products/search/${p.id}`} className={classes.link}>
                  <ItemsHome p={p} key={p.id} />
                </Link>
              ))}
            </Grid>
          </div>
        </Grid>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productsReducer.allProducts,
  };
};

const mapActionsToProps = (dispatch) => {

  return {
    getAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
