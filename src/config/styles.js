/**
 * Global Application Styles
 * Description: Reusable defined styles.
 */

import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = {
  dimensions: {
    height,
    width,
  },
  navBar: {
    pink: {
      general: {
        backgroundColor: '#F2385A',
        borderBottomWidth: 0,
      },
      title: {
        color: 'white',
      },
      sbColor: '#D4314F',
    },
    orange: {
      general: {
        backgroundColor: '#F5A503',
        borderBottomWidth: 0,
      },
      title: {
        color: 'white',
      },
      sbColor: '#CC8902',
    },
    // And so on...
  },
  contentPadding: Platform.select({
    android: {
      padding: 5,
    },
    ios: { },
  }),
  palette: {
    primary: '#F2385A',
    primaryDark: '#D4314F',
    secondary: '#F5A503',
    secondaryDark: '#BF8102',
    tertiary: '#E9F1DF',
    quaternary: '#56D9CD',
    quinary: '#3AA1BF',
    background: {
      first: { backgroundColor: '#F2385A' },
      second: { backgroundColor: '#F5A503' },
      third: { backgroundColor: '#E9F1DF' },
      fourth: { backgroundColor: '#56D9CD' },
      fifth: { backgroundColor: '#3AA1BF' },
    },
    text: {
      first: { color: '#F2385A' },
      second: { color: '#F5A503' },
      third: { color: '#E9F1DF' },
      fourth: { color: '#56D9CD' },
      fifth: { color: '#3AA1BF' },
      general: { color: '#272527' },
    },
  },
  title: {
    fontSize: 18,
  },
  body: {
    fontSize: 15,
  },
  backgroundContent: {
    backgroundColor: '#E9F1DF',
  },
  icon: {
    big: 50,
    medium: 36,
    small: 28,
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    container: Platform.select({
      android: {
        marginTop: 80,
        flex: 1,
      },
      ios: {
        marginTop: 70,
        flex: 1,
      },
    }),
  },
};

export default styles;
