import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import createHistory from 'history/createBrowserHistory';

import authReducer from "./reducers/authReducer";

const history = createHistory();

const configStore = () =>
  createStore(
    combineReducers({
      authReducer
    }),
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );



export configStore;
