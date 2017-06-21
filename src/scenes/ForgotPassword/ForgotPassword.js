import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import STYLES from './styles';
import globalStyles from '../../config/styles';


const background = require('./../../../images/bg.png');
const backIcon = require('./../../../images/back.png');


const HeaderContainer = (props) => {
  return (
    <View style={STYLES.headerContainer}>
      <View style={STYLES.headerIconView}>
        <TouchableOpacity
          style={STYLES.headerBackButtonView}
          onPress={Actions.Login}
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

const ForgotPassword = (props) => {
  const msgError = () => {
    let msg = '';
    let err;
    if (props.isValid) {
      if (props.requestState !== null) {
        if (props.requestState) {
          msg = 'Se ha enviado un correo a su cuenta. Revíselo y siga el link para resetear la contraseña.';
          err = null;
        } else {
          msg = 'Algo falló :(';
        }
        err = (
          <View style={STYLES.msgNoEmail}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}> {msg} </Text>
          </View>
        );
      } else {
        err = null;
      }
    }

    return err;
  };
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
            <Text style={STYLES.title}>RECUPERA TU CONTRASEÑA </Text>
          </View>
          <View style={STYLES.formContainer}>
            <FormLabel labelStyle={STYLES.labelStyle}>
              Correo electrónico
            </FormLabel>
            <FormInput
              onChangeText={text => props.setEmail(text)}
              keyboardType="email-address"
              value={props.email}
              inputStyle={STYLES.inputStyle}
              containerStyle={STYLES.formContainer}
            />

            {msgError()}

            <View style={STYLES.btnReset}>
              <Button
                onPress={() => props.resetPassword()}
                large
                raised
                title="RESETEAR"
                backgroundColor={globalStyles.palette.background.first.backgroundColor}
              />
            </View>
          </View>
        </View>
      </Image>
    </View>
  );
};

export default ForgotPassword;
