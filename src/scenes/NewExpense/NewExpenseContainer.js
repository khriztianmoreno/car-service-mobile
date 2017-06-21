import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';

import NewExpense from './NewExpense';
import ExpensesService from '../../services/expenses';
import ExpensesValues from '../Expenses/ExpensesValues';

class NewExpenseContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dataMileageSnapshot: {},
      isSavingData: false,
      formData_odometer: 0,
      // formData_typeExpense: { typeExpense: 'CARWASH' },
      formData_typeExpense: 'CARWASH',
      formData_valueExpense: 0,
      // formData_reason: { reason: 'WORK' },
      formData_reason: 'WORK' ,
      formData_name: '',
      formData_place: '',
      formData_notes: '',
      values_typeExpense: '',
    };
  }

  componentDidMount() {
    this.getSystemValues();
  }

  getSetters() {
    const SETTERS = {};

    SETTERS.setIsSavingData = (isSavingData) => { this.setState({ formData: { isSavingData } }); };
    SETTERS.setOdometer = (odometer) => { this.setState({ formData_odometer: odometer }); };
    SETTERS.setTypeExpense = (type) => { this.setState({ formData_typeExpense: type }); };
    SETTERS.setValueExpense = (value) => { this.setState({ formData_valueExpense: value }); };
    SETTERS.setReason = (reason) => { this.setState({ formData_reason: reason }); };
    SETTERS.setName = (name) => { this.setState({ formData_name: name }); };
    SETTERS.setPlace = (place) => { this.setState({ formData_place: place }); };
    SETTERS.setNotes = (notes) => { this.setState({ formData_notes: notes }); };

    return SETTERS;
  }

  async getSystemValues() {
    try {
      // TODO: Change the endpoint call to systemValues/group/:serviceType
      const response = await ExpensesService.getSystemValues();
      const listTypes = response.data.data.filter(item => item.group === 'serviceType')[0];
      const optionsTypes = {};
      optionsTypes.null = 'Tipo de gasto';

      listTypes.values.map((item) => {
        optionsTypes[item] = ExpensesValues.convertionsTypeExpense.direct[item];
      });

      this.setState({
        dataMileageSnapshot: response,
        values_typeExpense: {},
      });
    } catch (e) {
      Toast.show(`Error obteniendo "systemvalues" :: ${e}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  validateForm() {
    const output = {
      message: '',
      state: false,
    };

    if (this.state.formData_odometer.length === 0) {
      output.message = 'Odómetro requerido';
    } else if (!this.state.formData_typeExpense.length === 0) {
      output.message = 'Tipo de gasto requerido';
    } else if (this.state.formData_valueExpense === 0) {
      output.message = 'Valor del nuevo gasto requerido';
    } else if (!this.state.formData_reason.length === 0) {
      output.message = 'Razón requerida';
    } else if (this.state.formData_name.length === 0) {
      output.message = 'Nombre de gasto requerido';
    } else if (this.state.formData_place.length === 0) {
      output.message = 'Lugar requerido';
    } else {
      output.state = true;
    }

    return output;
  }

  async addExpense() {
    const validation = this.validateForm();
    if (validation.state) {
      try {
        const storageVehicle = await AsyncStorage.getItem('currentVehicle');
        let currentVehicle = null;

        if (storageVehicle) {
          currentVehicle = JSON.parse(storageVehicle);

          // Clean form and back to expenses list
          const objMileageSnapshot = {
            localId: currentVehicle._id,
            plate: currentVehicle.plate.number,
            vehicleClass: 'AUTOMOVIL',
            daysSinceLastUpdate: 0,
            averageMileageDay: 0,
            previousMileage: 0,
            actualMileage: this.state.formData_odometer.odometer,
            expense: {
              type: this.state.formData_typeExpense.toUpperCase(),
              name: this.state.formData_name.name.toUpperCase(),
              cost: this.state.formData_valueExpense.valueExpense,
              place: this.state.formData_place.place.toUpperCase(),
              reason: this.state.formData_reason.toUpperCase(),
              notes: this.state.formData_notes,
            },
          };

          await ExpensesService.addExpense(objMileageSnapshot);

          Toast.show('Nuevo gasto agregado satisfactoriamente', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
          });

          this.setState({
            formData_odometer: 0,
            formData_valueExpense: 0,
          });

          Actions.pop();
          Actions.refresh({ shouldRefresh: true });  
        }
      } catch (e) {
        Toast.show(`Error intentando agregar el gasto :: ${e}`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      }
    } else {
      Toast.show(`Error de validación :: ${validation.message}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  render() {
    return (
      <NewExpense
        saveExpense={() => this.addExpense()}
        data={this.state}
        setters={this.getSetters()}
      />
    );
  }
}

export default NewExpenseContainer;
