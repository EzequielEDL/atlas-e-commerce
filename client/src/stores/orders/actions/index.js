import axios from "axios";
import {
  GET_ORDERS_ADMIN,
  GET_USERS_ADMIN,
  PUT_ORDER_STATUS,
} from "../../../constants/api";

export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const STATUS_CHANGE = "STATUS_CHANGE";
export const GET_ORDER_INFORMATION = "GET_ORDER_INFORMATION";

export const setAllOrders = (payload) => {
  return {
    type: GET_ALL_ORDERS,
    payload,
  };
};

export const fetchAllOrders = () => {
  return (dispatch) => {
    axios.get(GET_ORDERS_ADMIN).then((response) => {
      dispatch(setAllOrders(response.data));
    });
  };
};

export const getAllUsers = (payload) => {
  return {
    type: GET_ALL_USERS,
    payload,
  };
};

export const fetchAllUsers = () => {
  return (dispatch) => {
    axios.get(GET_USERS_ADMIN).then((response) => {
      dispatch(getAllUsers(response.data));
    });
  };
};

export const changeOrderStatus = (id, status) => {
  return (dispatch) => {
    axios.put(`${PUT_ORDER_STATUS}${id}`, { status: status }).then(() => {
      dispatch(fetchAllOrders());
    });
  };
};


export const getOrderInformation = (payload) => {
  return {
    type: GET_ORDER_INFORMATION,
    payload
  }
}
