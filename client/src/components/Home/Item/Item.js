import React from "react";
import { Link } from "@material-ui/core";

const Item = ({ item }) => {
  return (
    <>
      <Link href={item.link}>
        <img style={{ width: "100%" }} src={item.image} alt="" />
      </Link>
    </>
  );
};

export default Item;
