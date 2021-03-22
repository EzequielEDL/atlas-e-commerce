import {
  PUT_ORDER,
  GET_ORDERS_BY_ID,
  GET_ORDERS,
  GET_ORDER
} from "../constants/api";


export const getOrderById = orderId => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if (token) {
      fetch(`${GET_ORDER}/${orderId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization" : `BEARER ${token}`
        },
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
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
    }
  });
};

export const getOrdersById = userId => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if (token) {
      fetch(`${GET_ORDERS_BY_ID}/${userId}/orders`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization" : `BEARER ${token}`
        },
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
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
    }
  });
};

export const getOrders = () => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if (token) {
      fetch(GET_ORDERS, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization" : `BEARER ${token}`
        },
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
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
    }
  });
};

export const updateOrder = (id, dataForm) => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if (token) {
      fetch(`${PUT_ORDER}/${id}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          "Authorization" : `BEARER ${token}`
        },
        body: JSON.stringify(dataForm),
      })
      .then((response) => {
        switch (response.status) {
          case 200:
            resolve(response.json());
            break;
          case 404:
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
    }
  });
};
