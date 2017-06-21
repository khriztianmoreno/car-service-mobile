import {
  StyleSheet,
} from 'react-native';

import styles from './../../config/styles';


const AUTH_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  halfHeight: {
    flex: 0.55,
    backgroundColor: '#3D6DC8',
  },
  quarterHeight: {
    flex: 0.45,
    backgroundColor: 'transparent',
    paddingTop: 45,
    paddingBottom: 35,
    paddingLeft: 15,
    paddingRight: 15,
  },
  facebookBtn: {
    marginBottom: 15,
    backgroundColor: '#425bb4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#19192B',
  },
  signupWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  buttonForm: {
    backgroundColor: '#d07900',
  },
  accountText: {
    color: styles.palette.text.first.general,
    fontSize: 15,
  },
  signupLinkText: {
    color: '#d07900',
    marginLeft: 5,
  },
});

export default AUTH_STYLES;
