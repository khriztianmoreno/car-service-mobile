import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, Image, ScrollView, View, TextInput, Button as ButtonRN, RefreshControl } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import ResponsiveImage from 'react-native-responsive-image';

import NoNetwork from './../../components/NoNetwork';
import styles from './styles';
import globalStyles from './../../config/styles';
import images from '../../config/images';
import FBSendEvent from '../../helpers/FBAnalytics';

const CardNoInfo = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
      <ResponsiveImage source={images.general.noData} initWidth="250" initHeight="340" />
    </View>
  );
};

const CardNoGPS = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 }}>
      <ResponsiveImage source={images.general.noGPS} initWidth="250" initHeight="340" />
    </View>
  );
};

const FAB = (props) => {
  let content = null;
  if (!props.located) {
    content = (
      <View style={styles.fabRefresh}>
        <Icon
          reverse
          raised
          name="location-searching"
          color={globalStyles.palette.primary}
          size={globalStyles.icon.small}
          onPress={() => {
            props.activeGPS();
          }
          }
        />
      </View>
    );
  }

  return content;
};

const FAB_LOCATION = (props) => {
  let content = (
    <View style={styles.fabRefresh}>
      <Icon
        reverse
        raised
        name="location-searching"
        color={globalStyles.palette.primary}
        size={globalStyles.icon.small}
        onPress={() => {
          props.requestLocationPermissions();
        }
        }
      />
    </View>
  );
  if (props.isLocationPermissionsGranted) {
    content = null;
  }
  return content;
};

const ModalRequestService = (props) => {
  return (
    <Modal
      open={props.isVisible}
      offset={0}
      overlayBackground={'rgba(0, 0, 0, 0.75)'}
      animationDuration={200}
      animationTension={40}
      modalDidOpen={() => undefined}
      modalDidClose={() => props.showModal(false)}
      closeOnTouchOutside={false}
      containerStyle={{
        flex: 1,
        justifyContent: 'flex-start',
      }}
      modalStyle={{
        borderRadius: 2,
        margin: 20,
        padding: 10,
        backgroundColor: '#F5F5F5',
      }}
    >
      <Text> Número de celular dónde comunicarse </Text>

      <TextInput
        editable
        maxLength={15}
        placeholder="¿A qué número te contactamos?"
        style={{ marginTop: 10, marginBottom: 10 }}
        keyboardType="phone-pad"
        onChangeText={num => props.updatePhoneNumber(num)}
        value={props.phoneNumber}
      />


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <ButtonRN
          title="Cancelar"
          color={globalStyles.palette.background.first.backgroundColor}
          onPress={() => props.showModal(false)}
        />

        <ButtonRN
          title="Solicitar"
          disabled={!props.isValidPhoneNumber()}
          color={globalStyles.palette.background.fifth.backgroundColor}
          style={{ justifyContent: 'center' }}
          onPress={() => {
            props.finishRequest();
            FBSendEvent.promotionsRequest({});
          }}
        />
      </View>
    </Modal>
  );
};

const PromotionItem = ({ title, description, image, id, requestPromotion }) => {
  const height = (globalStyles.dimensions.width - 40) * (0.58);
  return (
    <Card>
      <Image
        source={{ uri: image, height }}
        resizeMode="cover"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.buttonContainer}>
        <Button
          raised
          title="Solicitar"
          icon={{ name: 'play-for-work' }}
          buttonStyle={styles.button}
          onPress={() => requestPromotion(id)}
        />
      </View>
    </Card>
  );
};

const PromotionsNoInfo = (props) => {
  let content = <CardNoGPS />;
  if (props.located) {
    if (props.data.length > 0) {
      content = null;
    } else {
      content = <CardNoInfo />;
    }
  }
  return content;
};


const Promotions = (props) => {
  return props.online
    ? (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.promoContainer}
          refreshControl={
            <RefreshControl
              refreshing={props.refreshing}
              onRefresh={() => props.refreshPromotions()}
            />
          }
        >
          {
            props.data.map((item, index) => (
              <PromotionItem
                key={index}
                requestPromotion={props.requestPromotion}
                {...item}
              />
            ))
          }

          <PromotionsNoInfo data={props.data} located={props.located} />
        </ScrollView>
        <ModalRequestService
          {...props}
        />

        { FAB(props) }
        { FAB_LOCATION(props) }
      </View>
    )
    : (
      <NoNetwork />
    );
};

const promoData = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  image: React.PropTypes.string,
  id: React.PropTypes.number,
  requestPromotion: React.PropTypes.func,
};

Promotions.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  requestPromotion: React.PropTypes.func,
  online: React.PropTypes.bool,
};

PromotionItem.propTypes = {
  ...promoData,
};

export default Promotions;
