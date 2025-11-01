import { fromJS } from "immutable";
import { INCREMENT, DECREMENT, RESET } from "./action";

const initialState = fromJS({
  count: 0,
  userDetails: {
    name: null
  }
})
function counterReducer(state = initialState, action) {
  switch (action.type) {
    // case INCREMENT:
    //   return { ...state, count: state.count + 1 };
    // case DECREMENT:
    //   return { ...state, count: state.count - 1 };
    // case RESET:
    //   return { ...state, count: 0 };
    case "UPDADE_USER_DETAILS":
      state = state.setIn(['userDetails', 'name'], action.data.username)
      return state;
    default:
      return state;
  }
}

export default counterReducer;
