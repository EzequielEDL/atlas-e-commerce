import React from "react";
import ProductCard from "../../Products/ProductCard/ProductCard"

const ItemsHome = ({ p }) => {
  return (
    <ProductCard product={p} type={true} />
  );
};

export default ItemsHome;
