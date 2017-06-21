import React, { Component, PropTypes } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';

import Login from './Login';
import Auth from '../../services/authentication';

class LoginContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      modalVisible: true,
    };
  }

  async handleLogin(user) {
    try {
      const res = await Auth.login(user);
      console.log('ANSWER LOGIN', res.data.data);

      await AsyncStorage.setItem('userId', res.data.data._id);
      await AsyncStorage.setItem('userObject', JSON.stringify(res.data.data));
      const token = res.data.token;
      console.log('token auth', token);
      Auth.saveLocalToken(token);
      Actions.drawer({ token });
    } catch (error) {
      if (error.response === undefined) {
        Alert.alert('Sin conexión', 'No hay conexión de red');
      } else {
        Alert.alert(error.response.data.name, error.response.data.message);
      }
    }
  }

  render() {
    return (
      <Login loginLocal={(user) => { this.handleLogin(user); }} />
    );
  }
}

LoginContainer.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
};


export default LoginContainer;
