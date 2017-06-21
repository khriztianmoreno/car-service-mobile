import axios from 'axios';
import API from './API';

export default class Expenses {
  static getMyExpenses(id) {
    return axios.get(`${API.EXPENSES.MY}/${id}`);
  }

  static addExpense(body) {
    return axios.post(API.EXPENSES.URI, body);
  }

  static removeExpense(id) {
    return axios.delete(`${API.EXPENSES.URI}/${id}`);
  }

  static updateExpense(id, body) {
    return axios.put(`${API.EXPENSES.URI}/${id}`, body);
  }

  static getSystemValues() {
    return axios.get(API.SYSTEM_VALUES.URI);
  }

  static getCustomers() {
    return axios.get(API.PROVIDERS.URI);
  }

  static getCostsByTime(dateStart, dateFinal, idVehicle) {
    return axios.get(`${API.EXPENSES.URI}/expenseReport/dates/${dateStart}/${dateFinal}/localId/${idVehicle}`);
  }

  static getCurrentMileage(id) {
    console.log(`URL ==> ${API.EXPENSES.CURRENT_MILEAGE}/${id}`);
    return axios.get(`${API.EXPENSES.CURRENT_MILEAGE}/${id}`);
  }
}
