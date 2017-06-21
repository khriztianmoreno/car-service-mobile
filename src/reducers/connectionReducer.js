import actions from './../actions/actionTypes';

const connectionReducer = (state = null, action) => {
  const { type } = action;
  switch (type) {
  case actions.SET_ONLINE: {
    return true;
  }
  case actions.SET_OFFLINE: {
    return false;
  }
  default: {
    return state;
  }
  }
};

export default connectionReducer;
