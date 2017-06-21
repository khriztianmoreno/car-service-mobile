import axios from 'axios';
import API from './API';

export default class Alerts {
  static getAlerts() {
    return axios.get(`${API.ALERTS.URI}`);
  }

  static addAlert(body) {
    return axios.post(`${API.ALERTS.URI}`, body);
  }
}
