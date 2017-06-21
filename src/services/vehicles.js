import axios from 'axios';
import API from './API';

const vehiclesAPI = {
  create(vehicle) {
    return axios
      .post(
      `${API.VEHICLES.URI}/`,
      JSON.stringify(vehicle),
      { headers:
        { 'Content-Type': 'application/json' },
      })
      .then(r => r.data);
  },

  getAll() {
    return axios
      .get(
      `${API.VEHICLES.URI}/`)
      .then(r => r.data.data);
  },

  getById(id) {
    return axios
      .get(`${API.VEHICLES.URI}/${id}`)
      .then(r => r.data);
  },

  updateById(id, data) {
    return axios
      .put(
        `${API.VEHICLES.URI}/${id}`,
        JSON.stringify(data),
        ({
          headers:
          { 'Content-Type': 'application/json' },
        }))
      .then(r => r.data);
  },

  removeById(id) {
    return axios
      .delete(`${API.VEHICLES.URI}/${id}`)
      .then(r => r.data);
  },
};

export default vehiclesAPI;
