import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Vehicles from './Vehicles';
import VehicleService from '../../services/vehicles';
import { setVehicle as setVehicleAction } from './../../actions/vehicleActions';
import { setVehicles as setVehiclesListAction } from './../../actions/listVehicleActions';

import NetUtils from '../../services/connectivity';

class VehiclesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      loading: true,
      existNetwork: true,
      showModalRemove: false,
      vehicleToRemove: null,
      showModalRemoveVehicle: false,
    };
  }

  componentDidMount() {
    this.fetchVehicles();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.shouldRefresh)
      || (nextProps.online && !this.props.online)
    ) {
      console.log('Refetching vehicles');
      this.fetchVehicles();
    }
  }

  goToDetail(id) {
    Actions.VehicleDetails({ id });
  }

  async fetchVehicles(wasDeleted) {
    try {
      const vehicles = await VehicleService.getAll();

      if (wasDeleted) this.props.setVehiclesList(vehicles);
      // this.props.setVehiclesList(vehicles);

      if (vehicles.length) {
        this.setState({
          vehicles,
          loading: false,
        });
      }
    } catch (e) {
      console.log('Error getting vehicles:', e);
    }
  }

  async removeVehicle(id) {
    try {
      await VehicleService.removeById(id);
      this.setState({ loading: true });
      this.fetchVehicles(true);
    } catch (e) {
      console.log('error removing vehicle', id);
    }
  }

  render() {
    const { online } = this.props;
    return (
      <Vehicles
        vehicles={this.state.vehicles}
        goToDetail={id => this.goToDetail(id)}
        existNetwork={online}
        loading={this.state.loading}
        setLoading={loading => this.setState({ loading })}
        removeVehicle={id => this.removeVehicle(id)}
        showModalRemoveVehicle={this.state.showModalRemoveVehicle}
        setStates={{
          showModalRemoveVehicle: v => this.setState({ showModalRemoveVehicle: v }),
        }}
      />
    );
  }
}

VehiclesContainer.propTypes = {
  online: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  online: state.online,
  listVehicles: state.listVehicles,
});

const mapDispatchToProps = dispatch => ({
  setVehicle(vehicle) {
    return dispatch(setVehicleAction(vehicle));
  },
  setVehiclesList(vehicle) {
    return dispatch(setVehiclesListAction(vehicle));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesContainer);
