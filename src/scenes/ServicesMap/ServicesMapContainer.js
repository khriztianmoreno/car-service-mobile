import React from 'react';
import { connect } from 'react-redux';
import { Alert, AsyncStorage, Platform, View, Text, PermissionsAndroid } from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Toast from 'react-native-root-toast';

import ServicesMap from './ServicesMap';
import MapService from '../../services/maps';
import STYLES from './styles';

class ServicesMapContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      myLatitude: 4.6469149, // Bogota by default
      myLongitude: -74.1950221,
      wasGettedMyLocation: false,
      nearPlaces: [],
      visibleDetails: false,
      disabledIcons: {
        mylocation: false,
        carwash: false,
        mechanical: false,
        crane: false,
        other: false,
      },
      // DATA FOR REQUEST SERVICE
      idProvider: null,
      typeService: null,
      token: null,
      currentVehicle: null,
      customersAll: [],
      customerFiltered: [],
      deltaLatitude: 0.0922,
      deltaLongitude: 0.0421,
      isActiveMenus: {
        carwash: false,
        mechanical: false,
        crane: false,
        soat: false,
      },
      // existNetwork: true,
      // isChangedNetworkState: false,
      isVisibleModalToRequestService: false,
      isValidPhoneNumber: false,
      dataServiceSelected: null,
      showBottomButtons: false,
    };

    this.map = null;
  }

  componentDidMount() {
    // if (this.props.online) this.getMyLocation();
    if (this.props.online) {
      if (Platform.OS === 'android') {
        this.requestLocationPermissions();
      }
    }
    this.getDataStorage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.online && !this.props.online) {
      this.getMyLocation();
      this.getDataStorage();
    }
  }

  async getDataStorage() {
    try {
      const currentVehicle = await AsyncStorage.getItem('currentVehicle');
      const authToken = await AsyncStorage.getItem('token');

      if (currentVehicle) this.setState({ currentVehicle: JSON.parse(currentVehicle) });
      if (authToken) this.setState({ token: authToken });
    } catch (e) {
      Toast.show(`Vaya, no se ha podido obtener los datos del storage: ${JSON.stringify(e)}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  async getAllCustomers() {
    try {
      const allCustomers = await MapService.getAllCustomers();
      this.setState({ customersAll: allCustomers.data.data });
      console.log('allCustomers', allCustomers.data.data, allCustomers.data.data.length);
    } catch (err) {
      Toast.show(`Error obteniendo los proveedores ${JSON.stringify(err)}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  async requestLocationPermissions() {
    try {
      const granted = await PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted) {
        this.getMyLocation();
      } else {
        Alert.alert('Sin permisos', 'no ha conceido permisos a Mobi para acceder a su localización. Este servicio no podrá ser usado adecuadamente');
      }
      this.setState({ showBottomButtons: granted });
    } catch(err) {
      console.log('error location', err);
    }
  }

  getMyLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          myLatitude: position.coords.latitude,
          myLongitude: position.coords.longitude,
          wasGettedMyLocation: true,
        });
        this.getAllCustomers();
      },
      (e) => {
        if (e !== 'No available location provider') {
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

  getMenuIcons() {
    const SETTERS = this.allSetters();

    const servicesForIcons = [
      {
        icon: 'my-location',
        onPress: () => this.getMyLocation(),
        disabled: this.state.disabledIcons.mylocation,
        tooltip: 'Ubicarme',
      },
      {
        icon: 'local-car-wash',
        onPress: () => {
          if (!this.state.wasGettedMyLocation) { this.getMyLocation(); }
          this.filterServiceByType('carwash');
          SETTERS.bottomMenuState('carwash');
        },
        disabled: this.state.disabledIcons.carwash,
        tooltip: 'Lavado',
        styles: this.state.isActiveMenus.carwash ? STYLES.underlineActiveService : STYLES.underlineUnactiveService,
      },
      {
        icon: 'build',
        onPress: () => {
          this.filterServiceByType('mechanical');
          SETTERS.bottomMenuState('mechanical');
        },
        disabled: this.state.disabledIcons.mechanical,
        tooltip: 'Mecánico',
        styles: this.state.isActiveMenus.mechanical ? STYLES.underlineActiveService : STYLES.underlineUnactiveService,
      },
      /* {
        icon: 'contact-phone',
        onPress: () => {
          this.filterServiceByType('assistance');
          SETTERS.bottomMenuState('assistance');
        },
        disabled: this.state.disabledIcons.assistance,
        tooltip: 'Asistencia',
        styles: this.state.isActiveMenus.assistance ? STYLES.underlineActiveService : STYLES.underlineUnactiveService,
      },*/
      {
        icon: 'verified-user',
        onPress: () => {
          this.filterServiceByType('soat');
          SETTERS.bottomMenuState('soat');
        },
        disabled: this.state.disabledIcons.soat,
        tooltip: 'Soat',
        styles: this.state.isActiveMenus.soat ? STYLES.underlineActiveService : STYLES.underlineUnactiveService,
      },
    ];

    return servicesForIcons;
  }

  getPlaces(type, filteredData) {
    const places = [];
    const service = type;

    if (filteredData.length === 0) {
      this.setState({ nearPlaces: places });
      Alert.alert('Sin proveedores', 'No hay proveedores registrados cerca a su ubicación');
    } else {
      filteredData.map((item, index) => {
        places.push({
          _id: item._id,
          index,
          name: item.name,
          lat: item.loc[0],
          lon: item.loc[1],
          services: item.services.filter(subitem => subitem.type === service.toUpperCase())[0],
          channelName: item.channelName,
          channeldId: item.channelId,
          distributorName: item.distributorName,
          distributorId: item.distributorId,
          localId: item._id,
        });
      });

      if (places.length > 0) {
        this.setState({ nearPlaces: places });
      } else {
        Alert.alert('Sin proveedores', 'No hay proveedores registrados cerca a su ubicación');
      }
    }
  }

  activeGPS() {
    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: '<h2>¿Usar GPS?</h2>Mobi desea habilitar su GPS:<br/><br/>Se usará GPS, Wi-Fi, y red celular para localizarle<br/>',
        ok: 'SÍ',
        cancel: 'NO',
      })
      .then((success) => {
        Toast.show('Presione el botón <Ubicarme> para ubicarlo correctamente', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      })
      .catch((e) => {
        Toast.show('No ha dado los permisos necesarios para lozalizarlo', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
        });
      });
    }
  }

  filterServiceByType(type) {
    const filteredData = [];
    const customerData = [];
    console.log('FILTERING CUSTOMERS', this.state.customersAll);

    this.state.customersAll.map((item) => {
      if (item.services !== undefined) {      
        return item.services.map((subItem) => {
          console.log(subItem.type, type);
          if (subItem.type === type.toUpperCase()) {
            filteredData.push(item);
            customerData.push(item);
          }
        });
      }
    });

    this.setState({ customerFiltered: filteredData }, () => this.getPlaces(type, filteredData));
  }

  async requestService(aditionalData) {
    try {
      const body = {
        service: {
          id: this.state.dataServiceSelected.services._id,
          name: this.state.dataServiceSelected.services.name,
          reference: this.state.dataServiceSelected.services.type,
          loc: [this.state.myLatitude, this.state.myLongitude],
        },
        provider: {
          channelName: this.state.dataServiceSelected.channelName,
          channelId: this.state.dataServiceSelected.channeldId,
          distributorName: this.state.dataServiceSelected.distributorName,
          distributorId: this.state.dataServiceSelected.distributorId,
          localId: this.state.dataServiceSelected._id,
          name: this.state.dataServiceSelected.name,
        },
        phoneNumber: aditionalData.phoneNumber,
      };

      console.log('body request service', body);

      const response = await MapService.requestTheService(body);

      if (response) {
        if (response.status === 201) {
          Alert.alert('Servicio solicitado', 'Servicio correctamente solicitado, su proveedor debe contactarse.');
          this.setState({ visibleDetails: false, isValidPhoneNumber: false });
        }
      }
    } catch (e) {
      Toast.show(`Error solicitando un nuevo servicio: ${JSON.stringify(e)}`, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  allSetters() {
    const SETTERS = {};

    SETTERS.visibilityDetails = (value) => { this.setState({ visibleDetails: value }); };
    SETTERS.getService = (value) => { this.setState({ disabledIcons: { getService: value } }); };
    SETTERS.requestService = (value) => { this.setState({ idProvider: value }); };
    SETTERS.deltaLatitude = (value) => { this.setState({ deltaLatitude: value }); };
    SETTERS.deltaLongitude = (value) => { this.setState({ deltaLongitude: value }); };
    SETTERS.bottomMenuState = (type) => {
      switch (type) {
      case 'carwash':
        this.setState({ isActiveMenus: {
          carwash: true,
          mechanical: false,
          assistance: false,
          soat: false,
        } });
        break;
      case 'mechanical':
        this.setState({ isActiveMenus: {
          carwash: false,
          mechanical: true,
          assistance: false,
          soat: false,
        } });
        break;
      case 'assistance':
        this.setState({ isActiveMenus: {
          carwash: false,
          mechanical: false,
          assistance: true,
          soat: false,
        } });
        break;
      case 'soat':
        this.setState({ isActiveMenus: {
          carwash: false,
          mechanical: false,
          assistance: false,
          soat: true,
        } });
        break;
      }
    };

    SETTERS.showModal = (value) => { this.setState({ isVisibleModalToRequestService: value }); };
    SETTERS.isValidPhoneNumber = (value) => { this.setState({ isValidPhoneNumber: value }); };

    SETTERS.dataToRequest = (data) => {
      console.log('dd => ', data);
      this.setState({
        dataServiceSelected: data,
      });
    };

    return SETTERS;
  }

  render() {
    return (
      <ServicesMap
        myCoordinates={{ lat: this.state.myLatitude, lon: this.state.myLongitude }}
        nearPlaces={this.state.nearPlaces}
        menuIcons={this.getMenuIcons()}
        currentPin={this.state.currentPin}
        setRefMap={(newRef) => { this.map = newRef; }}
        visibleDetails={this.state.visibleDetails}
        SETTERS={this.allSetters()}
        requestService={aditionalData => this.requestService(aditionalData)}
        deltas={{ lat: this.state.deltaLatitude, lon: this.state.deltaLongitude }}
        existNetwork={this.props.online}
        isVisibleModalToRequestService={this.state.isVisibleModalToRequestService}
        isValidPhoneNumber={this.state.isValidPhoneNumber}
        showBottomButtons={this.state.showBottomButtons}
        requestLocationPermissions={() => this.requestLocationPermissions()}
      />
    );
    /* return (
      <View>
        <Text> MAPA x( </Text>
      </View>
    ); */
  }
}

const mapStateToProps = state => ({
  online: state.online,
});

ServicesMapContainer.propTypes = {
  online: React.PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(ServicesMapContainer);
