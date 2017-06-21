import globalStyles from '../../config/styles';

const styles = {
  container: {
    height: globalStyles.dimensions.height - 78,
    width: globalStyles.dimensions.width,
    // padding: 10,
  },
  fabAdd: {
    position: 'absolute',
    right: 5,
    bottom: 45,
  },
  fabIconProps: {
    color: '#FFF',
    size: 25,
  },
  fabIconStyle: {
    paddingTop: 30,
  },
  listItemTitle: {
    fontWeight: 'bold',
  },
  rightTitleItemExpense: {
    color: '#000',
    fontWeight: 'bold',
  },
  customCard: {
    card: {
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 4,
      height: 80,
    },
    container: {
      main: {
        flex: 1,
        flexDirection: 'column',
      },
      second: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    leftTitle: {
      fontWeight: 'bold',
    },
    rightTitle: {
      fontWeight: 'bold',
    },
    leftSubtitle: {
      color: '#CECFD3',
    },
    rightSubtitle: {
      color: '#CECFD3',
    },
  },
};

export default styles;
