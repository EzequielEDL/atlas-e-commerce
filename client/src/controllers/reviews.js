import {
  GET_REVIEWS_BY_ID,
  POST_REVIEW,
  PUT_REVIEW,
  DELETE_REVIEW
} from "../constants/api";

// LISTAR PRODUCTOS
export const getReviewsById = id => {
  return new Promise((resolve, reject) => {
    fetch(`${GET_REVIEWS_BY_ID}/${id}/review`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
  });
};

export const createReview = (id, dataForm) => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if (token) {
      fetch(`${POST_REVIEW}/${id}/review`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
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

export const updateReview = (id, dataForm) => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if (token) {
      fetch(`${PUT_REVIEW}/${id}/review`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          "Authorization" : `BEARER ${token}`
        },
        body: JSON.stringify(dataForm)
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


export const deleteReview = (id) => {
  return new Promise((resolve, reject) => {
    const token = window.localStorage.getItem("session");
    if (token) {
      fetch(`${DELETE_REVIEW}/${id}/review`, {
        method: "DELETE",
        headers: {
          "Authorization" : `BEARER ${token}`
        }
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
