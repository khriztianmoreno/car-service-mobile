import axios from 'axios';
import API from './API';

export default class Maps {
  static getDistributorsByService(service) {
    return axios.get(`${API.PROVIDERS.URI}/type/${service}`);
  }

  static requestService(idProvider, body) {
    return axios.post(`${API.PROVIDERS.URI}/${idProvider}/service`, body);
  }

  static getAllCustomers() {
    // '/customers/geo/:lat/:lon'
    // return axios.get(`${API.PROVIDERS.URI}/geo/${lat}/${lon}`);
    return axios.get(`${API.PROVIDERS.URI}`);
  }

  static requestTheService(body) {
    // /customers/requestService
    return axios.post(`${API.PROVIDERS.ORDERS}`, body);
  }
}

