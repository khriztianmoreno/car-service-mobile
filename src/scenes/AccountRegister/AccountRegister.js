import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import STYLES from './styles';


const background = require('./../../../images/bg.png');
const backIcon = require('./../../../images/back.png');

class AccountRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      password: null,
    };
  }

  handleRegisterAccount() {
    if (this.validateData()) {
      const user = {
        name: this.state.name,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      };
      this.props.registerAccount(user);
    }
  }

  validateData() {
    if (!this.state.email || !this.state.password || !this.state.name) {
      Alert.alert('Información Incompleta', 'Complete los campos solicitados');
      return false;
    }

    if (!this.validateEmail()) {
      Alert.alert('Correo Electronico', 'Escriba una direccion de correo correcta.');
      return false;
    }

    if (!this.validatePassword()) {
      Alert.alert('Contraseña', 'La contraseña debe conterner minimo 6 caracteres.');
      return false;
    }

    return true;
  }

  validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }

  validatePassword() {
    return this.state.password.length >= 6;
  }

  render() {
    return (
      <View style={STYLES.container}>
        <Image
          source={background}
          style={[STYLES.container, STYLES.bg]}
          resizeMode="stretch"
        >
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

          <View style={STYLES.inputsContainer}>
            <View style={STYLES.titleContainer}>
              <Text style={STYLES.title}>REGÍSTRATE CON TU CORREO </Text>
            </View>
            <View style={STYLES.formContainer}>
              <FormLabel labelStyle={STYLES.labelStyle}>
                Nombre
              </FormLabel>
              <FormInput
                onChangeText={text => this.setState({ name: text })}
                inputStyle={STYLES.inputStyle}
                containerStyle={STYLES.formContainer}
              />
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
              onPress={() => this.handleRegisterAccount()}
              large
              raised
              title="REGISTRAR"
              backgroundColor="#F2385A"
              style={STYLES.buttonFB}
            />
            <TouchableOpacity onPress={Actions.Login}>
              <View style={STYLES.signin}>
                <Text style={STYLES.accountText}>¿Ya tienes cuenta?
                  <Text style={STYLES.signupLinkText}> Loguéate</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }
}

export default AccountRegister;
