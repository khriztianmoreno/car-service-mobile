import React from 'react';
import Modal from 'react-native-simple-modal';
import { View, Text, Button } from 'react-native';

import globalStyles from '../../config/styles';

const ModalConfirmation = (props) => {
  return (
    <Modal
      open={props.show}
      offset={0}
      overlayBackground={'rgba(0, 0, 0, 0.75)'}
      animationDuration={200}
      animationTension={40}
      modalDidOpen={() => undefined}
      modalDidClose={() => { props.cancel(); }}
      closeOnTouchOutside={false}
      containerStyle={{
        justifyContent: 'center',
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


      <Text style={{ marginBottom: 30, fontSize: 16, alignItems: 'center' }}> { props.message } </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button
          title="Aceptar"
          color={globalStyles.palette.background.fifth.backgroundColor}
          style={{ justifyContent: 'center' }}
          onPress={() => props.accept()}
        />

        <Button
          title="Cancelar"
          color={globalStyles.palette.background.first.backgroundColor}
          onPress={() => props.cancel()}
        />
      </View>
    </Modal>
  );
};

export default ModalConfirmation;
