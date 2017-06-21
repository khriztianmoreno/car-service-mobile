import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Card } from 'react-native-elements';
// import { Actions } from 'react-native-router-flux';

import STYLES from './styles';
// import globalStyles from '../../config/styles';

export class AlertCard extends React.Component {

  formatDate(format, cdate) {
    const date = new Date(cdate);
    const objDate = {
      year: date.getFullYear(),
      month: date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
      day: date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`,
      hours: date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`,
      minutes: date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`,
      seconds: date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`,
    };

    if (format === 'time') {
      return `${objDate.hours}:${objDate.minutes}:${objDate.seconds}`;
    }

    return `${objDate.day}/${objDate.month}/${objDate.year}`;
  }

  render() {
    return (
      <Card containerStyle={STYLES.customCard.card}>
        <TouchableOpacity onPress={() => { this.props.onPress(); }}>
          <Text style={STYLES.customCard.leftTitle}>{this.props.leftTitle}</Text>
          <Text style={STYLES.customCard.rightTitle}>{this.props.rightTitle}</Text>
          <Text style={STYLES.customCard.leftSubtitle}>{this.props.leftSubtitle}</Text>
          <Text style={STYLES.customCard.rightSubtitle}>{this.props.rightSubtitle}</Text>
        </TouchableOpacity>
      </Card>
    );
  }
}

export default AlertCard;

/*
<TouchableOpacity onPress={() => { console.log('GO TO DETAILS ALERT'); }}>
          <View style={STYLES.customCard.container.main}>
            <View style={STYLES.customCard.container.second}>
              <Text style={STYLES.customCard.leftTitle}>{this.props.leftTitle}</Text>
              <Text style={STYLES.customCard.rightTitle}>{this.props.rightTitle}</Text>
            </View>

            <View style={STYLES.customCard.container.second}>
              <Text style={STYLES.customCard.leftSubtitle}>{this.props.leftSubtitle}</Text>
              <Text style={STYLES.customCard.rightSubtitle}>{this.props.rightSubtitle}</Text>
            </View>
          </View>
        </TouchableOpacity>
*/
