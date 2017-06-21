import React from 'react';
import { Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';

import EditVehicle from './EditVehicle';
import { EditVehicleModel } from '../../models/formModels';
import SystemValues from '../../services/systemvalues';
import VehicleService from '../../services/vehicles';
import LoadingWrapper from '../../components/LoadingHOC';
import { BTN_STATUS } from './../../components/ButtonStatus';

const R = require('ramda');

const generateVehicle = (original, baseValues, selectValues) => {
  const sValues = selectValues.reduce((v, current) => {
    const obj = { ...v };
    if (current.key === 'vClass') {
      obj.class = current.value;
    } else {
      obj[current.key] = current.value;
    }
    return obj;
  }, {});

  const plate = {
    plate: { number: baseValues.plate },
  };

  const vehicleData = {
    ...R.omit(['plate'], baseValues),
    ...sValues,
  };

  return R.mergeAll([original, plate, { vehicleData }]);
};

class EditVehicleContainer extends React.Component {
  constructor(props) {
    super(props);
    const vehicleValues = { ...props.vehicle.vehicleData };
    this.state = {
      carFormData: {
        ...vehicleValues,
        plate: props.vehicle.plate.number,
      },
      selectOptions: [
        {
          icon: 'local-shipping',
          key: 'brand',
          label: 'Marca',
          value: vehicleValues.brand,
          status: BTN_STATUS.INITIAL,
          required: true,
        },
        {
          icon: 'linear-scale',
          key: 'line',
          label: 'Linea',
          value: vehicleValues.line,
          status: BTN_STATUS.INITIAL,
          required: true,
        },
        {
          icon: 'class',
          key: 'vClass',
          label: 'Clase',
          value: vehicleValues.class,
          status: BTN_STATUS.INITIAL,
          required: false,
        },
      ],
      selectData: {
        brand: [],
        line: [],
        vClass: [],
      },
      loading: true,
    };
  }

  componentDidMount() {
    const { brand, line } = this.state.selectData;
    if (!(brand.length && line.length)) {
      this.fetchValues();
    }
  }

  onSelectModalOption(value, key) {
    this.setState((prevState) => {
      const idx = prevState.selectOptions.map(o => o.key).indexOf(key);
      const item = { ...prevState.selectOptions[idx] };
      item.value = value;
      item.status = BTN_STATUS.VALID;
      return {
        selectOptions: [
          ...prevState.selectOptions.slice(0, idx),
          item,
          ...prevState.selectOptions.slice(idx + 1),
        ],
      };
    });
  }

  getSelectValues() {
    const selectOptionsCp = this.state.selectOptions.map((o) => {
      const obj = { ...o };
      if (!obj.value && obj.required) {
        obj.status = BTN_STATUS.INVALID;
      }
      return obj;
    });

    const invalid = selectOptionsCp.filter(o => (!o.value && o.required));
    if (invalid.length) {
      this.setState({
        selectOptions: selectOptionsCp,
      });
      return null;
    }
    return selectOptionsCp;
  }

  async handleFormSubmit(form) {
    const formBaseValues = form.getValue();
    const formSelectValues = this.getSelectValues();
    if (formBaseValues && formSelectValues) {
      const vehicle = generateVehicle(
        this.props.vehicle,
        formBaseValues,
        formSelectValues,
      );

      console.log(vehicle);

      try {
        const vData = await VehicleService.updateById(this.props.vehicle._id, vehicle);
        /* Alert.alert(
          'Estado',
          `Vehículo con placa ${vData.plate.number} actualizado exitosamente.`); */
        Toast.show('Vehículo actualizado, felicitaciones.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
        // Actions.pop();
        // Actions.refresh({ shouldRefresh: true });
        Actions.Vehicles({ type: ActionConst.RESET });
      } catch (e) {
        console.log('Error in handle form submit', e);
        if (e.response && e.response.status === 409) {
          Alert.alert(
            'Error',
            'La placa que desea utilizar ya está registrada.');
        } else {
          Alert.alert(
            'Error',
            'Error editando el vehículo, intente nuevamente.');
        }
      }
    }
  }

  async fetchValues() {
    try {
      const brands = await SystemValues.getBrands();
      const lines = await SystemValues.getLines();
      const classes = await SystemValues.getClasses();

      this.setState({
        selectData: {
          brand: brands,
          line: lines,
          vClass: classes,
        },
        loading: false,
      });
    } catch (e) {
      console.log('Error:', e);
    }
  }

  render() {
    return (
      <LoadingWrapper
        loading={this.state.loading}
        text="Cargando información..."
      >
        <EditVehicle
          formSchema={EditVehicleModel.model}
          formOptions={EditVehicleModel.options}
          selectOptions={this.state.selectOptions}
          selectData={this.state.selectData}
          onSelectModalOption={(v, key) => this.onSelectModalOption(v, key)}
          onFormSubmit={form => this.handleFormSubmit(form)}
          value={this.state.carFormData}
          handleValueChange={value => this.setState({ carFormData: value })}
        />
      </LoadingWrapper>
    );
  }
}

export default EditVehicleContainer;
