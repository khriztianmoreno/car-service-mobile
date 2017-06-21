import React from 'react';
import Modal from 'react-native-simple-modal';
import { View, Text, Button, TextInput, Platform } from 'react-native';

import globalStyles from '../../config/styles';

const customStyles = Platform.select({
  android: {
    marginTop: 10,
    marginBottom: 10,
  },
  ios: {
    marginTop: 20,
    marginBottom: 20,
    height: 20,
  },
});

const CustomModal = (props) => {
  let content = null;

  if (props.needToEdit) {
    content = (
      <View>
        <Text> {props.contentTitle} </Text>
        <TextInput
          editable
          maxLength={15}
          placeholder={props.contentPlaceholder}
          style={customStyles}
          keyboardType={props.contentKeyboardType}
          onChangeText={(text) => {
            props.contentCallback(text);
          }}
        />
      </View>
    );
  } else {
    content = (
      <Text style={{ marginBottom: 10 }}> {props.contentTitle} </Text>
    );
  }
  return (
    <Modal
      open={props.show}
      offset={0}
      overlayBackground={'rgba(0, 0, 0, 0.75)'}
      animationDuration={200}
      animationTension={40}
      modalDidOpen={() => undefined}
      modalDidClose={() => { props.showModalCallback(false); }}
      closeOnTouchOutside={false}
      containerStyle={{
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'column',
      }}
      modalStyle={{
        borderRadius: 2,
        margin: 20,
        padding: 10,
        backgroundColor: '#F5F5F5',
      }}
    >

      { content }

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button
          title={props.buttonCancelLabel}
          color={globalStyles.palette.background.first.backgroundColor}
          onPress={() => { props.showModalCallback(false); }}
        />

        <Button
          title={props.buttonOkLabel}
          disabled={props.buttonOkDisabled}
          color={globalStyles.palette.background.fifth.backgroundColor}
          style={{ justifyContent: 'center' }}
          onPress={() => props.buttonOkCallback()}
        />
      </View>
    </Modal>
  );
};

const CustomModal2 = (props) => {
  return (
    <View>
      <Text> {props.contentTitle} </Text>
    </View>
  );
};

export default CustomModal;
