import actions from './actionTypes';

export function setShowFormHome(state) {
  return {
    type: actions.SET_SHOW_FORM,
    payload: state,
  };
}
