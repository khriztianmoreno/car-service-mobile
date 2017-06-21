import actions from './actionTypes';

export function setVehicle(vehicle) {
  return {
    type: actions.SET_CURRENT_VEHICLE,
    vehicle,
  };
}

export default {
  setVehicle,
};
