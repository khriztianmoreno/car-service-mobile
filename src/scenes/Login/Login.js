import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import STYLES from './styles';


const background = require('./../../../images/bg.png');
const backIcon = require('./../../../images/back.png');


const HeaderContainer = (props) => {
  return (
    <View style={STYLES.headerContainer}>
      <View style={STYLES.headerIconView}>
        <TouchableOpacity
          style={STYLES.headerBackButtonView}
          onPress={Actions.SignIn}
        >
          <Image
            source={backIcon}
            style={STYLES.backButtonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FormContainer = (props) => {
  return (
    <View style={STYLES.inputsContainer}>
      <View style={STYLES.titleContainer}>
        <Text style={STYLES.title}>REGÍSTRATE CON TU CORREO </Text>
      </View>
      <View style={STYLES.formContainer}>
        <FormLabel labelStyle={STYLES.labelStyle}>
          Correo electrónico
        </FormLabel>
        <FormInput
          onChangeText={text => this.setState({ email: text })}
          keyboardType="email-address"
          inputStyle={STYLES.inputStyle}
          containerStyle={STYLES.formContainer}
        />
      </View>
      <View style={STYLES.formContainer}>
        <FormLabel labelStyle={STYLES.labelStyle}>
          Password
        </FormLabel>
        <FormInput
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry
          inputStyle={STYLES.inputStyle}
          containerStyle={STYLES.formContainer}
        />
      </View>

      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={Actions.ForgotPassword}>
          <View>
            <Text style={STYLES.signupLinkText}>¿Olvidaste tu contraseña?</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};



class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };
  }

  handleLogin() {

    if (this.validateData()) {
      const user = {
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      };
      this.props.loginLocal(user);
    }
  }

  validateData() {
    if (!this.state.email || !this.state.password) {
      Alert.alert('Información Incompleta', 'Complete los campos solicitados');
      return false;
    }

    if (!this.validateEmail()) {
      Alert.alert('Email', 'Escriba una direccion de correo correcta .');
      return false;
    }

    return true;
  }

  validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }

  render() {
    return (
      <View style={STYLES.container}>
        <Image
          source={background}
          style={[STYLES.container, STYLES.bg]}
          resizeMode="stretch"
        >
          <HeaderContainer />

          <View style={STYLES.inputsContainer}>
            <View style={STYLES.titleContainer}>
              <Text style={STYLES.title}>REGÍSTRATE CON TU CORREO </Text>
            </View>
            <View style={STYLES.formContainer}>
              <FormLabel labelStyle={STYLES.labelStyle}>
                Correo electrónico
              </FormLabel>
              <FormInput
                onChangeText={text => this.setState({ email: text })}
                keyboardType="email-address"
                inputStyle={STYLES.inputStyle}
                containerStyle={STYLES.formContainer}
              />
            </View>
            <View style={STYLES.formContainer}>
              <FormLabel labelStyle={STYLES.labelStyle}>
                Contraseña
              </FormLabel>
              <FormInput
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry
                inputStyle={STYLES.inputStyle}
                containerStyle={STYLES.formContainer}
              />
            </View>
          </View>

          <View style={STYLES.footerContainer}>
            <Button
              onPress={() => this.handleLogin()}
              large
              raised
              title="INGRESAR"
              backgroundColor="#3AA1BF"
            />
          </View>
        </Image>
      </View>
    );
  }
}

/*
-- RESET PASSWORD LINK --
<View style={STYLES.container}>
  <View style={STYLES.resetPassText}>
    <TouchableOpacity activeOpacity={0.5} onPress={() => Actions.ForgotPassword()}>
      <View style={{ marginLeft: 30 }}>
        <Text style={STYLES.signupLinkText}>¿Olvidates tu contraseña?</Text>
      </View>
    </TouchableOpacity>
  </View>
</View>
*/

export default Login;
