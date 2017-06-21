import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
// Refactor this import to container
import { Actions } from 'react-native-router-flux';

import styles from './styles';

import FBSendEvent from '../../helpers/FBAnalytics';

const RowInfo = props => (
  <View style={styles.row}>
    <View style={styles.rowContainer}>

      <View style={styles.rowIcon}>
        <Icon name={props.icon} size={24} color="grey" />
      </View>

      <Text style={styles.rowLabel}>{props.label}</Text>

      <View style={styles.alignEnd}>
        <Text>{props.value}</Text>
      </View>

    </View>
  </View>
);

const VehicleDetails = ({ vehicle }) => (
  <View style={styles.container}>
    <RowInfo icon="directions-car" label="Placa" value={vehicle.plate.number} />
    <RowInfo icon="local-offer" label="Modelo" value={vehicle.vehicleData.model} />
    <RowInfo icon="local-shipping" label="Marca" value={vehicle.vehicleData.brand} />
    <RowInfo icon="linear-scale" label="Línea" value={vehicle.vehicleData.line} />
    <RowInfo icon="class" label="Clase" value={vehicle.vehicleData.class} />
    <RowInfo icon="rv-hookup" label="Kilometraje" value={vehicle.vehicleData.mileage} />
    <Button
      buttonStyle={{ marginLeft: 16, marginRight: 16, marginTop: 8, bottom: 0 }}
      raised
      icon={{ name: 'add' }}
      title="AGREGAR MÁS INFORMACIÓN"
      onPress={() => {
        FBSendEvent.vehiclesAddMoreInfo({});
        Actions.EditVehicle({ vehicle });
      }}
    />
  </View>
);

VehicleDetails.propTypes = {
  vehicle: PropTypes.object,
};

export default VehicleDetails;
