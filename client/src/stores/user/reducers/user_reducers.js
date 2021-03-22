import { GET_USER } from "../actions/user_actions";

const initialState = {
  user: [],
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default user_reducer;
