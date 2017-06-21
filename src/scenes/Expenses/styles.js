import styles from '../../config/styles';

const customStyles = {
  container: {
    /*height: styles.dimensions.height - 78,
    width: styles.dimensions.width,*/
    padding: 10,
    flex: 1,
    // paddingLeft: -5,
    // paddingRight: -5,
    // paddingBottom: 20,
  },
  fabAdd: {
    position: 'absolute',
    right: 10,
    bottom: 10,
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
      marginTop: 3,
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
  cardExpense: {
    leftTitle: {
      position: 'absolute',
      left: 0,
      width: 170,
    },
    rightTitle: {
      position: 'absolute',
      right: 0,
      width: 170,
    },
    leftSubtitle: {
      position: 'absolute',
      left: 0,
      marginTop: 20,
      width: 170,
    },
    rightSubtitle: {
      position: 'absolute',
      right: 0,
      marginTop: 20,
      width: 170,
    },
  },
};

export default customStyles;
