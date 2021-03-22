import React from "react";
import ProductCard from "../../Products/ProductCard/ProductCard.js";
import LoadingAnim from "./../../LoadingAnim/LoadingAnim.js";
import { Grid } from "@material-ui/core";

const Category = ({ products }) => {
  return (
    <Grid item container direction="row" xs={12}>
      {products ?
        (
          <>
            {products.map((product, index) => (
              <Grid item key={index}>
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              </Grid>
            ))}
          </>
        )
        :(
          <LoadingAnim />
        )
      }
    </Grid>
  );
};

export default Category;
