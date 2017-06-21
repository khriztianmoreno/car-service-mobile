/**
 * Main Application Component
 */

import React from 'react';
import {
  Router,
  Scene,
  Actions,
  ActionConst,
  Modal,
} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { StyleSheet, Navigator, StatusBar, Platform, AsyncStorage } from 'react-native';
import OneSignal from 'react-native-onesignal';
// import PushNotification from 'react-native-push-notification';
import I18n from 'react-native-i18n';
import Toast from 'react-native-root-toast';

import TouchableIcon from './components/TouchableIcon';
import FBSendEvent from './helpers/FBAnalytics';
import AuthService from './services/authentication';


// Local imports
import Drawer from './components/Drawer';
import globalStyles from './config/styles';
import { setConnection as setConnectionAction } from './actions/connectionActions';

// Import scenes
import SignInContainer from './scenes/SignIn';
import LoginContainer from './scenes/Login';
import AccountRegisterContainer from './scenes/AccountRegister';
import HomeContainer from './scenes/Home';
import ExpensesContainer from './scenes/Expenses';
import VehiclesContainer from './scenes/Vehicles';
import NewExpenseContainer from './scenes/NewExpense';
import ExpenseDetailsContainer from './scenes/ExpenseDetails';
import AddVehicleContainer from './scenes/AddVehicle';
import EditVehicleContainer from './scenes/EditVehicle';
import ServicesMapContainer from './scenes/ServicesMap';
import SearchModal from './scenes/SearchModal';
import VehicleDetailsContainer from './scenes/VehicleDetails';
import PromotionsContainer from './scenes/Promotions';
import AlertsCenterContainer from './scenes/AlertsCenter';
import NewAlertContainer from './scenes/NewAlert';
import AlertDetailsContainer from './scenes/AlertDetails';
import NewAlertFromTemplate from './scenes/NewAlertFromTemplate';
import ForgotPasswordContainer from './scenes/ForgotPassword';
import ConfigurationContainer from './scenes/Configuration';
import actions from './actions/actionTypes';

import { alertChangeConexion, getCurrentConexionState } from '../src/services/connectivity';
import { setUserObject as setUserObjectAction } from './actions/userActions';

import configLanguages from './config/strings';

configLanguages();

if (!__DEV__) {
  console = {};
  console.log = () => { };
  console.error = () => { };
}

console.log('HEIGHT:', StatusBar.currentHeight);

const OS = Platform.OS;

const styles = StyleSheet.create({
  navBar: OS === 'android' ? {
    ...globalStyles.navBar.pink.general,
    height: Navigator.NavigationBar.Styles.General.NavBarHeight + StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight,
  } : {
    ...globalStyles.navBar.pink.general,
    paddingTop: StatusBar.currentHeight,
  },
  navTitle: {
    ...globalStyles.navBar.pink.title,
  },
  routerScene: OS === 'android' ? {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight + StatusBar.currentHeight,
  } : {
    paddingTop: 70,
  },
});

class App extends React.Component {
  static menuButton() {
    return (
      <TouchableIcon
        onPress={() => Actions.get('drawer').ref.toggle()}
        color="white"
        size={32}
        name="menu"
      />
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      existConnection: true,
    };
  }
  
  componentWillMount() {
    StatusBar.setBarStyle('light-content', true);
    if (OS === 'android') StatusBar.setTranslucent(true);
    if (OS === 'android') StatusBar.setBackgroundColor('rgba(212, 49, 79, 0.5)');
    // alertChangeConexion(status => this.props.setConnection(status));
    // getCurrentConexionState(status => this.props.setConnection(status));

    OneSignal.addEventListener('received', notification => this.onReceived(notification));
    OneSignal.addEventListener('opened', openResult => this.onOpened(openResult));
    OneSignal.addEventListener('registered', notifData => this.onRegistered(notifData));
    OneSignal.addEventListener('ids', device => this.onIds(device));
    this.props.setConnection(true);
    // OneSignal.inFocusDisplaying(1);
  }

  componentDidMount() {
    OneSignal.getTags((receivedTags) => {console.log('**++ TAGS RECEIVED ++**', receivedTags); this.props.setDeviceTags(receivedTags)});
    // OneSignal.setSubscription(true);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', notification => this.onReceived(notification));
    OneSignal.removeEventListener('opened', openResult => this.onOpened(openResult));
    OneSignal.removeEventListener('registered', notifData => this.onRegistered(notifData));
    OneSignal.removeEventListener('ids', device => this.onIds(device));
  }

  onReceived(notification) {
    console.log('NEW NOTIFICATION RECEIVED \n', notification);
    FBSendEvent.notificationsReceived({});
    /* try {
      PushNotification.localNotificationSchedule({
        message: `${notification.payload.title} \n ${notification.payload.body}`,
        date: new Date(Date.now()),
      });
    } catch (err) {
      console.log('error notification received \n', err);
    } */
  }

  onOpened(openResult) {
    console.log('OPEN NOTIFICATION \n', openResult);
    FBSendEvent.notificationsOpened({});
  }

  onRegistered(notifData) {
    console.log('DEVICE REGISTERED FOR NOTIFICATIONS \n', notifData);
  }

  onIds(device) {
    console.log('DEVICE INFO \n', device);
    this.props.setDeviceId(device.userId);
  }

  render() {
    return (
      <Router
        name="base"
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navTitle}
        leftButtonIconStyle={{ tintColor: 'white' }}
      >
        <Scene key="modal" component={Modal}>
          <Scene key="root">
            <Scene
              key="SignIn"
              component={SignInContainer}
              hideNavBar
            />
            <Scene
              key="registerForm"
              component={AccountRegisterContainer}
              hideNavBar
            />
            <Scene
              key="Login"
              component={LoginContainer}
              hideNavBar
            />
            <Scene
              key="ForgotPassword"
              component={ForgotPasswordContainer}
              hideNavBar
            />
            <Scene key="drawer" component={Drawer} type={ActionConst.RESET}>
              <Scene key="main" tabs={false}>
                <Scene
                  key="Home"
                  component={HomeContainer}
                  title={I18n.t('title.home')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="Expenses"
                  component={ExpensesContainer}
                  title={I18n.t('title.expenses_record')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="Vehicles"
                  component={VehiclesContainer}
                  title={I18n.t('title.vehicles')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="Configuration"
                  component={ConfigurationContainer}
                  title={I18n.t('title.configuration')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="AlertsCenter"
                  component={AlertsCenterContainer}
                  title={I18n.t('title.alerts_center')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="ServicesMap"
                  component={ServicesMapContainer}
                  title={I18n.t('title.services_map')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="NewExpense"
                  component={NewExpenseContainer}
                  title={I18n.t('title.new_expense')}
                  sceneStyle={styles.routerScene}
                />
                <Scene
                  key="ExpenseDetails"
                  component={ExpenseDetailsContainer}
                  title={I18n.t('title.expense_details')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="VehicleDetails"
                  component={VehicleDetailsContainer}
                  title={I18n.t('title.vehicle_details')}
                  sceneStyle={styles.routerScene}
                />
                <Scene
                  key="Promotions"
                  component={PromotionsContainer}
                  title={I18n.t('title.promotions')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="NewAlert"
                  component={NewAlertContainer}
                  title={I18n.t('title.new_alert')}
                  sceneStyle={styles.routerScene}
                />
                <Scene
                  key="AlertDetails"
                  component={AlertDetailsContainer}
                  title={I18n.t('title.alert_details')}
                  sceneStyle={styles.routerScene}
                  renderLeftButton={App.menuButton}
                />
                <Scene
                  key="NewAlertFromTemplate"
                  component={NewAlertFromTemplate}
                  title={I18n.t('title.new_alert')}
                  sceneStyle={styles.routerScene}
                />
              </Scene>
            </Scene>
            <Scene
              key="AddVehicle"
              component={AddVehicleContainer}
              title={I18n.t('title.new_vehicle')}
              hideNavBar={false}
              direction="vertical"
              panHandlers={null}
            />
            <Scene
              key="EditVehicle"
              component={EditVehicleContainer}
              title={I18n.t('title.edit_vehicle')}
              hideNavBar={false}
              direction="vertical"
              panHandlers={null}
            />
            <Scene
              key="SearchModal"
              component={SearchModal}
              title=""
              hideNavBar={false}
              direction="vertical"
              panHandlers={null}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

App.propTypes = {
  setConnection: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  online: state.online,
  deviceId: state.deviceId,
  deviceTags: state.setDeviceTags,
  userObject: state.userObject,
});

const mapDispatchToProps = dispatch => ({
  setConnection(status) {
    dispatch(setConnectionAction(status));
  },
  setDeviceId(status) {
    dispatch({ type: actions.SET_DEVICE_ID, payload: status });
  },
  setDeviceTags(status) {
    dispatch({ type: actions.SET_DEVICE_TAGS, payload: status });
  },
  setUserObject(status) {
    dispatch(setUserObjectAction(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
