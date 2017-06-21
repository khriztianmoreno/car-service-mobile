import React from 'react';
import { View, Text, ActivityIndicator, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, Card } from 'react-native-elements';
import ResponsiveImage from 'react-native-responsive-image';

import NotNetwork from '../../components/NoNetwork';
import globalStyles from '../../config/styles';
import STYLES from './styles';
import AlertCard from './AlertCard';
import AlertValues from '../NewAlert/AlertValues';
import images from '../../config/images';

const loadingIndicator = (props) => {
  return (
    <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
      <ActivityIndicator
        animating={props.isloading}
        style={[globalStyles.centering, { height: 80 }]}
        size="large"
      />
    </View>
  );
};

const FAB = (
  <View style={STYLES.fabAdd}>
    <Icon
      reverse
      raised
      name="add"
      color={globalStyles.palette.primary}
      size={globalStyles.icon.small}
      onPress={() => {
        Actions.NewAlert();
      }
      }
    />
  </View>
);

const CARDS = (props) => {
  const cards = [];
  props.alertsList.map((item, index) => {
    cards.push(
      <AlertCard
        key={index}
        onPress={() => {
          Actions.AlertDetails({ data: item, index });
        }}
        leftTitle={item.name}
        rightTitle={null}
        leftSubtitle={item.mileage != null ? `Cada ${item.mileage} km se activará esta alarma` : null}
        rightSubtitle={item.timeValue != null ? `Cada ${item.timeValue} ${AlertValues.typeTime.direct[item.timeType]} se activará esta alarma` : null}
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
      <View style={STYLES.container}>
        { CONTENT(props) }

        {FAB}
      </View>
    );
  }
  return <NotNetwork />;
};

const AlertsCenter = props => CONTAINER(props);

export default AlertsCenter;
