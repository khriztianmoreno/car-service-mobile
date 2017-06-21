import React from 'react';
import { View, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ResponsiveImage from 'react-native-responsive-image';
import moment from 'moment';
import I18n from 'react-native-i18n';
import { Body, InputGroup, Input, Icon, Spinner } from 'native-base';

import NotNetwork from '../../components/NoNetwork';
import globalStyles from '../../config/styles';
import STYLES from './styles';
import images from '../../config/images';
import ItemCard from '../../components/ItemCard';
import Fab from '../../components/Fab';

const LoadingIndicator = (props) => {
  return (
    <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
      <ActivityIndicator
        animating={props.loading}
        style={[globalStyles.centering, { height: 80 }]}
        size="large"
      />
    </View>
  );
};

/* const nameToText = (name) => {
  const objNames = {
    MECHANICS: 'Mecánico',
    SOAT: 'Soat',
    OIL: 'Aceite',
  };
  return objNames[name];
};

const CARDS = (props) => {
  const cards = [];
  props.alertsList.map((item, index) => {
    cards.push(
      <ItemCard
        key={index}
        onPress={() => Actions.AlertDetails({ data: item })}
        leftTitle={item.name}
        rightTitle={nameToText(item.category)}
        leftSubtitle={nameToText(item.subCategory)}
        rightSubtitle={nameToText(item.subCategory)}
        colorLeftIcon={globalStyles.palette.background.second.backgroundColor}
        letter={item.name[0]}
      />,
    );
  });

  return cards;
};

const CardNoInfo = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ResponsiveImage source={images.general.noData} initWidth="250" initHeight="340" />
    </View>
  );
};

const CONTENT = (props) => {
  let content = CARDS(props);
  if (props.alertsList.length === 0 && !props.isLoadingData) {
    content = CardNoInfo();
  } else if (props.alertsList.length === 0 && props.isLoadingData) {
    content = loadingIndicator(props);
  }

  return content;
};

const CONTAINER = (props) => {
  if (props.existNetwork) {

    return (
      <View style={[STYLES.container, { padding: 0 }]}>
        { CONTENT(props) }

        <Fab onPress={() => Actions.NewAlert()} iconName="add" />
      </View>
    );
  }
  return <NotNetwork />;
};

const AlertsCenter = props => CONTAINER(props); */

const AlertsCenter = props => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F6F8FA' }}
    >

      {/* Searchbar */}
      <Body searchbar rounded style={{ marginBottom: 10 }}>
        <InputGroup>
          <Icon name="ios-search" />
          <Input
            placeholder="Buscar"
            onChangeText={t => props.search(t)}
          />
        </InputGroup>
      </Body>

      {/* My Alerts */}
      {
        props.loading
        ?
          <Spinner />
        :
          props.myAlerts.map((item, index) => (
            <ItemCard
              key={index}
              colorLeftIcon="#828384"
              letter={item.subCategory[0]}
              leftTitle={item.category}
              leftSubtitle={item.subCategory}
              rightTitle={moment(item.nextReviewDate).format('L')}
              onPress={() => props.goToAlertFromTemplate({ data: item })}
              // onPress={() => Alert.alert(`Editar fecha de alerta: ${item._id}`)}
            />
          ))
      }
    </ScrollView>
  );
};

export default AlertsCenter;
