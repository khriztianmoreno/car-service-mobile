import React from 'react';
import { AsyncStorage, Alert, Platform, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

import Promotions from './Promotions';
import promoService from './../../services/promotion';

const OS = Platform.OS;

class PromotionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [],
      phoneNumber: null,
      modalVisible: false,
      selectedPromo: null,
      location: null,
      refreshing: false,
      located: true,
      isLocationPermissionsGranted: true,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.requestLocationPermissions();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.online && !this.props.online) {
      if (Platform.OS === 'android') {
        this.requestLocationPermissions();
      } else {
        this.fetchData();
      }
    }
  }

  async requestLocationPermissions() {
    try {
      const granted = await PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted) {
        this.fetchData();
      } else {
        Alert.alert('Sin permisos', 'no ha conceido permisos a Mobi para acceder a su localización. Este servicio no podrá ser usado adecuadamente');
      }
      this.setState({ isLocationPermissionsGranted: granted });
    } catch(err) {
      console.log('error location', err);
    }
  }

  async fetchData() {
    global.navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const pos = position.coords;
          // let vehicle = await AsyncStorage.getItem('currentVehicle');
          // vehicle = JSON.parse(vehicle);
          console.log('VEHICLE REDUX', this.props.vehicle);
          const promos = await promoService.getAll(pos, this.props.vehicle.plate.origin);
          const parsedPromos = promos
            .map((promo) => {
              const { id, image, name, description } = promo;
              return { id, image, title: name, description };
            });
          this.setState({ promotions: parsedPromos, refreshing: false });
        } catch (error) {
          Toast.show(`Error solicitando las promociones :: ${JSON.stringify(error)}`, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
          });
        }
      },
      (error) => {
        if (error !== 'No available location provider') {
          this.activeGPS();
        } else {
          Toast.show(`Error obteniendo su posición ${JSON.stringify(e)}`, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
          });
        }
      },
    );
  }

  isValidPhoneNumber() {
    const regexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regexp.test(this.state.phoneNumber);
  }

  showModal(state) {
    this.setState({ modalVisible: state });
  }

  updatePhoneNumber(number) {
    this.setState({ phoneNumber: number });
  }

  requestPromo(id) {
    this.setState({
      selectedPromo: id,
      modalVisible: true,
    });
  }

  async requestPromotion() {
    const { selectedPromo: id } = this.state;
    const item = this.state.promotions.filter(i => i.id === id)[0];
    try {
      // const userId = await AsyncStorage.getItem('userId');
      const reqData = {
        // id: userId,
        id: this.props.user,
        promotionType: item.title,
        phoneNumber: this.state.phoneNumber,
      };
      await promoService.create(reqData);
      Toast.show('Solicitud exitosa', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      this.setState({ modalVisible: false, phoneNumber: null });
    } catch (error) {
      Toast.show(`Error solicitando el servicio :: ${JSON.stringify(error)}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      this.showModal(false);
    }
  }

  refresh() {
    this.setState({ refreshing: true });
    this.requestLocationPermissions();
  }

  activeGPS() {
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: '<h2>¿Usar GPS?</h2>Mobi desea habilitar su GPS:<br/><br/>Se usará GPS, Wi-Fi, y red celular para localizarle<br/>',
        ok: 'SÍ',
        cancel: 'NO',
      })
      .then((success) => {
        this.refresh();
        this.setState({ located: true });
      })
      .catch((e) => {
        console.log('ERROR GPS', e);
        Toast.show('No ha dado los permisos necesarios para lozalizarlo', {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
        });

        this.setState({ located: false });
      });
    }
  }

  render() {
    return (
      <Promotions
        data={this.state.promotions}
        requestPromotion={id => this.requestPromo(id)}
        isValidPhoneNumber={() => this.isValidPhoneNumber()}
        showModal={val => this.showModal(val)}
        finishRequest={() => this.requestPromotion()}
        updatePhoneNumber={num => this.updatePhoneNumber(num)}
        phoneNumber={this.state.phoneNumber}
        isVisible={this.state.modalVisible}
        refreshing={this.state.refreshing}
        refreshPromotions={() => this.refresh()}
        online={this.props.online}
        located={this.state.located}
        activeGPS={() => this.activeGPS()}
        isLocationPermissionsGranted={this.state.isLocationPermissionsGranted}
        requestLocationPermissions={() => this.requestLocationPermissions()}
      />
    );
  }
}

const mapStateToProps = state => ({
  online: state.online,
  vehicle: state.vehicle,
  user: state.user,
});

PromotionsContainer.propTypes = {
  online: React.PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(PromotionsContainer);
