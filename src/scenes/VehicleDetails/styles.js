import { StyleSheet } from 'react-native';
import G_STYLES from '../../config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  row: {
    height: 48,
  },
  rowContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
  },
  rowIcon: {
    paddingRight: 8,
  },
  rowLabel: {
    paddingLeft: 18,
    fontSize: 16,
    fontWeight: 'bold',
  },
  alignEnd: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default styles;
