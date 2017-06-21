import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import images from '../../config/images';
import styles from './styles';
import TouchableIcon from '../TouchableIcon';

import FBSendEvent from '../../helpers/FBAnalytics';

const NavListItem = props => (
  <TouchableOpacity
    onPress={() => props.onPress(props.id, props.data)}
    activeOpacity={0.3}
  >
    <View style={styles.itemContainer}>
      <View style={styles.leftIcon}>
        <Icon name={props.icon} size={30} color="rgba(0, 0, 0, 0.54)" />
      </View>
      <Text style={styles.itemTitle}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

/*
<Text style={styles.vehicleInfoText}>{props.currentVehicle.plate.number}</Text>
<Text style={styles.vehicleIBrandText}>{props.currentVehicle.vehicleData.brand}</Text>
*/


const SideMenu = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Image
          source={images.backgrounds.DRAWER}
          style={styles.drawerImage}
          resizeMode="cover"
        >
          <View style={styles.backButton}>
            <TouchableIcon
              color="white"
              size={36}
              name="arrow-back"
              onPress={() => {
                props.toggleDrawer();
                FBSendEvent.sideMenuClickHamburguerButton({});
              }}
            />
          </View>
          <View style={styles.imageVehicleContainer}>
            <View style={styles.vehicleContainer}>
              <View style={styles.vehiclePlateContainer}>
                <Text style={styles.vehicleInfoText}>{props.currentVehicle.plate.number}</Text>
                <Text style={styles.vehicleIBrandText}>{props.currentVehicle.vehicleData.brand}</Text>
              </View>
              <View style={styles.vehicleChangeContainer}>
                <TouchableIcon
                  color="#FFFFFF"
                  size={40}
                  name="arrow-drop-down"
                  onPress={() => props.changeList()}
                />
              </View>
            </View>
          </View>

        </Image>
      </View>
      <View style={styles.bodyContainer}>
        {props.primaryList.list.map((item, index) => (
          <NavListItem
            key={index}
            id={item.key}
            icon={item.icon}
            title={item.title}
            data={item.data}
            onPress={() => {
              props.onOptionPress(item.key, item.data);
              if (item.key === 'home') FBSendEvent.sideMenuClickHomeSection({});
              if (item.key === 'vehicles') FBSendEvent.sideMenuClickVehiclesSection({});
              if (item.key === 'expenses-record') FBSendEvent.sideMenuClickExpensesSection({});
              if (item.key === 'alerts-center') FBSendEvent.sideMenuClickAlertsSection({});
              if (item.key === 'promotions') FBSendEvent.sideMenuClickPromotionsSection({});
              if (item.key === 'promotions') FBSendEvent.sideMenuClickPromotionsSection({});
              if (item.key === 'configuration') FBSendEvent.sideMenuClickConfigurationSection({});
            }}
          />
        ))}
      </View>
    </View>
  );
};

NavListItem.propTypes = {
  id: React.PropTypes.string,
  icon: React.PropTypes.string,
  title: React.PropTypes.string,
  onPress: React.PropTypes.func,
  data: React.PropTypes.object,
};

SideMenu.propTypes = {
  primaryList: React.PropTypes.shape({
    title: React.PropTypes.string,
    list: React.PropTypes.array,
  }).isRequired,
  onOptionPress: React.PropTypes.func,
  toggleDrawer: React.PropTypes.func,
  changeList: React.PropTypes.func,
};

export default SideMenu;
