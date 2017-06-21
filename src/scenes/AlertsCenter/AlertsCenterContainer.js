import React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import I18n from 'react-native-i18n';

import AlertsCenterAndroid from './AlertsCenter.android';
// import AlertsCenterIos from './AlertsCenter.ios';
import Notifications from '../Notifications';
import actions from '../../actions/actionTypes';
import globalStyles from '../../config/styles';
import AlertsCenterServices from '../../services/alerts';
import SystemValuesServices from '../../services/systemvalues';
import Toast from 'react-native-root-toast';
/* Toast.show(`Error onteniendo categorías: ${err}`, {
  duration: Toast.durations.SHORT,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
}); */

class AlertsCenterContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      vehicleSelected: false,
      myAlerts: [],
      alertsToShow: [],
      isLoadingData: true,
      defaultAlerts: [],
      language: 'es',
    };
  }

  componentDidMount() {
    if (this.props.online) {
      this.fetchData();
    } else {
      console.log('IS OFFLINE ON ALERTS');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldRefresh) {
      this.fetchData();
    }
  }

  async fetchData() {
    try {
      const AlertsList = await AlertsCenterServices.getAlerts();
      this.setState({ isLoadingData: false, myAlerts: AlertsList.data.data, alertsToShow: AlertsList.data.data });
    } catch (err) {
      console.log('Error getting alerts', err);
    }
  }

  /* async getAlertsConfig() {
    try {
      const alertsConfig = await SystemValuesServices.getAlertsConfig();
      this.setState({ defaultAlerts: alertsConfig });
    } catch (err) {
      Toast.show(`Error getting systemvalues: ${err}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  } */

  async searchLocalAlters(str) {
    this.setState({ isLoadingData: true });
    console.log('search true');
    const searched = await this.state.myAlerts.filter((alert) => {
      return alert.category.toLowerCase().match(str.toLowerCase()) || alert.subCategory.toLowerCase().match(str.toLowerCase()) || alert.name.toLowerCase().match(str.toLowerCase());
    });
    console.log('search false');
    this.setState({ alertsToShow: searched });
    setTimeout(() => this.setState({ isLoadingData: false }), 500);
  }

  render() {
    const ContentAlerts = Platform.OS === 'android'
      ?
        (
          <AlertsCenterAndroid
            tabLabel={I18n.t('alerts.tabNext')}
            existNetwork={this.props.online}
            myAlerts={this.state.alertsToShow}
            loading={this.state.isLoadingData}
            setLoading={s => this.setState({ isLoadingData: s })}
            goToAlertFromTemplate={data => Actions.NewAlertFromTemplate(data)}
            language={this.state.language}
            search={str => this.searchLocalAlters(str)}
          />
        )
      :
        (
          <AlertsCenterAndroid
            tabLabel="Próximas"
            existNetwork={this.props.online}
            myAlerts={this.state.myAlerts}
            isLoadingData={this.state.isLoadingData}
          />
        );

    return (
      <ScrollableTabView
        style={{ margin: 0 }}
        initialPage={0}
        tabBarActiveTextColor="white"
        tabBarInactiveTextColor="#C9C8C4"
        tabBarUnderlineStyle={{ backgroundColor: 'white' }}
        tabBarBackgroundColor={globalStyles.palette.background.first.backgroundColor}
      >

        {/* <Notifications
          tabLabel="Agenda"
        /> */ }

        {ContentAlerts}

      </ScrollableTabView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AlertsCenterContainer);
