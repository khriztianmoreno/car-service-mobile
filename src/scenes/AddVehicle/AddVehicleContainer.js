import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import AddVehicle from './AddVehicle';
import { AddVehicleModel } from '../../models/formModels';
import SystemValues from '../../services/systemvalues';
import VehicleService from '../../services/vehicles';
import LoadingWrapper from '../../components/LoadingHOC';
import { BTN_STATUS } from './../../components/ButtonStatus';

import { setVehicle as setVehicleAction } from './../../actions/vehicleActions';
import { setVehicles as setVehiclesListAction } from './../../actions/listVehicleActions';

class AddVehicleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carFormData: {
        plate: null,
        model: null,
        mileage: null,
        bodyWork: null,
      },
      selectOptions: [
        {
          icon: 'local-shipping',
          key: 'brand',
          label: 'Marca',
          value: null,
          status: BTN_STATUS.INITIAL,
          placeholder: 'Ej. CHEVROLET, MAZDA, TOYOTA',
          searchMessage: 'Busca la marca de tu vehículo, por ejemplo: CHEVROLET, RENAULT',
        },
        {
          icon: 'linear-scale',
          key: 'line',
          label: 'Linea',
          value: null,
          status: BTN_STATUS.INITIAL,
          placeholder: 'Ej. CORSA, TWINGO',
          emptyInitial: true,
          searchMessage: 'Busca la línea de tu vehículo, por ejemplo: TWINGO, CORSA, AVEO',
        },
        /*{
          icon: 'class',
          key: 'vClass',
          label: 'Clase',
          value: null,
          status: BTN_STATUS.INITIAL,
        },*/
      ],
      selectData: {
        brand: [],
        line: [],
        // vClass: [],
      },
      country: { cca2: 'CO', name: { spa: 'Colombia' } },
      loading: true,
    };
  }

  componentDidMount() {
    /* const { brand, line, vClass } = this.state.selectData;
    if (!(brand.length && line.length && vClass.length)) {
      this.fetchValues();
    }*/
    const { brand, line } = this.state.selectData;
    if (!(brand.length && line.length)) {
      this.fetchValues();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldRefresh) {
      this.fetchValues();
    }
  }

  onSelectModalOption(value, key) {
    this.setState((prevState) => {
      const idx = prevState.selectOptions.map(o => o.key).indexOf(key);
      const item = { ...prevState.selectOptions[idx] };
      item.value = value;
      item.status = BTN_STATUS.VALID;
      return { selectOptions: [
        ...prevState.selectOptions.slice(0, idx),
        item,
        ...prevState.selectOptions.slice(idx + 1),
      ] };
    });
  }

  getSelectValues() {
    const selectOptionsCp = this.state.selectOptions.map((o) => {
      const obj = { ...o };
      if (!obj.value) {
        obj.status = BTN_STATUS.INVALID;
      }
      return obj;
    });

    const invalid = selectOptionsCp.filter(o => (!o.value));
    if (invalid.length) {
      this.setState({
        selectOptions: selectOptionsCp,
      });
      return null;
    }
    return selectOptionsCp;
  }

  async fetchValues() {
    try {
      const brands = await SystemValues.getBrands();
      const lines = await SystemValues.getLines();
      // const classes = await SystemValues.getClasses();

      this.setState({
        selectData: {
          brand: brands,
          line: lines,
          // vClass: classes,
        },
        loading: false,
      });
    } catch (e) {
      console.log('Error:', e);
    }
  }

  static generateVehicle(baseValues, selectValues, countryCode) {
    const sValues = selectValues.reduce((v, current) => {
      const obj = { ...v };
      if (current.key === 'vClass') {
        obj.class = current.value;
      } else {
        obj[current.key] = current.value;
      }
      return obj;
    }, {});

    return {
      plate: {
        number: baseValues.plate,
        origin: countryCode,
      },
      contacts: [],
      customer: {},
      documents: [],
      warnings: [],
      reviews: [],
      active: {
        type: Boolean,
        default: true,
      },
      vehicleData: {
        ...baseValues,
        ...sValues,
        cyl: 0,
        color: null,
        service: null,
        capacity: 0,
        fuel: null,
        motor: null,
        serie: null,
        chassis: null,
        vin: null,
        owner: {},
      },
    };
  }

  async handleFormSubmit(form) {
    const formBaseValues = form.getValue();
    const formSelectValues = this.getSelectValues();
    if (formBaseValues && formSelectValues) {
      const vehicle = AddVehicleContainer.generateVehicle(
        formBaseValues,
        formSelectValues,
        this.state.country.cca2,
      );

      try {
        const vData = await VehicleService.create(vehicle);
        Alert.alert(
          'Estado',
          `Vehículo con placa ${vData.plate.number} agregado exitosamente.`);

        this.getAllvehicles();

        if (this.props.navigationState.direction === 'vertical') {
          Actions.pop();
          Actions.refresh({ shouldRefresh: true });
        } else {
          Actions.drawer({ type: ActionConst.RESET });
        }
      } catch (e) {
        console.log('Error in handle form submit', e);
        if (e.response && e.response.status === 409) {
          Alert.alert(
            'Error',
            'El vehículo que intentó crear ya existe en el sistema.');
        } else {
          Alert.alert(
            'Error',
            'Error agregando el vehículo, intente nuevamente.');
        }
      }
    }
  }

  async getAllvehicles() {
    try {
      const resp = await VehicleService.getAll();
      // const resp = await vehiclesAPI.getById();

      const vehicles = resp.map(vehicle => ({
        id: vehicle._id,
        key: 'change-vehicles',
        title: vehicle.plate.number,
        icon: 'directions-car',
        data: vehicle,
      }));
      console.log('GET ALL VEHICLES ADD VEHICLE');
      this.props.setVehiclesList(resp);
    } catch (error) {
      console.log('ERROR GETTING ALL VEHICLES ON ADD VEHICLE: ', error);
    }
  }

  updateCountry(country) {
    this.setState({ country });
  }

  render() {
    return (
      <LoadingWrapper
        loading={this.state.loading}
        text="Cargando información..."
      >
        <AddVehicle
          formSchema={AddVehicleModel.model}
          formOptions={AddVehicleModel.options}
          selectOptions={this.state.selectOptions}
          selectData={this.state.selectData}
          onSelectModalOption={(v, key) => this.onSelectModalOption(v, key)}
          onFormSubmit={form => this.handleFormSubmit(form)}
          value={this.state.car}
          handleValueChange={value => this.setState({ car: value })}
          updateCountry={val => this.updateCountry(val)}
        />
      </LoadingWrapper>
    );
  }
}

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleContainer);

