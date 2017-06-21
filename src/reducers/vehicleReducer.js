import actions from './../actions/actionTypes';

const vehicleReducer = (state = {}, action) => {
  const { type, vehicle } = action;
  switch (type) {
  case actions.SET_CURRENT_VEHICLE: {
    return { ...vehicle };
  }
  default: {
    return state;
  }
  }
};

export default vehicleReducer;

