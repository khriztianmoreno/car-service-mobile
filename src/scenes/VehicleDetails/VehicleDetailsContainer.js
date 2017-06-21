import React from 'react';

import VehicleService from '../../services/vehicles';
import VehicleDetails from './VehicleDetails';
import LoadingWrapper from '../../components/LoadingHOC';

class VehicleDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchVehicle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.fetchVehicle();
    }
  }

  async fetchVehicle() {
    const { id } = this.props;
    try {
      const vehicle = await VehicleService.getById(id);
      this.setState({ vehicle, loading: false });
    } catch (error) {
      console.log('Error', error);
    }
  }

  render() {
    return (
      <LoadingWrapper
        loading={this.state.loading}
        text="Cargando detalles"
      >
        <VehicleDetails
          vehicle={this.state.vehicle}
        />
      </LoadingWrapper>
    );
  }
}

VehicleDetailsContainer.propTypes = {
  id: React.PropTypes.string,
};

export default VehicleDetailsContainer;
