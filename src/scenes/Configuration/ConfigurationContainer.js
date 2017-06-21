import React from 'react';
import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { Toast } from 'native-base';
import I18n from 'react-native-i18n';
import FBSDK from 'react-native-fbsdk';
import { Actions, ActionConst } from 'react-native-router-flux';

import ConfigurationAndroid from './Configuration.android';
import ConfigurationIos from './Configuration.ios';
import { setUserObject as setUserObjectAction } from '../../actions/userActions';
import Auth from '../../services/authentication';
import { setVehicle as setVehicleAction } from './../../actions/vehicleActions';

const languages = [
  { label: 'Español', value: 'ES' },
  { label: 'Inglés', value: 'EN' },
];

const {
  LoginManager,
} = FBSDK;

class ConfigurationContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      language: 'EN',
    };
  }

  async setLanguageForUser(language) {
    try {
      const adData = {
        additionalData: this.props.userObject.additionalData
      };
      adData.additionalData.language = language;

      await Auth.setLanguageUser(this.props.userObject._id, adData);
      Toast.show({
        text: 'Idioma cambiado',
        position: 'bottom',
        buttonText: 'Entendido',
        duration: 3000,
      });
    } catch (error) {
      console.log('error changing user language', error);
    }
  }

  componentWillMount() {
    this.setState({ language: this.props.userObject.additionalData.language.toUpperCase() });
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    console.log('Update Settings', this.state.language, nextState.language);
    if (this.props.userObject.additionalData.language.toUpperCase() !== nextState)
    return false;
  } */

  logout() {
    Auth.logout();
    LoginManager.logOut();
    this.props.setVehicle({});
    Actions.SignIn({ type: ActionConst.RESET });
  }

  render() {
    const Configuration = Platform.OS === 'android'
      ?
        (<ConfigurationAndroid
          user={this.props.userObject}
          languages={languages}
          language={this.state.language}
          setLanguage={l => this.setState({ language: l })}
          setUser={u => this.props.setUserObject(u)}
          saveChanges={l => this.setLanguageForUser(l)}
          logout={() => this.logout()}
        />)
      :
        <ConfigurationIos />;
    return Configuration;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  userObject: state.userObject,
});

const mapsDispatchToProps = dispatch => ({
  setUserObject(state) {
    return dispatch(setUserObjectAction(state));
  },
  setVehicle(vehicle) {
    return dispatch(setVehicleAction(vehicle));
  },
});

export default connect(mapStateToProps, mapsDispatchToProps)(ConfigurationContainer);
