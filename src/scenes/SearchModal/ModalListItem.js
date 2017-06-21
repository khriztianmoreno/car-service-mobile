import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ModalListItem = (props) => {
  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
    },
    text: {
      fontSize: 13,
    },
    icon: {
      paddingLeft: 16,
      width: 56,
    },
  });

  return (
    <TouchableOpacity onPress={() => props.onSelect(props.item)}>
      <View style={[style.container, { backgroundColor: props.bgColor }]}>
        <View style={style.icon}><Icon name="brightness-1" size={22} color="grey" /></View>
        <Text style={style.text}>{props.item}</Text>
      </View>
    </TouchableOpacity>
  );
};

ModalListItem.propTypes = {
  bgColor: React.PropTypes.string,
  onSelect: React.PropTypes.func,
  item: React.PropTypes.string,
};

export default ModalListItem;
