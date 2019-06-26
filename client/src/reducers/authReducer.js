import * as TYPES from '../actions/actionTypes';

const defaultState = {
  isLoading: false,
  authenticated: false,
  user: {}
}

const authReducer = (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default authReducer