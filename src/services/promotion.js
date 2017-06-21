import axios from 'axios';
import API from './API';

const promotionsAPI = {
  create(data) {
    return axios
      .post(
      `${API.PROMOTIONS.URI}/`,
      JSON.stringify(data),
      {
        headers:
        { 'Content-Type': 'application/json' },
      })
      .then(r => r.data);
  },

  getAll(location, country) {
    console.log('URL:', `${API.PROMOTIONS.PROMOS}/country/${country}/geo/${location.latitude}/${location.longitude}`);
    return axios
      .get(
        `${API.PROMOTIONS.PROMOS}/country/${country}/geo/${location.latitude}/${location.longitude}`
      )
      .then(r => r.data.data);
  },
};

export default promotionsAPI;
