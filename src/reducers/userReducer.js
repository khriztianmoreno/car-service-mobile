import actions from '../actions/actionTypes';

export const userReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
  case actions.SET_USER_ID: {
    return payload;
  }
  default: {
    return state;
  }
  }
};

export const userObjectReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_USER_OBJECT:
      return payload;
    default:
      return state;
  }
};
