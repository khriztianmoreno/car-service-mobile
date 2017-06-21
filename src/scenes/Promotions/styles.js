import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'justify',
  },
  promoContainer: {
    flex: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 30,
  },
  button: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
  },
  fabRefresh: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default styles;
