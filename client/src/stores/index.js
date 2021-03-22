import { combineReducers } from "redux";
import productsReducer from "./products/reducer/index";
import cart_store from "./cart/reducer/cart_reducers";
import user_store from "./user/reducers/user_reducers";
import ordersReducer from "./orders/reducer/index";


export default combineReducers({
  productsReducer,
  cart_store,
  user_store,
  ordersReducer,
});
