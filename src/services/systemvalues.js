import axios from 'axios';
import API from './API';

const systemValuesAPI = {
  getBrands() {
    return axios
      .get(`${API.SYSTEM_VALUES.GROUP}/brands`)
      .then(r => r.data.data[0].values);
  },
  getClasses() {
    return axios
      .get(`${API.SYSTEM_VALUES.GROUP}/class`)
      .then(r => r.data.data[0].values);
  },
  getLines() {
    return axios
      .get(`${API.SYSTEM_VALUES.GROUP}/line`)
      .then(r => r.data.data[0].values);
  },
  getAlertsConfig() {
    return axios
      .get(`${API.SYSTEM_VALUES.GROUP}/alertsConfig`)
      .then(r => r.data.data[0].values);
  },
};

export default systemValuesAPI;
