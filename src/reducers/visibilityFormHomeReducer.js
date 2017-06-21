import actions from '../actions/actionTypes';

export const showFormHome = (state = true, action) => {
  const { type, payload } = action;
  switch (type) {
  case actions.SET_SHOW_FORM:
    return payload;
  default:
    return state;
  }
};
