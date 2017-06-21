import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import globalStyles from '../../config/styles';

const fabStyles = {
  position: 'absolute',
  right: 5,
  bottom: 45,
};

const sizesIcon = {
  big: 50,
  medium: 36,
  small: 28,
};

const FAB = (props) => {
  return (
    <View style={[fabStyles, props.style]}>
      <Icon
        reverse
        raised
        name={props.iconName}
        color={globalStyles.palette.background.first.backgroundColor}
        size={sizesIcon.small}
        onPress={() => props.onPress()}
      />
    </View>
  );
};

export default FAB;
