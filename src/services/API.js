/**
 * Endpoint constants of the application
 * @author: Cristian Moreno <k@sapco.co>
 */

const BASE_URL = 'http://13.92.35.129:3030';
// const BASE_URL = 'http://192.168.1.5:3030';

const API = {
  LOGIN: {
    LOCAL: `${BASE_URL}/auth/local/`,
    FB: `${BASE_URL}/auth/facebook/`,
  },
  ACCOUNT: {
    REGISTER: `${BASE_URL}/users`,
    RESET_PASS: 'https://jsonplaceholder.typicode.com/posts/1',
  },
  VEHICLES: {
    URI: `${BASE_URL}/vehicles`,
  },
  EXPENSES: {
    URI: `${BASE_URL}/mileageSnapshots`,
    CURRENT_MILEAGE: `${BASE_URL}/mileageSnapshots/projectedMileage`,
    MY: `${BASE_URL}/mileageSnapshots/vehicle`,
  },
  PROVIDERS: {
    URI: `${BASE_URL}/customers`,
    ORDERS: `${BASE_URL}/orders`,
  },
  SYSTEM_VALUES: {
    URI: `${BASE_URL}/systemValues`,
    // Update groups -> group in the backend
    GROUP: `${BASE_URL}/systemValues/groups`,
  },
  PROMOTIONS: {
    URI: `${BASE_URL}/customers/requestPromotion`,
    PROMOS: `${BASE_URL}/promotions`,
  },
  ALERTS: {
    URI: `${BASE_URL}/alerts`,
  },
};

module.exports = API;
