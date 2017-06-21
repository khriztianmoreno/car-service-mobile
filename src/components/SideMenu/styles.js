import { StyleSheet } from 'react-native';
import globalStyles from '../../config/styles';

const { height, width } = globalStyles.dimensions;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EDEDED',
  },
  headerContainer: {
    flex: 0.3,
    marginBottom: 3,
    backgroundColor: '#EDEDED',
  },
  bodyContainer: {
    flex: 0.7,
    backgroundColor: '#EDEDED',
    marginTop: 3,
  },
  drawerImage: {
    width: width * 0.8,
    height: height * 0.3,
    paddingTop: 25,
  },
  drawerOverlay: {
    width: width * 0.8,
    height: height * 0.3,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  vehicleContainer: {
    flexDirection: 'row',
    // marginTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  imageVehicleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  vehiclePlateContainer: {
    flex: 0.8,
  },
  vehicleChangeContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  vehicleInfoText: {
    paddingLeft: 10,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 22,
    backgroundColor: 'transparent',
  },
  vehicleIBrandText: {
    paddingLeft: 10,
    color: '#fff',
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  itemContainer: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: 56,
    marginRight: 16,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  backButton: {
    alignItems: 'flex-end',
    padding: 10,
  },
});

export default styles;
