import React from 'react';
import { StyleSheet, View, Text, TextInput, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const textInputWithIcon = icon => (locals) => {
  const templateStyles = {
    container: {
      height: 72,
      paddingVertical: 16,
      justifyContent: 'center',
    },
    label: {
      fontSize: 12,
      paddingBottom: 8,
      color: locals.hasError ? '#f44336' : '#555',
    },
    textInput: {
      padding: 0,
      margin: 0,
      fontSize: 16,
      color: '#555',
      height: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#CCC',
      paddingBottom: 8,
    },
    icon: {
      paddingRight: 8,
    },
    input: {
      flex: 1,
    },
  };

  return (
    <View style={templateStyles.container}>
      <Text style={templateStyles.label}>{locals.label}</Text>
      <View style={templateStyles.inputContainer}>
        <View style={templateStyles.icon}>
          <Icon name={icon} size={24} color={'grey'} />
        </View>
        <View style={templateStyles.input}>
          <TextInput
            accessibilityLabel={locals.label}
            ref="input"
            autoCapitalize={locals.autoCapitalize}
            autoFocus={locals.autoFocus}
            blurOnSubmit={locals.blurOnSubmit}
            editable={locals.editable}
            keyboardType={locals.keyboardType}
            maxLength={locals.maxLength}
            multiline={locals.multiline}
            onBlur={locals.onBlur}
            onEndEditing={locals.onEndEditing}
            onFocus={locals.onFocus}
            onLayout={locals.onLayout}
            onSelectionChange={locals.onSelectionChange}
            onSubmitEditing={locals.onSubmitEditing}
            secureTextEntry={locals.secureTextEntry}
            selectTextOnFocus={locals.selectTextOnFocus}
            selectionColor={locals.selectionColor}
            numberOfLines={locals.numberOfLines}
            clearButtonMode={locals.clearButtonMode}
            clearTextOnFocus={locals.clearTextOnFocus}
            enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
            keyboardAppearance={locals.keyboardAppearance}
            onKeyPress={locals.onKeyPress}
            returnKeyType={locals.returnKeyType}
            selectionState={locals.selectionState}
            onChangeText={value => locals.onChange(value)}
            onChange={locals.onChangeNative}
            placeholder={locals.placeholder}
            value={locals.value}
            placeholderTextColor="#CCC"
            style={templateStyles.textInput}
            autoCorrect={false}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
          />
        </View>
      </View>
    </View>
  );
};

/**
 * Function to generate the options with the template
const parseOptionIcons = (options) => {
  const optionsCopy = R.clone(options);
  return optionsCopy
    .fields.map(field => {
      const newField = { ...field, template: textInputWithIcon(field.icon) };
      return newField;
    });
};
*/

export { textInputWithIcon };

export default styles;
