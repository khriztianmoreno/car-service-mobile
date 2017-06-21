import { AsyncStorage } from 'react-native';
import axios from 'axios';

const jwtDecode = require('jwt-decode');

const API = require('./API');

export default class Auth {

  constructor(params) {
    this.token = params.token;
  }

  /**
   * Authenticate user and save token
   *
   * @param  {Object}   user     - login info
   * @param  {Function} callback - optional, function(error, user)
   * @return {Promise}
   */
  static login(user) {
    const {
      email,
      password,
    } = user;

    return axios.post(API.LOGIN.LOCAL, { email, password });
  }


  /**
   * Delete access token and user info
   */
  static logout() {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('currentVehicle');
    AsyncStorage.removeItem('userId');
  }

  static setTokenInRequest(token) {
    axios.defaults.headers.common.Authorization = token;
  }


  /**
   * Create a new user
   *
   * @param  {Object}   user     - user info
   * @return {Promise}
   */
  static createUser(user) {
    const register = {
      email: user.email,
      name: user.name,
      password: user.password,
      provider: 'local',
    };

    return axios.post(API.ACCOUNT.REGISTER, register);
  }

  /**
   * Create a new user from Facebook
   *
   * @param  {Object}   user     - user info
   * @return {Promise}
   */
  static FBlogin(token) {
    return axios.post(API.LOGIN.FB, { access_token: token });
  }

  /**
   * Get auth token
   *
   * @return {String} - a token string used for authenticating
   */
  static getToken() {
    return AsyncStorage.getItem('token');
  }

  static async saveLocalToken(token) {
    console.log('TOKEN', token);
    this.setTokenInRequest(token);
    await AsyncStorage.setItem('token', token);
  }

  static extractIdFromToken(token) {
    return jwtDecode(token)._id;
  }

  static resetPassword(email) {
    return axios.get(API.ACCOUNT.RESET_PASS);
  }

  static getUser(id) {
    return axios.get(`${API.ACCOUNT.REGISTER}/${id}`);
  }

  static setUser(id, user) {
    return axios.put(`${API.ACCOUNT.REGISTER}/${id}`, user);
  }

  static setDataDeviceForUser(id, data) {
    return axios.patch(`${API.ACCOUNT.REGISTER}/${id}`, data);
  }

  static setLanguageUser(id, data) {
    return axios.patch(`${API.ACCOUNT.REGISTER}/${id}`, data);
  }
}
