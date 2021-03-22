import {
  GET_ALL_ORDERS,
  GET_ALL_USERS,
  GET_ORDER_INFORMATION
} from "../actions/index";

const initialState = {
  all_orders: [],
  all_users: [],
  orderInformation: {}
};

const ordersReducer = (state = initialState, action) => {
  if (action.type === GET_ALL_ORDERS) {
    return {
      ...state,
      all_orders: action.payload,
    };
  }

  if (action.type === GET_ALL_USERS) {
    return {
      ...state,
      all_users: action.payload,
    };
  }

  if (action.type === GET_ORDER_INFORMATION) {
    return {
      ...state,
      orderInformation: action.payload
    }
  }

  return state;
};

export default ordersReducer;
