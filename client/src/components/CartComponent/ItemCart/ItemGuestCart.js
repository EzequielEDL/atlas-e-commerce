import React from "react";
import { useDispatch } from "react-redux";
import allActions from '../../../stores/cart/actions/all_actions'
import Item from "./Item";

const ItemGuestCart = ({ product }) => {

  const dispatch = useDispatch()

  const name = product.name.slice(0, 50)

  const handleQuantity = (action) => {
    dispatch(allActions.handleGuestQuantity(action, product.id))
  };

  const handleDelete = () => {
    dispatch(allActions.handleGuestDelete(product.id))
  };


  return (
    <Item 
      handleQuantity={handleQuantity}
      handleDelete={handleDelete}
      image={product.images[0]}
      product={product}
      name={name}
    />
  );
};

export default ItemGuestCart;
