const createActions = nameList => (
  nameList.reduce((prev, current) => ({
    ...prev,
    [current]: current,
  }), {})
);

export default createActions([
  'SET_CURRENT_VEHICLE',
  'SET_ONLINE',
  'SET_OFFLINE',
  'SET_DEVICE_ID',
  'SET_DEVICE_TAGS',
  'SET_USER_ID',
  'SET_USER_OBJECT',
  'ADD_VEHICLE_TO_LIST',
  'REMOVE_VEHICLE_FROM_LIST',
  'SET_VEHICLES_LIST',
  'SET_SHOW_FORM',
]);
