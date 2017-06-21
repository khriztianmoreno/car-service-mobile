import t from 'tcomb-form-native';
import moment from 'moment';
import i18n from 'react-native-i18n';

const model = t.struct({
  plate: t.refinement(t.String, plate => plate && plate.length >= 6),
  model: t.refinement(t.Number, mod => mod <= parseInt(moment().format('YYYY'), 10) + 1),
  // mileage: t.Number,
  // bodyWork: t.String,
  /*cylinder: t.Number,
  vin: t.refinement(t.String, vin => vin && vin.length === 17),*/
});

const options = {
  fields: {
    plate: {
      label: i18n.t('vehicles'),
      placeholder: 'Ej. ABC123',
      icon: 'directions-car',
      autoCapitalize: 'characters',
    },
    model: {
      label: 'MODELO',
      placeholder: 'Ej. 2017',
    },
    /*mileage: {
      label: 'KILOMETRAJE',
      placeholder: 'Ej. 36000',
    },*/
    /*bodyWork: {
      label: 'CARROCERÍA',
      placeholder: 'Ej. CERRADA',
    },
    /*cylinder: {
      label: 'CILINDRAJE',
      placeholder: 'Ej. 2500',
    },
    vin: {
      label: 'VIN',
      placeholder: 'Ej. 1FM5K8F89DGC72096',
    },*/
  },
};

export default { model, options };
