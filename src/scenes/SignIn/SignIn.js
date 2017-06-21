import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import FBSDK from 'react-native-fbsdk';

import STYLES from './styles';
import globalStyles from './../../config/styles';

const background = require('./../../../images/logo-bg-app.png');

const { width, height } = globalStyles.dimensions;

const {
  LoginManager,
  AccessToken,
} = FBSDK;


class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleToken() {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        this.props.responseTokenCallback(data.accessToken);
      },
    );
  }

  handleLogin() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        console.log('result', result);
        if (result.isCancelled) {
          Alert.alert('Login error', 'El login fue cancelado');
        } else {
          this.handleToken();
        }
      })
      .catch((error) => {
        console.log('Error LoginManager', error);
        Alert.alert('Login error', error.toString());
      });
  }

  render() {
    return (
      <View style={STYLES.container}>
        <View style={STYLES.halfHeight}>
          <Image
            style={{ width, height: height * 0.55 }}
            source={background}
            resizeMode="cover"
          />
        </View>
        <View style={STYLES.quarterHeight}>
          <Button
            onPress={() => this.handleLogin()}
            large
            raised
            backgroundColor={STYLES.facebookBtn.backgroundColor}
            buttonStyle={STYLES.facebookBtn}
            title="INICIA SESIÓN CON FACEBOOK"
          />
          <Button
            onPress={Actions.registerForm}
            large
            raised
            title="REGÍSTRATE"
            buttonStyle={STYLES.buttonForm}
          />

          <View style={STYLES.container}>
            <View style={STYLES.signupWrap}>
              <Text style={STYLES.accountText}>¿Ya tienes cuenta?</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={Actions.Login}>
                <View>
                  <Text style={STYLES.signupLinkText}>Loguéate</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          

        </View>
      </View>
    );
  }
}


export default SignIn;
