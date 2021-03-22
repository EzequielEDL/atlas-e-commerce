import React, { useEffect, useState } from "react";
import PaymentInfo from "./Form/PaymentInfo";
import UserInfo from "./Form/UserInfo";

import { setDirectionToCart } from "../../controllers/checkout";
import { updateOrder } from "../../controllers/orders";
import { connect } from "react-redux";
import SuccessComponent from "./Result/Success";
import ErrorComponent from "./Result/Error";
import { paymentError } from "./paymentError";
import { sendEmail } from "../../controllers/checkout";
import { handleCreateCart } from "../../controllers/cart";
import { setNewCart } from "../../stores/cart/actions/cart_actions";
import { handleStockOnPayment } from "../../controllers/products";

const Container = ({ user, cart, setNewCart }) => {
  const [state, setState] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {}, [success, cart]);

  const [userInfoValues, setUserInfoValues] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
    number: "",
    postalCode: "",
    email: "",
  });

  const [userInfoErrors, setUserInfoErrors] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
    number: "",
    postalCode: "",
    email: "",
  });

  const handleSuccess = () => {
    let msgs = {};

    updateOrder(cart.id, { status: "Create" })
      .then((res) => {
        if (res.msg === "Order was updated successfuly") {
          for (let i in cart.products) {
            const handleStock = async () => {
              await handleStockOnPayment(
                cart.products[i].id,
                cart.products[i].orderLine.quantity
              )
                .then((response) => {
                  console.log(response);
                })
                .catch((err) => console.log(err));
            };
            handleStock();
          }
          msgs.updateOrder = res.msg;
          return handleCreateCart(user.id);
        }
      })
      .then((res) => {
        if (res.msg === "Cart created successfuly") {
          msgs.handleCreateCart = res.msg;
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
          return setDirectionToCart(cart.id, userInfoValues);
        }
      })
      .then((res) => {
        msgs.setDirection = res.msg;
        return sendEmail(user.name, cart.total, userInfoValues);
      })
      .then((res) => {
        console.log(res);
        setNewCart(cart.id);
      })
      .then(() => {
        console.log(msgs);
        setRedirect(true);
      })
      .catch((err) => console.log(err));
  };

  const handleError = (err) => {
    setError(paymentError(err));
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 5000);
    setRedirect(true);
  };

  if (redirect) {
    return (
      <>{success ? <SuccessComponent /> : <ErrorComponent error={error} />}</>
    );
  } else {
    return (
      <>
        {!state ? (
          <UserInfo
            setState={setState}
            userInfoValues={userInfoValues}
            setUserInfoValues={setUserInfoValues}
            setUserInfoErrors={setUserInfoErrors}
            userInfoErrors={userInfoErrors}
          />
        ) : (
          <PaymentInfo
            setState={setState}
            handleSuccess={handleSuccess}
            handleError={handleError}
            totalPrice={parseFloat(cart.total)}
          />
        )}
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user_store.user,
    cart: state.cart_store,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setNewCart: (cartId) => dispatch(setNewCart(cartId)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Container);
