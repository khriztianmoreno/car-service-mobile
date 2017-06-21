import { StyleSheet } from 'react-native';
import globalStyles from '../../config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  addIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  cardContainer: {
    justifyContent: 'center',
    margin: 0,
    marginBottom: 8,
    height: 70,
    padding: 0,
    paddingLeft: 10,
    borderLeftWidth: 5,
    borderLeftColor: globalStyles.palette.primary,
  },
  plate: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  created: {
    color: '#CCC',
    fontSize: 13,
  },
});

export default styles;
