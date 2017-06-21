import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Icon, Card, Button } from 'react-native-elements';

import TouchableIcon from '../../components/TouchableIcon';
import STYLES from './styles';
import IMAGES from '../../config/images';
import NoNetwork from '../../components/NoNetwork';
import CustomModal from '../../components/CustomModal';

const colorButtons = {
  enabled: '#FFF',
  disabled: '#CBC5C0',
};

let phoneNumberForService = null;

const dataDetails = {
  name: '',
  description: '',
};

const ServiceModal = (props) => {
  return (
    <CustomModal
      show={props.isVisibleModalToRequestService}
      needToEdit
      contentTitle="Número de celular dónde comunicarse"
      contentPlaceholder="Ingrese el número deseado"
      contentKeyboardType="phone-pad"
      contentCallback={(number) => {
        phoneNumberForService = number;
        console.log('number changed', phoneNumberForService);
        const phonere = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (phoneNumberForService.match(phonere)) {
          props.SETTERS.isValidPhoneNumber(true);
        }
      }}
      showModalCallback={() => props.SETTERS.showModal(false)}
      buttonOkDisabled={!props.isValidPhoneNumber}
      buttonOkLabel="Solicitar"
      buttonOkCallback={() => {
        props.requestService({ phoneNumber: phoneNumberForService });
        props.SETTERS.showModal(false);
      }}
      buttonCancelLabel="Cancelar"
      buttonCancelCallback={() => props.SETTERS.showModal(false)}
    />
  );
};

const markers = (props) => {
  const places = [
    <MapView.Marker
      key={'0d'}
      coordinate={{ latitude: props.myCoordinates.lat, longitude: props.myCoordinates.lon }}
      title="Ubicación actual"
      description="Aquí te encuentras ahora"
      image={IMAGES.map.currentLocation}
    />,
  ];

  if (props.nearPlaces.length > 0) {
    props.nearPlaces.map((item, index) => {
      places.push(
        <MapView.Marker
          key={index}
          coordinate={{ latitude: item.lat, longitude: item.lon }}
          title={item.name}
          image={IMAGES.map.locationServices}
          onPress={() => {
            props.SETTERS.visibilityDetails(true);
            props.SETTERS.getService(false);
            props.SETTERS.requestService(item._id);
            props.SETTERS.dataToRequest(item);
            dataDetails.name = item.name;
            dataDetails.description = item.services.description;
          }}
        />,
      );
    });
  }
  return places;
};

const ServicesMap = (props) => {
  let data = null;

  if (props.visibleDetails) {
    data = (
      <View style={STYLES.detailsMarker.main} >
        <Card containerStyle={{ margin: 2, padding: 2, paddingBottom: 17, paddingRight: 15 }}>
          <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
          >
            <Text>{dataDetails.name}</Text>
            <Text>{dataDetails.description}</Text>
          </ScrollView>

          <TouchableOpacity
            style={STYLES.detailsMarker.button}
            onPress={() => {
              props.SETTERS.showModal(true);
            }}
          >
            <Icon
              inverse
              name="check"
              type="material"
              color="#FFF"
              size={20}
            />
          </TouchableOpacity>
        </Card>
      </View>
    );
  }

  let MAP;

  if (props.existNetwork) {
    MAP = (
      <View style={STYLES.container}>
        <MapView
          ref={(ref) => {
            props.setRefMap(ref);
          }}
          style={STYLES.map}
          showUserLocation
          initialRegion={{
            latitude: props.myCoordinates.lat,
            longitude: props.myCoordinates.lon,
            latitudeDelta: props.deltas.lat,
            longitudeDelta: props.deltas.lon,
          }}
          region={{
            latitude: props.myCoordinates.lat,
            longitude: props.myCoordinates.lon,
            latitudeDelta: props.deltas.lat,
            longitudeDelta: props.deltas.lon,
          }}
          loadingEnabled
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
        >
          {markers(props)}
        </MapView>

        { data }

        <View style={STYLES.kitButtons}>
          <ScrollView
            contentContainerStyle={STYLES.scrollViewButtons}
            horizontal
            showsHorizontalScrollIndicator={false}
          >

            {
              props.showBottomButtons
              ?
                props.menuIcons.map((item, index) => (
                  <View key={index} style={[STYLES.button, item.styles]}>
                    <TouchableIcon
                      name={item.icon}
                      type="material"
                      color={item.disabled ? colorButtons.disabled : colorButtons.enabled}
                      size={32}
                      onPress={() => item.onPress()}
                      onLongPress={() => item.onLongPress()}
                      disabled={item.disabled}
                    />

                    <Text style={STYLES.textButtonBottomBar}> {item.tooltip} </Text>
                  </View>
                ))
              :
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#FFF', fontSize: 22 }}> Sin permisos para localizarle </Text>
                  <Button
                    large
                    title="Permitir"
                    fontSize={22}
                    buttonStyle={{ borderRadius: 2 }}
                    onPress={() => props.requestLocationPermissions()}
                  />
                </View>
            }
          </ScrollView>
        </View>

        { ServiceModal(props) }

      </View>
    );
  } else {
    MAP = (
      <NoNetwork />
    );
  }

  return MAP;
};

export default ServicesMap;
