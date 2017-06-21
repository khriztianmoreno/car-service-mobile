import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import t from 'tcomb-form-native';
import R from 'ramda';
import AccountRegister from './AccountRegister';
import Auth from './../../services/authentication';

const stylesheet = R.clone(t.form.Form.stylesheet);

// overriding the text color
stylesheet.textbox.normal.color = '#F2385A';
stylesheet.controlLabel.normal.backgroundColor = 'transparent';
stylesheet.controlLabel.normal.width = 500;
// stylesheet.textbox.normal.borderColor = 'none';
// stylesheet.textbox.normal.borderWidth = 0;

// here we are: define your domain model
const Person = t.struct({
  name: t.String,              // a required string
  email: t.String,  // an optional string
  password: t.String,
});

const options = {
  fields: {
    name: {
      stylesheet, // overriding the style of the textbox
    },
    email: {
      keyboardType: 'email-address',
      secureTextEntry: false,
      stylesheet, // overriding the style of the textbox
    },
    password: {
      secureTextEntry: true,
      stylesheet, // overriding the style of the textbox
    },
  },
};

class AccountRegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
    };
  }

  async handleCreateAccount(user) {
    try {
      await Auth.createUser(user);

      const userLogin = {
        email: user.email,
        password: user.password,
      };
      // Login con el usuario creado
      this.loginUser(userLogin);
    } catch (error) {
      console.log('[ERROR](AccountRegister):', error);
      if (!error.response) {
        Alert.alert('Sin conexión', 'No hay conexión de red');
      } else if (error.response.status === 409) {
        Alert.alert('Error en registro', 'El email ingresado ya se encuentra en uso.');
      } else {
        Alert.alert('Error', 'Error del servidor.');
      }
    }
  }

  async loginUser(user) {
    try {
      const res = await Auth.login(user);
      const token = res.data.token;

      console.log('REGISTER RES', res.data.data._id);
      await AsyncStorage.setItem('userId', res.data.data._id);

      Auth.saveLocalToken(token);
      Actions.drawer({ token });
    } catch (error) {
      console.log('Error Login: ', error.response);
    }
  }

  render() {
    return (
      <AccountRegister
        model={Person}
        options={options}
        registerAccount={(user) => { this.handleCreateAccount(user); }}
      />
    );
  }
}

export default AccountRegisterContainer;
