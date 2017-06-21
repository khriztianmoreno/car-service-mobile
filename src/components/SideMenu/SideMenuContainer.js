import React from 'react';
import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import FBSDK from 'react-native-fbsdk';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

// Local imports
import SideMenu from './SideMenu';
import menuOptions from './menuOptions';
import { setVehicle as setVehicleAction } from './../../actions/vehicleActions';
import { setVehicles as setVehiclesListAction } from './../../actions/listVehicleActions';
import { setShowFormHome as setShowFormHomeAction } from '../../actions/visibilityFormHome';

import Auth from './../../services/authentication';
import vehiclesAPI from './../../services/vehicles';

const PRIMARY = menuOptions[0];
const SECONDARY = menuOptions[1];

const {
  LoginManager,
} = FBSDK;

class SideMenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeList: PRIMARY,
      vehiclesFetch: {
        list: [],
      },
      currentVehicle: {
        plate: { number: 'PLACA' },
        vehicleData: { brand: 'Marca' },
      },
      mainVehiclePresent: false,
    };
  }

  componentDidMount() {
    this.initialFetch();
    // this.updateListAfterChangeVehicleList();
    PRIMARY.list.map(option => option.title = I18n.t(`title.${option.key}`));
  }

  shouldComponentUpdate(nextProps, nextState) {
    PRIMARY.list.map(option => option.title = I18n.t(`title.${option.key}`));
    return true;
  }

  async handleMenuOptions(key, data) {
    switch (key) {
    case 'home': {
      Actions.Home({ type: ActionConst.REPLACE });
      this.props.toggleDrawer();
      break;
    }
    case 'expenses_record': {
      Actions.Expenses({ type: ActionConst.REPLACE });
      this.props.toggleDrawer();
      break;
    }
    case 'vehicles': {
      Actions.Vehicles({ type: ActionConst.REPLACE, shouldPop: true });
      this.props.toggleDrawer();
      break;
    }
    case 'alerts_center': {
      Actions.AlertsCenter({ type: ActionConst.REPLACE });
      this.props.toggleDrawer();
      break;
    }
    case 'providers': {
      Actions.ServicesMap({ type: ActionConst.REPLACE });
      this.props.toggleDrawer();
      break;
    }
    case 'promotions': {
      Actions.Promotions({ type: ActionConst.REPLACE });
      this.props.toggleDrawer();
      break;
    }
    case 'logout': {
      this.props.setShowForm(true);
      Auth.logout();
      LoginManager.logOut();
      this.props.setVehicle({});
      Actions.SignIn({ type: ActionConst.RESET });
      break;
    }
    case 'change-vehicles': {
      try {
        this.props.setVehicle(data);
        await AsyncStorage.setItem('currentVehicle', JSON.stringify(data));
        this.setState({
          currentVehicle: data,
          activeList: PRIMARY,
        });
        Actions.refresh({ shouldRefresh: true });
      } catch (error) {
        console.log('Error guardando el actual vehiculo en local', error);
      }
      break;
    }
    case 'add-vehicles': {
      Actions.AddVehicle();
      // this.props.toggleDrawer();
      break;
    }
    case 'configuration': {
      Actions.Configuration({ type: ActionConst.REPLACE });
      this.props.toggleDrawer();
      break;
    }
    default:
    }
  }

  handleChangeList() {
    if (this.state.activeList.title === 'PRIMARY') {
      const vehicles = this.props.listVehicles.map(vehicle => ({
        id: vehicle._id,
        key: 'change-vehicles',
        title: vehicle.plate.number,
        icon: 'directions-car',
        data: vehicle,
      }));

      const newList = {
        title: SECONDARY.title,
        list: vehicles.concat(SECONDARY.list),
      };
      this.setState({ vehiclesFetch: newList, activeList: newList });
    } else {
      this.setState({ activeList: PRIMARY });
    }
  }

  updateListAfterChangeVehicleList() {
    if (this.state.activeList.title !== 'PRIMARY') {
      console.log('UPDATINGGGGGGGGGGGG', this.props.listVehicles);
      const vehicles = this.props.listVehicles.map(vehicle => ({
        id: vehicle._id,
        key: 'change-vehicles',
        title: vehicle.plate.number,
        icon: 'directions-car',
        data: vehicle,
      }));

      const newList = {
        title: SECONDARY.title,
        list: vehicles.concat(SECONDARY.list),
      };
      this.setState({ vehiclesFetch: newList, activeList: newList });
    }
  }

  async initialFetch() {
    try {
      const resp = await vehiclesAPI.getAll();
      // const resp = await vehiclesAPI.getById();

      const vehicles = resp.map(vehicle => ({
        id: vehicle._id,
        key: 'change-vehicles',
        title: vehicle.plate.number,
        icon: 'directions-car',
        data: vehicle,
      }));

      this.props.setVehiclesList(resp);

      this.setState(() => {
        const newList = {
          title: SECONDARY.title,
          list: vehicles.concat(SECONDARY.list),
        };

        return {
          vehiclesFetch: newList,
        };
      });

      if (!vehicles.length) return Actions.AddVehicle({ type: ActionConst.RESET, direction: 'horizontal' });
      this.setDefaultVehicle(vehicles.length ? vehicles[0].data : null);
      // this.props.setVehicle(vehicles.length ? vehicles[0].data : null);
    } catch (error) {
      console.log('ERROR INITIAL FETCH: ', error);
    }
  }

  async setDefaultVehicle(vehicle) {
    try {
      const current = await AsyncStorage.getItem('currentVehicle');
      if (current) {
        this.setState({ currentVehicle: JSON.parse(current) });
        this.props.setVehicle(JSON.parse(current));
      } else if (vehicle) {
        this.setState({ currentVehicle: vehicle });
        await AsyncStorage.setItem('currentVehicle', JSON.stringify(vehicle));
        this.props.setVehicle(vehicle);
      } else {
        this.setState({ currentVehicle: { plate: { number: 'PLACA' }, vehicleData: { brand: 'Marca' } } });
      }
    } catch (error) {
      console.log('Error obteniendo el vehiculo por defecto', error);
    }
  }

  render() {
    return (
      <SideMenu
        primaryList={this.state.activeList}
        onOptionPress={(key, data) => this.handleMenuOptions(key, data)}
        toggleDrawer={() => this.props.toggleDrawer()}
        changeList={() => this.handleChangeList()}
        currentVehicle={this.state.currentVehicle}
      />
    );
  }
}

SideMenuContainer.propTypes = {
  toggleDrawer: React.PropTypes.func,
  setVehicle: React.PropTypes.func,
};

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  user: state.user,
  listVehicles: state.listVehicles,
  showForm: state.showForm,
});

const mapDispatchToProps = dispatch => ({
  setVehicle(vehicle) {
    return dispatch(setVehicleAction(vehicle));
  },
  setVehiclesList(vehicle) {
    return dispatch(setVehiclesListAction(vehicle));
  },
  setShowForm(state) {
    return dispatch(setShowFormHomeAction(state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContainer);
