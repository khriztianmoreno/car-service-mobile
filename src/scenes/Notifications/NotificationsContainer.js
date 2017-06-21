import React from 'react';
import { Platform, View, Text } from 'react-native';
import { connect } from 'react-redux';

import actions from '../../actions/actionTypes';
import NotificationsAndroid from './Notifications.android';
import NotificationsIos from './Notifications.ios';
// import globalStyles from '../../config/styles';
import STYLES from './styles';

class NotificationsContainer extends React.Component {
  render() {
    let Content = Platform.OS === 'android' ? NotificationsAndroid : NotificationsIos;
    return (
      <View style={STYLES.container}>
        <Content />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  online: state.online,
  vehicle: state.vehicle,
  deviceId: state.deviceId,
  deviceTags: state.deviceTags,
});

const mapDispatchToProps = dispatch => ({
  setDeviceId(status) {
    dispatch({ type: actions.SET_DEVICE_ID, payload: status });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
