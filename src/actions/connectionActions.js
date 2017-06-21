import actions from './actionTypes';

export function setConnection(status) {
  return {
    type: status ? actions.SET_ONLINE : actions.SET_OFFLINE,
  };
}

export default {
  setConnection,
};
