import actions from './actionTypes';

export function setUser(user) {
  return {
    type: actions.SET_USER_ID,
    user,
  };
}

export function setUserObject(user) {
  return {
    type: actions.SET_USER_OBJECT,
    payload: user,
  };
}

