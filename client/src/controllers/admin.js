import {
    GET_PRODUCTS_ADMIN
  } from '../constants/api';


  export const listProducts = (s) => {

      return new Promise((resolve, reject) => {

          fetch(GET_PRODUCTS_ADMIN, {
              method : "GET",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          })
          .then(response => {
              switch (response.status) {
                  case 200:
                      resolve(response.json());
                      break;
                  case 404:
                      reject(new Error('It appears that the database url was not found'));
                      break;
                  default:
                      reject(new Error('It seems there was an error'));
                      break;
              }
          })
          .catch(err => {
              reject(err.message);
          })
      })
  }
