import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, Platform, View, ScrollView } from 'react-native';
import Toast from 'react-native-root-toast';
import moment from 'moment';
import I18n from 'react-native-i18n';

import actions from '../../actions/actionTypes';
import HomeAndroid from './Home.android';
// import HomeIos from './Home.ios';
import AlertsService from '../../services/alerts';
import AuthService from '../../services/authentication';
import SystemValuesServices from '../../services/systemvalues';
import VehicleServices from '../../services/vehicles';
import SnapshotServices from '../../services/expenses';
import { setVehicle as setVehicleAction } from '../../actions/vehicleActions';
import { setShowFormHome as setShowFormHomeAction } from '../../actions/visibilityFormHome';
import { setUserObject as setUserObjectAction } from '../../actions/userActions';

class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      /* General */
      loading: true,
      /* View without initial mileage value undefined */
      errorInitialMessage: false,
      initialValueMileage: '',
      initialValueMileageSaved: false,
      /* View with initial mileage value defined */
      lastRevisionValue: null,
      monthsAgo: '',
      allInitDataReadyToSave: false,
      initDataSaved: false,
      optionsLastReview: [],
      /* Main Home */
      isCorrectCurrentMileage: true,
      showButtonsCorrectValueMileage: true,
      currentMileage: '',
      alerts: [],
      alertsConfig: [],
      language: 'es',
      alertsTemplates: [],
      addedDataOnInitHome: false,
      originalCurrentMileage: -1,
    };

    this.userObject = null;
  }

  componentWillMount() {
    this.getUserObject();
    try {
      this.getCurrentMileage();
    } catch (error) {
      console.log(`Error actualizando currentMileage en componentWillMount: ${error}`);
    }
  }

  componentDidMount() {
    this.getAlertsConfig();
  }

  async getUserObject() {
    try {
      const uid = await AsyncStorage.getItem('userId');
      const res = await AuthService.getUser(uid);
      this.userObject = res.data;

      this.initUserId();
      this.fetchAlerts();
      I18n.locale = res.data.additionalData.language.toUpperCase();
      this.props.setUserObject(res.data);
    } catch (error) {
      Toast.show(`${error.response.data.name}: ${error.response.data.message}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }
  async getAlertsConfig() {
    try {
      const alertsConfig = await SystemValuesServices.getAlertsConfig();
      this.setState({ alertsConfig });
    } catch (err) {
      Toast.show(`Error getting systemvalues: ${err}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  validators() {
    return {
      initialValueMileage: this.state.initialValueMileage.length > 0 && this.state.initialValueMileage !== '0',
      lastRevisionValue: this.state.lastRevisionValue !== null,
      monthsAgo: (this.state.monthsAgo.length > 0 && this.state.monthsAgo !== '0'),
      currentMileage: this.state.currentMileage.length > 0 && this.state.currentMileage !== '0',
    };
  }

  generateLastReviewOptions() {
    const value = this.state.initialValueMileage;
    const options = [];

    // Find last value divisible on 5 to search values for picker
    const minors = [];

    // Get first multiple of 1000 minor
    let maxLimit = value;
    for (let i = 0; i < 1000; i++) {
      if ((value - i) % 1000 === 0) {
        maxLimit = value - i;
        i = 1000;
      }
    }

    for (let i = maxLimit; i >= 0; i -= 1000) {
      if (i % 5000 === 0 && minors.length < 4 && i > 0) {
        minors.push(i);
      } else if (minors.length === 4) {
        i = 0;
      }
    }

    // Generate list of values
    for (let i = 0; i < minors.length; i++) {
      options.push({ key: `opt${i}`, label: minors[i].toString(), value: minors[i].toString() });
    }


    this.setState({ optionsLastReview: options, lastRevisionValue: options.length > 0 ? options[0].value : null });
  }

  async updateVehicleState() {
    try {
      const newVehicle = this.props.vehicle;
      newVehicle.initialMileage = true;
      await VehicleServices.updateById(this.props.vehicle._id, newVehicle);
      this.props.setVehicle(newVehicle);
      this.fetchAlerts();
      this.getCurrentMileage();
    } catch (error) {
      console.log('ERROR ACTUALIZANDO VEHÍCULOS Y SUS ALERTAS', error);
    }
  }

  async addSnapshot() {
    try {
      const newSnapshot = {
        localId: this.props.vehicle._id,
        plate: this.props.vehicle.plate.number,
        actualMileage: this.state.initialValueMileage,
        previousMileage: this.state.lastRevisionValue,
        averageMileageDay: parseInt((parseInt(this.state.initialValueMileage, 10) - parseInt(this.state.lastRevisionValue, 10)) / (parseInt(this.state.monthsAgo, 10) * 30), 10),
        daysSinceLastUpdate: parseInt(this.state.monthsAgo, 10) * 30,
      };
      console.log('newSnapshot', newSnapshot);
      const resNewSnapshot = await SnapshotServices.addExpense(newSnapshot);
      console.log('resNewSnapshot', resNewSnapshot);
    } catch (error) {
      console.log(`Error guardando el snapshot: ${error}`);
      Toast.show(`Error guardando el snapshot: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  async getCurrentMileage(id) {
    try {
      const res = await SnapshotServices.getCurrentMileage(this.props.vehicle._id ? this.props.vehicle._id : id);
      console.log('RES CURRENT MILEAGE', res.data);
      this.setState({ currentMileage: res.data, originalCurrentMileage: res.data });
    } catch (error) {
      Toast.show(`Error obteniendo el kilometraje actual: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  async initUserId() {
    // SET USER ID
    try {
      const uid = await AsyncStorage.getItem('userId');
      this.props.setUser(uid);
      this.setDataDeviceForUser(uid);
    } catch (error) {
      console.log(`error iniciando usuario: ${error}`);
    }
  }

  async setDataDeviceForUser(id) {
    try {
      let adData = null;
      if (!this.props.userObject) {
        adData = {
          additionalData: this.userObject.additionalData,
        };
      } else {
        adData = {
          additionalData: this.props.userObject.additionalData,
        };
      }

      adData.additionalData.dataDevice = {
        id: this.props.deviceId,
        tags: this.props.deviceTags ? [] : this.props.deviceTags,
      };
      await AuthService.setDataDeviceForUser(id, adData);
    } catch (error) {
      Toast.show(`Error agregando data device al usuario: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  async saveDataHome() {
    try {
      const alerts = [];
      if (this.props.vehicle.plate.number) {
        this.state.alertsConfig.map((item) => {
          alerts.push(
            {
              category: item.category[this.state.language],
              subCategory: item.subCategory[this.state.language],
              idSubcategory: item.code,
              name: item.subCategory[this.state.language],
              periodicity: item.periodicity,
              idUser: this.props.user,
              idVehicle: this.props.vehicle._id,
              plate: {
                number: this.props.vehicle.plate.number,
                origin: this.props.vehicle.plate.origin,
              },
              startMileage: parseInt(this.state.lastRevisionValue, 10),
              startDate: moment().subtract(parseInt(this.state.monthsAgo, 10), 'months').format(),
            },
          );
        });

        await AlertsService.addAlert(alerts);

        Toast.show('Información almacenada correctamente', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      } else {
        Toast.show('El vehículo actual no tiene un origen definido', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      }
    } catch (error) {
      // console.log('ERROR GUARDANDO ALERTAS EN HOME', error);
      Toast.show(`Error guardando alerta: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  async fetchAlerts() {
    try {
      const alerts = await AlertsService.getAlerts();
      // console.log('ALERTSSSSSSS', alerts.data.data.length);
      this.updateState('alerts', alerts.data.data);
    } catch (error) {
      console.log('error getting alert on home', error);
    }
  }

  updateState(type, value) {
    if (type === 'initialValueMileage') {
      if (value.length > 0) {
        this.setState({ initialValueMileage: value, errorInitialMessage: false });
      } else {
        this.setState({ initialValueMileage: value, errorInitialMessage: true });
      }
    }
    if (type === 'errorInitialMessage') this.setState({ errorInitialMessage: value });
    if (type === 'initialValueMileageSaved') this.setState({ initialValueMileageSaved: value });
    if (type === 'lastRevisionValue') this.setState({ lastRevisionValue: value });
    if (type === 'monthsAgo') this.setState({ monthsAgo: value });
    // if (type === 'initValuesSaved') this.setState({ initValuesSaved: value });
    if (type === 'initDataSaved') this.setState({ initDataSaved: value });
    if (type === 'isCorrectCurrentMileage') this.setState({ isCorrectCurrentMileage: value });
    if (type === 'showButtonsCorrectValueMileage') this.setState({ showButtonsCorrectValueMileage: value });
    if (type === 'currentMileage') this.setState({ currentMileage: value });
    if (type === 'alerts') this.setState({ alerts: value });
  }

  saveInitialValueMileage() {
    this.updateState('initialValueMileageSaved', true);
  }

  updateCurrentMileageValue() {
    this.updateState('isCorrectCurrentMileage', true);
  }

  async updateCurrentMileageOnDb() {
    try {
      const objMileageSnapshot = {
        localId: this.props.vehicle._id,
        plate: this.props.vehicle.plate.number,
        actualMileage: this.state.currentMileage,
      };
      await SnapshotServices.addExpense(objMileageSnapshot);
      this.setState({ originalCurrentMileage: this.state.currentMileage });
      Toast.show('Kilometraje actualizado.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    } catch (error) {
      console.log(`Error actualizando kilometraje actual: ${error}`);
      Toast.show(`Error actualizando kilometraje actual: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.vehicle._id  && nextProps.vehicle._id) {
      this.getCurrentMileage(nextProps.vehicle._id);
    }
    return true;
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#FFF', flex: 1, flexDirection: 'column', padding: 0 }}>
        <View style={{ minHeight: 450 }}>
          {
            Platform.OS === 'android'
              ?
                <HomeAndroid
                  data={[]}
                  errorInitialMessage={this.state.errorInitialMessage}
                  initialValueMileage={this.state.initialValueMileage}
                  updateState={(type, value) => this.updateState(type, value)}
                  initialValueMileageSaved={this.state.initialValueMileageSaved}
                  saveInitialValueMileage={() => this.saveInitialValueMileage()}
                  lastRevisionValue={this.state.lastRevisionValue}
                  setStates={{
                    lastRevisionValue: v => this.setState({ lastRevisionValue: v }),
                    monthsAgo: v => this.setState({ monthsAgo: v }),
                    showForm: v => this.props.setShowForm(v),
                  }}
                  monthsAgo={this.state.monthsAgo}
                  // initValuesSaved={this.state.initValuesSaved}
                  initDataSaved={this.state.initDataSaved}
                  validators={this.validators()}
                  isCorrectCurrentMileage={this.state.isCorrectCurrentMileage}
                  showButtonsCorrectValueMileage={this.state.showButtonsCorrectValueMileage}
                  updateCurrentMileageValue={() => this.updateCurrentMileageValue()}
                  alerts={this.state.alerts}
                  generateLastReviewOptions={() => this.generateLastReviewOptions()}
                  optionsLastReview={this.state.optionsLastReview}
                  currentMileage={this.state.currentMileage}
                  saveDataHome={() => {
                    this.saveDataHome();
                    this.updateVehicleState();
                    // save snapshot
                    this.addSnapshot();
                    // Update state vehicle (redux store)
                    const veh = this.props.vehicle;
                    veh.initialMileage = true;
                    this.props.setVehicle(veh);
                  }}
                  vehicle={this.props.vehicle}
                  updateVehicle={v => this.props.setVehicle(v)}
                  addedDataOnInitHome={this.state.addedDataOnInitHome}
                  updateCurrentMileage={v => this.setState({ currentMileage: v })}
                  updateCurrentMileageOnDb={() => this.updateCurrentMileageOnDb()}
                  originalCurrentMileage={this.state.originalCurrentMileage}
                  showForm={this.props.showForm}
                />
              :
                <HomeAndroid />
          }
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  deviceId: state.deviceId,
  deviceTags: state.deviceTags,
  user: state.user,
  userObject: state.userObject,
  listVehicles: state.listVehicles,
  showForm: state.showForm,
});

const mapDispatchToProps = dispatch => ({
  setDeviceId(status) {
    dispatch({ type: actions.SET_DEVICE_ID, payload: status });
  },
  setUser(status) {
    dispatch({ type: actions.SET_USER_ID, payload: status });
  },
  setVehicle(vehicle) {
    return dispatch(setVehicleAction(vehicle));
  },
  setShowForm(state) {
    return dispatch(setShowFormHomeAction(state));
  },
  setUserObject(user) {
    return dispatch(setUserObjectAction(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
