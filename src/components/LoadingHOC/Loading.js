import React from 'react';
import {
  View, StyleSheet, Text, Platform,
  ActivityIndicator, ActivityIndicatorIOS,
} from 'react-native';
import G_STYLES from '../../config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    paddingTop: 10,
  },
});

const Loading = props => {
  return (
    <View style={[styles.container, styles.centering]}>
      <ActivityIndicator
        animating
        color={G_STYLES.palette.primary}
        size={Platform.OS === 'ios' ? 1 : 50}
      />
      <Text style={styles.message}>{props.text}</Text>
    </View>
  );
};

const LoadingWrapper = (props) => {
  const { loading, children } = props;
  return loading
    ? <Loading text={props.text} />
    : children || null;
};

LoadingWrapper.propTypes = {
  loading: React.PropTypes.bool,
  // children: React.PropTypes.element,
  text: React.PropTypes.string,
};

Loading.propTypes = {
  text: React.PropTypes.string,
};

export default LoadingWrapper;


