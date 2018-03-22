import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './../modules'


 
let history

if (typeof document !== 'undefined') {
  const createBrowserHistory = require('history/createBrowserHistory').default

  history = createBrowserHistory()
}

export default history

const defaultState = {
  name: ""
};

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
)

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
    composedEnhancers
    //composeWithDevTools(applyMiddleware(thunkMiddleware)),

  );
};