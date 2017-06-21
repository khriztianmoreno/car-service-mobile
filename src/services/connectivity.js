import { NetInfo, Platform, Alert } from 'react-native';

const checkConexionState = (reach, callback = null) => {
  let newConexionState;
  if (Platform.OS === 'ios') {
    switch (reach) {
    case 'none':
      newConexionState = false;
      break;
    case 'wifi':
      newConexionState = true;
      break;
    case 'cell':
      newConexionState = true;
      break;
    default:
      break;
    }
  } else if (Platform.OS === 'android') {
    switch (reach) {
    case 'NONE':
      newConexionState = false;
      break;
    case 'WIFI':
      newConexionState = true;
      break;
    case 'MOBILE':
      newConexionState = true;
      break;
    default:
      break;
    }
  }

  if (callback) {
    callback(newConexionState);
  }
};

export const getCurrentConexionState = (callback) => {
  NetInfo.fetch().done((reach) => {
    console.log('STATE WIFI', reach);
    checkConexionState(reach, callback);
  });
};

export const alertChangeConexion = (callback = null) => {
  NetInfo.addEventListener('change', (reach) => {
    checkConexionState(reach, (newState) => {
      /* if (!newState) {
        Alert.alert('Conexión perdida', 'No hay conexión a alguna red, no podrá ver la información.');
      } */

      if (callback) {
        callback(newState);
      }
    });
  });
};

const NetUtils = (type, callback = null) => {
  switch (type) {
  case 'alert':
    alertChangeConexion(callback);
    break;
  case 'check':
    getCurrentConexionState(callback);
    break;
  case 'alertErrorNow':
    Alert.alert('Conexión perdida', 'No hay conexión a alguna red, no podrá ver la información.');
    break;
  default:
    break;
  }
};

export default NetUtils;
