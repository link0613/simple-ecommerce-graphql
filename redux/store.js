import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const defaultState = {
  name: ""
};

export const actionTypes = {
  SET_NAME: "SET_NAME"
};

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return Object.assign({}, state, {
        name: action.name
      });
    default:
      return state;
  }
};

// ACTIONS
export const setName = newName => dispatch => {
  return dispatch({ type: actionTypes.SET_NAME, name: newName });
};

export const initStore = (initialState = defaultState) => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};