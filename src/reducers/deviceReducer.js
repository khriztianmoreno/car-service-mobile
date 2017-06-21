import actions from './../actions/actionTypes';

export const deviceIdReducer = (state = '', action) => {
  switch (action.type) {
  case actions.SET_DEVICE_ID:
    return action.payload;
  default:
    return state;
  }
};

export const deviceTagsReducer = (state = [], action) => {
  switch (action.type) {
  case actions.SET_DEVICE_TAGS:
    return action.payload;
  default:
    return state;
  }
};
