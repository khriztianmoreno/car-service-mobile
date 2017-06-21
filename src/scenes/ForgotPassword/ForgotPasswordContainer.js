import React, { Component, PropTypes } from 'react';
// import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';

import ForgotPassword from './ForgotPassword';
import Auth from '../../services/authentication';

class ForgotPasswordContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isValid: true,
      requestState: null,
    };
  }

  async resetPassword() {
    if (this.state.isValid) {
      try {
        const checkEmail = await Auth.resetPassword(this.state.email);
        if (checkEmail.data !== undefined) {
          this.setState({ requestState: true, email: null });
        } else {
          this.setState({ requestState: false });
        }
      } catch (error) {
        this.showToast(`Error reseteando contraseña : ${error}`);
      }
    } else {
      this.showToast('Ingrese un correo válido');
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('vEmail', email, re.test(email));
    return re.test(email);
  }

  showToast(msg) {
    Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
    });
  }

  render() {
    return (
      <ForgotPassword
        email={this.state.email}
        resetPassword={() => this.resetPassword()}
        setEmail={(email) => {
          this.setState({ email, isValid: this.validateEmail(email) });
        }}
        isValid={this.state.isValid}
        requestState={this.state.requestState}
      />
    );
  }
}


ForgotPasswordContainer.propTypes = {
  email: PropTypes.string,
};

export default ForgotPasswordContainer;
