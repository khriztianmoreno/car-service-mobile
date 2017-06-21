import {
  StyleSheet,
} from 'react-native';

import styles from './../../config/styles';


const REGISTER_STYLES = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    paddingTop: 30,
    width: null,
    height: null,
  },
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 50,
  },
  footerContainer: {
    flex: 2,
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25,
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 30,
    color: '#fff',
  },
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    color: styles.palette.text.fifth.color,
    backgroundColor: 'transparent',
  },
  inputStyle: {
    margin: -3,
    alignItems: 'center',
    color: styles.palette.text.general.color,
    width: 200,
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: styles.palette.text.general.color,
    fontSize: 17,
  },
  signin: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  accountText: {
    color: styles.palette.text.general.color,
    fontSize: 15,
  },
  signupLinkText: {
    color: styles.palette.background.first.backgroundColor,
    marginLeft: 5,
  },
  whiteFont: {
    color: styles.palette.text.general.color,
  },
  placeHolder: {
    color: styles.palette.text.general.color,
  },
  msgNoEmail: {
    width: 320,
    marginTop: 40,
  },
  btnReset: {
    width: 320,
    marginTop: 40,
  },
});

export default REGISTER_STYLES;
