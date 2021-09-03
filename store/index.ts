import { createStore } from "redux";

const initialState: Record<string, any> = {
  users: [],
  tab: 0,
};
const usersReducer = (state = initialState, action: Record<string, any>) => {
  if (action.type === "LOAD") {
    return { tab: 0, ...action.payload };
  }
  if (action.type === "ADD") {
    return { ...state, tab: 1 };
  }
  if (action.type === "LIST") {
    return { ...state, tab: 0 };
  }
  return state;
};
const store = createStore(usersReducer);

export default store;
