import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BTN_STATUS = {
  INVALID: 0,
  INITIAL: 1,
  VALID: 2,
};
// import styles from './styles';

const ButtonStatus = (props) => {
  return (
    <View style={[{ backgroundColor: props.bgColor, flex: 1 }]}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={{ alignItems: 'center' }}>
          <Icon
            name={props.icon}
            size={30}
            color={props.status === BTN_STATUS.INVALID ? '#EF5350' : 'grey'}
          />
          <Text style={{ color: props.value ? 'black' : '#CCC' }}>
            {props.value || props.label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ButtonStatus.propTypes = {
  status: React.PropTypes.number,
  value: React.PropTypes.string,
  icon: React.PropTypes.string,
  label: React.PropTypes.string,
  onPress: React.PropTypes.func,
  bgColor: React.PropTypes.string,
};

export { BTN_STATUS };
export default ButtonStatus;
