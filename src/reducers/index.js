import { combineReducers } from 'redux';
import vehicleReducer from './vehicleReducer';
import connectionReducer from './connectionReducer';
import { userReducer, userObjectReducer } from './userReducer';
import { deviceIdReducer, deviceTagsReducer } from './deviceReducer';
import listVehiclesReducer from './listVehiclesReducer';
import { showFormHome as showFormReducer } from './visibilityFormHomeReducer';

export default combineReducers({
  vehicle: vehicleReducer,
  online: connectionReducer,
  deviceId: deviceIdReducer,
  deviceTags: deviceTagsReducer,
  user: userReducer,
  userObject: userObjectReducer,
  listVehicles: listVehiclesReducer,
  showForm: showFormReducer,
});
