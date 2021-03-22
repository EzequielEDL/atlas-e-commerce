import {
  PROCESS_PAYMENT,
  PUT_ORDER_STATUS,
  SET_USER_INFO_TO_CART,
  POST_SEND_EMAIL,
} from "../constants/api";

export const submitPayment = (formData) => {
  return new Promise((resolve, reject) => {
    fetch(PROCESS_PAYMENT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        switch (response.status) {
          case 201:
            resolve(response.json());
            break;
          case 400:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const createdCart = (cartId) => {
  return new Promise((resolve, reject) => {
    fetch(`${PUT_ORDER_STATUS}/${cartId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Create" }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 400:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const setDirectionToCart = (cartId, userInfo) => {
  return new Promise((resolve, reject) => {
    fetch(`${SET_USER_INFO_TO_CART}/${cartId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 400:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const sendEmail = (name, totalPrice, userInfo) => {
  return new Promise((resolve, reject) => {
    fetch(POST_SEND_EMAIL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        totalPrice: totalPrice,
        userInfo: userInfo,
      }),
    })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 400:
            reject(new Error("It appears that the database url was not found"));
            break;
          default:
            reject(new Error("It seems there was an error"));
            break;
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
