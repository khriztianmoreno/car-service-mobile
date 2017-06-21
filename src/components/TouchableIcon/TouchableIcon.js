import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, View } from 'react-native';

import globalStyles from '../../config/styles';

const TouchableIcon = props => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={props.onPress}
    // onLongPress={() => props.onLongPress()}
    disabled={props.disabled}
  >
    <View
      style={[globalStyles.centeredContent, { backgroundColor: 'transparent' }]}
    >
      <Icon name={props.name} color={props.color} size={props.size} />
    </View>
  </TouchableOpacity>
);

TouchableIcon.propTypes = {
  onPress: React.PropTypes.func,
  // onLongPress: React.PropTypes.func,
  color: React.PropTypes.string,
  size: React.PropTypes.number,
  name: React.PropTypes.string,
  disabled: React.PropTypes.bool,
};

export default TouchableIcon;
