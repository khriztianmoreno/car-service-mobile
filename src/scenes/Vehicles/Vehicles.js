import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ListView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Icon, Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import 'moment/locale/es';
import { SwipeListView } from 'react-native-swipe-list-view';

import styles from './styles';
import globalStyles from '../../config/styles';
import NoNetwork from '../../components/NoNetwork';
import ItemCard from '../../components/ItemCard';
import Fab from '../../components/Fab';
import CustomModal from '../../components/CustomModal';

const stylesSwipeListView = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});

const ModalDeleteVehicle = (props) => {
  return (
    <CustomModal
      show={props.showModalRemoveVehicle}
      needToEdit={false}
      showModalCallback={() => props.setStates.showModalRemoveVehicle(false)}
      contentTitle={'¿Está seguro de eliminar este vehículo?'}
      buttonOkDisabled
      buttonOkLabel="Eliminar"
      buttonOkCallback={() => props.removeVehicle()}
      buttonCancelLabel="Cancelar"
      buttonCancelCallback={() => props.setStates.showModalRemoveVehicle(false)}
    />
  );
};

const LoadingIndicator = (loading) => {
  return (
    <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
      <ActivityIndicator
        animating={loading}
        style={[globalStyles.centering, { height: 80 }]}
        size="large"
      />
    </View>
  );
};

const mySwipeListView = (props) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return (
    <View style={[styles.container, globalStyles.dimensions]}>
      <SwipeListView
        enableEmptySections
        disableRightSwipe
        dataSource={ds.cloneWithRows(props.vehicles)}
        renderRow={car => (
          <ItemCard
            key={car._id}
            leftTitle={car.plate.number}
            rightTitle={`${car.vehicleData.mileage} km`}
            colorLeftIcon={globalStyles.palette.background.second.backgroundColor}
            letter={car.plate.number[0]}
            onPress={() => props.goToDetail(car._id)}
          />
        )}
        renderHiddenRow={car => (
          <View style={stylesSwipeListView.rowBack}>
            <Text style={{ color: 'white' }} />
            <View>
              <Icon
                name="delete"
                color="red"
                size={28}
                onPress={() => {
                  props.removeVehicle(car._id);
                  // props.setStates.showModalRemoveVehicle(true);
                }}
              />
            </View>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />

      <Fab onPress={() => Actions.AddVehicle()} iconName="add" style={{ bottom: 25 }} />
    </View>
  );
};

const VehicleCard = (props) => {
  const formatedDate = moment(props.car.createdAt).utc().format('MMMM DD YYYY');
  return (
    <Card containerStyle={[styles.cardContainer]} style={{ marginLeft: -5 }}>
      <TouchableOpacity
        onPress={() => props.goToDetail(props.car._id)}
      >
        <Text style={styles.plate}>{props.car.plate.number}</Text>
        <Text style={styles.created}>Creado en {formatedDate}</Text>
      </TouchableOpacity>
    </Card>
  );
};

const CardNoInfo = () => {
  return (
    <Card title="Aún no hay información">
      <Text style={{ marginBottom: 10 }}>
        En este momento no hay gastos para mostrar en el vehículo seleccionado
      </Text>
    </Card>
  );
};

const Vehicles = (props) => {
  if (props.existNetwork) {
    if (props.loading) {
      return LoadingIndicator(props.loading);
    }
    return (
      mySwipeListView(props)
    );
  }
  return (
    <NoNetwork />
  );
};

Vehicles.propTypes = {
  vehicles: React.PropTypes.arrayOf(React.PropTypes.object),
  goToDetail: React.PropTypes.func,
};

VehicleCard.propTypes = {
  car: React.PropTypes.shape({
    _id: React.PropTypes.string,
    plate: React.PropTypes.object,
    createdAt: React.PropTypes.string,
  }),
  goToDetail: React.PropTypes.func,
};

export default Vehicles;
