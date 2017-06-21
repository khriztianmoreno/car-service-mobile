import t from 'tcomb-form-native';

const model = t.struct({
  plate: t.refinement(t.String, plate => plate && plate.length >= 6),
  model: t.Number,
  mileage: t.Number,
  // bodyWork: t.String,
  cylinder: t.maybe(t.Number),
  vin: t.maybe(t.refinement(t.String, vin => vin && vin.length === 17)),
  service: t.maybe(t.String),
  fuel: t.maybe(t.String),
  capacity: t.maybe(t.Number),
  motor: t.maybe(t.String),
  serie: t.maybe(t.String),
});

const options = {
  fields: {
    plate: {
      label: 'PLACA',
      placeholder: 'Ej. ABC123',
      icon: 'directions-car',
      autoCapitalize: 'characters',
    },
    model: {
      label: 'MODELO',
      placeholder: 'Ej. 2017',
    },
    mileage: {
      label: 'KILOMETRAJE',
      placeholder: 'Ej. 36000',
    },
    /* bodyWork: {
      label: 'CARROCERÍA',
      placeholder: 'Ej. CERRADA',
    },*/
    cylinder: {
      label: 'CILINDRAJE',
      placeholder: 'Ej. 2500',
    },
    vin: {
      label: 'VIN',
      placeholder: 'Ej. 1FM5K8F89DGC72096',
    },
    service: {
      label: 'SERVICIO',
      placeholder: 'Ej. PÚBLICO',
    },
    fuel: {
      label: 'COMBUSTIBLE',
      placeholder: 'Ej. DIESEL',
    },
    capacity: {
      label: 'CAPACIDAD',
      placeholder: 'Ej. 4',
    },
    motor: {
      label: 'NUMERO DE MOTOR',
      placeholder: 'Ej. 23409327492374',
    },
    serie: {
      label: 'NUMERO DE SERIE',
      placeholder: 'Ej. 23897293823223',
    },
  },
};

export default { model, options };
