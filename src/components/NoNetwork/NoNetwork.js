import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import React from 'react';

const NoNetworkDesign = () => (
  <Card title="No hay conexión">
    <Text style={{ marginBottom: 10 }}>
      En este momento no hay alguna conexión disponible.
    </Text>
  </Card>
);

export default NoNetworkDesign;
