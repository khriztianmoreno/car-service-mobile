import actions from './../actions/actionTypes';

const listVehiclesReducer = (state = [], action) => {
  switch (action.type) {
  case actions.ADD_VEHICLE_TO_LIST:
    return [...state, ...action.payload];
  case actions.SET_VEHICLES_LIST:
    return action.payload;
  case actions.REMOVE_VEHICLE_FROM_LIST:
    const idx = state.findIndex(item => item._id === action.payload);
    const removed = [...state.splice(idx, 1)];
    return removed;
  default:
    return state;
  }
};

export default listVehiclesReducer;
