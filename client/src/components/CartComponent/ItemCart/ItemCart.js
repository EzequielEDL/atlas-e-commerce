import React, { useState, useEffect } from "react";

import {
  handleDeleteItem,
  handleQuantityController,
} from "../../../controllers/cart";
import {useSelector, useDispatch} from "react-redux";
import Item from "./Item";
import {getCart} from "../../../stores/cart/actions/cart_actions";

const ItemCart = ({ product, cartId, change, setChange }) => {

  const dispatch = useDispatch();

  const { id } = product;
  const name = product.name.slice(0, 50)
  const user = useSelector(state => state.user_store.user)
  const [count, setCount] = useState(product.orderLine.quantity);

  useEffect(() => {}, [count]);

  const handleQuantity = (action) => {
    if (user.hasOwnProperty('role')) {
      if (action === "+") {
        let newCount = count + 1;
        setCount(newCount);
        handleQuantityController(cartId, id, newCount)
          .then((response) => {
            console.log(response);
            dispatch(getCart(user.id))
            setChange(!change);
          })
          .catch((err) => console.log(err));
      }
      if (action === "-") {
        let newCount = count > 1 ? count - 1 : count;
        setCount(newCount);
        handleQuantityController(cartId, id, newCount)
          .then((response) => {
            console.log(response);
            dispatch(getCart(user.id))
            setChange(!change);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleDelete = () => {
    handleDeleteItem(cartId, id)
      .then((response) => {
        console.log(response);
        dispatch(getCart(user.id))
        setChange(!change);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Item 
      handleQuantity={handleQuantity}
      handleDelete={handleDelete}
      product={product}
      image={product.images[0]}
      name={name}
    />
  );
};

export default ItemCart;
