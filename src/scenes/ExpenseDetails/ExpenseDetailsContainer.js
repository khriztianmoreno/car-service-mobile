import React from 'react';
import { Alert } from 'react-native-elements';
import { Actions, ActionConst } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import Toast from 'react-native-root-toast';

import ExpenseDetails from './ExpenseDetails';
import ExpensesService from '../../services/expenses';

class ExpenseDetailsContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date: this.props.data.createdAt,
      odometer: this.props.data.actualMileage,
      typeExpense: this.props.data.expense.type,
      valueExpense: this.props.data.expense.cost,
      cost: this.props.data.expense.cost,
      reason: this.props.data.expense.reason,
      name: this.props.data.expense.name,
      place: this.props.data.expense.place,
      notes: this.props.data.expense.notes,
      values_typeExpense: [],
      showModalUpdate: false,
      showModalRemove: false,
    };
  }

  componentDidMount() {
    this.getSystemValues();
  }

  getSetters() {
    const SETTERS = {};

    SETTERS.setOdometer = (odometer) => { this.setState({ odometer }); };
    SETTERS.setTypeExpense = (type) => { this.setState({ typeExpense: type }); };
    SETTERS.setValueExpense = (value) => { this.setState({ valueExpense: value }); };
    SETTERS.setReason = (reason) => { this.setState({ reason }); };
    SETTERS.setName = (name) => { this.setState({ name }); };
    SETTERS.setPlace = (place) => { this.setState({ place }); };
    SETTERS.setNotes = (notes) => { this.setState({ notes }); };
    SETTERS.showModalUpdate = (showModalUpdate) => { this.setState({ showModalUpdate }); };
    SETTERS.showModalRemove = (showModalRemove) => { this.setState({ showModalRemove }); };

    return SETTERS;
  }

  async getSystemValues() {
    try {
      const response = await ExpensesService.getSystemValues();
      this.setState({
        values_typeExpense: response.data.data.filter((item) => { return item.group === 'serviceType' })[0],
      });
    } catch (e) {
      Toast.show(`Error obteniendo SystemValues :: ${JSON.stringify(e)}`, {
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
    console.log('DATA UPDATE VEHICLE', this.state);
    if (this.state.odometer <= 0) {
      output.message = 'Kilometraje requerido';
    } else if (this.state.typeExpense === 'null' || this.state.typeExpense.length === 0) {
      output.message = 'Tipo de gasto requerido';
    } else if (this.state.valueExpense === 0) {
      output.message = 'Valor del nuevo gasto requerido';
    } else if (this.state.reason === 'null') {
      output.message = 'Razón requerida';
    } else if (this.state.name.length === 0) {
      output.message = 'Nombre de gasto requerido';
    } else if (this.state.place.length === 0) {
      output.message = 'Lugar requerido';
    } else {
      output.state = true;
    }

    return output;
  }

  async updateExpense() {
    const validation = this.validateForm();

    if (validation.state) {
      try {
        const cVehicle = await AsyncStorage.getItem('currentVehicle');

        if (cVehicle) {
          const objVechicle = JSON.parse(cVehicle);
          const editedMileageObject = {
            _id: this.props.data._id,
            localId: objVechicle._id, // '582e39528fb233c49e13e9ce', // CURRENT VEHICLE _ID
            plate: objVechicle.plate.number, // CURRENT VEHICLE PLATE
            vehicleClass: objVechicle.vehicleData.brand, // CURRENT VEHICLE VEHICLE_CLASS
            daysSinceLastUpdate: 0,
            averageMileageDay: 0,
            previousMileage: 0,
            actualMileage: this.state.odometer,
            expense: {
              _id: this.props.data.expense._id,
              type: this.state.typeExpense.toUpperCase(),
              name: this.state.name.toUpperCase(),
              cost: this.state.valueExpense,
              place: this.state.place.toUpperCase(),
              reason: this.state.reason.toUpperCase(),
              notes: this.state.notes,
            },
          };

          await ExpensesService.updateExpense(editedMileageObject._id, editedMileageObject);

          Toast.show('Gasto editado satisfactoriamente', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
          });

          Actions.Expenses({ type: ActionConst.RESET });
        }
      } catch (e) {
        Toast.show(`Error intentando actualizar el gasto :: ${e}`, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      }
    } else if (validation.state && !this.state.showModalUpdate) {
      this.setState({ showModalUpdate: true });
    } else {
      this.setState({ showModalUpdate: false });
      Toast.show(`Error de validación :: ${validation.message}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  async removeExpense() {
    try {
      const response = await ExpensesService.removeExpense(this.props.data._id);
      console.log('Expense removed', response);
      Actions.pop();
      Actions.refresh({ shouldRefresh: true });
    } catch (e) {
      Toast.show(`Error intentando eliminar el gasto :: ${e}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  render() {
    return (
      <ExpenseDetails
        data={this.state}
        setters={this.getSetters()}
        values={this.props.values}
        updateExpense={() => { this.updateExpense(); }}
        removeExpense={() => { this.removeExpense(); }}
        showModalUpdate={this.state.showModalUpdate}
        showModalRemove={this.state.showModalRemove}
      />
    );
  }
}

export default ExpenseDetailsContainer;
