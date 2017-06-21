import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  countryList: {
    flex: 0.8,
    borderRightWidth: 1,
    borderColor: '#CCC',
  },
  lettersContainer: {
    flex: 0.2,
    flexDirection: 'column',
  },
  backIcon: {
    flex: 0.10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#CCC',
  },
  lettersList: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 5,
  },
  letter: {
    height: 30,
    backgroundColor: '#F2385A',
    width: 30,
    borderRadius: 15,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listItemContainer: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  flag: {
    marginLeft: 16,
    width: 58,
  },
});

export default styles;
