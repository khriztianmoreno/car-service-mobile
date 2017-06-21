import actions from './actionTypes';

export function addVehicle(vehicle) {
  return {
    type: actions.ADD_VEHICLE_TO_LIST,
    payload: vehicle,
  };
}

export function remomeVehicle(vehicle) {
  return {
    type: actions.REMOVE_VEHICLE_FROM_LIST,
    payload: vehicle,
  };
}

export function setVehicles(vehicles) {
  return {
    type: actions.SET_VEHICLES_LIST,
    payload: vehicles,
  };
}
