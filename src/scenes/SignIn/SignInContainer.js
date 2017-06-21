import React from 'react';
import { connect } from 'react-redux';
import { Alert, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
/* import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';
import authentication from 'feathers-authentication-client';*/

import SignIn from './SignIn';
import Auth from './../../services/authentication';
import LoadingWrapper from './../../components/LoadingHOC';
import { getTokenPayload, isTokenValid } from './../../helpers/jwt';
import { setUserObject as setUserObjectAction } from '../../actions/userActions';

/* if (!global._babelPolyfill) { require('babel-polyfill'); }
window.navigator.userAgent = 'ReactNative';
const io = require('socket.io-client');*/

class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    /* const options = { transports: ['websocket'], forceNew: true };
    const socket = io('http://192.168.1.58:3030', options);

    this.app = feathers()
      .configure(socketio(socket))
      .configure(hooks())
      // Use AsyncStorage to store our login toke
      .configure(authentication({
        storage: AsyncStorage,
      }));*/
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    // 1.Preguntar si esta logeado
    try {
      const token = await Auth.getToken();
      if (token) {
        const payload = getTokenPayload(token);
        if (isTokenValid(payload.exp)) {
          Auth.setTokenInRequest(token);
          Actions.drawer({ token });
        } else {
          this.setState({ loading: false });
        }
      } else {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.log('Error: ', error);
    }
    // 2. Validar si el token no ha caducado
  }

  // Create response callback.
  async handleResponseTokenCallback(tokenFB) {
    try {
      const res = await Auth.FBlogin(tokenFB);
      const token = res.data.token;
      const userId = Auth.extractIdFromToken(token);
      console.log('TOKEN', token);
      console.log('userID', userId);

      await AsyncStorage.setItem('userId', userId);
      Auth.saveLocalToken(token);
      Actions.drawer({ token });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async loginUser(user) {
    try {
      const res = await Auth.login(user);

      // await AsyncStorage.setItem('userId', res.data.data._id);

      const token = res.data.token;
      Auth.saveLocalToken(token);
      Actions.drawer({ token });
    } catch (error) {
      console.log('Error Login: ', error.response);
    }
  }

  render() {
    return (
      <LoadingWrapper
        loading={this.state.loading}
        text="Validando sesión"
      >
        <SignIn
          responseTokenCallback={(err, resp) => this.handleResponseTokenCallback(err, resp)}
        />
      </LoadingWrapper>
    );
  }
}

const mapStateToProps = state => ({
  userObject: state.userObject,
});

const mapDispatchToProps = dispatch => ({
  setUserObject(user) {
    return dispatch(setUserObjectAction(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
