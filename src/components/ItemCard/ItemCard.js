import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import globalStyles from '../../config/styles';

const ItemCard = (props) => {
  return (
    <Card containerStyle={[{ padding: 10, paddingTop: 15, paddingBottom: 15, marginLeft: 0, marginRight: -23, marginBottom: 0, marginTop: 2, borderWidth: 0, borderBottomWidth: 1, borderBottomColor: '#D0D0D0', backgroundColor: '#FFF', elevation: 0 }, props.style]}>
      <TouchableOpacity onPress={() => props.onPress()}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.2 }}>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
              {
                !props.typeIcon
                ?
                  <View style={{ justifyContent: 'center', borderRadius: 25, backgroundColor: props.colorLeftIcon ? props.colorLeftIcon : globalStyles.palette.background.second.backgroundColor, height: 37, width: 37 }}>
                    <Text style={{ color: '#FFF', fontSize: 26, textAlign: 'center' }}> {props.letter} </Text>
                  </View> 
                :
                  <View style={{ justifyContent: 'center' }}>
                    <Icon
                      name={props.iconData.name}
                      size={props.iconData.size}
                    />
                  </View>
              }
            </View>
          </View>
          <View style={{ flex: 0.4 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.leftTitle}</Text>
          </View>
          <View style={{ flex: 0.4, alignItems: 'flex-end', marginRight: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.rightTitle}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginRight: 5 }}>
          <View style={{ flex: 0.2 }} />
          <View style={{ flex: 0.4 }}>
            <Text style={{ fontSize: 16 }}>{props.leftSubtitle}</Text>
          </View>
          <View style={{ flex: 0.4, alignItems: 'flex-end', marginRight: 20 }}>
            <Text style={{ fontSize: 16 }}>{props.rightSubtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default ItemCard;
