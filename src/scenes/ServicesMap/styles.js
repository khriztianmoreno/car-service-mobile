import globalStyles from '../../config/styles';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    flex: 0.65,
  },
  detailsMarker: {
    main: {
      flex: 0.22,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      backgroundColor: globalStyles.palette.background.first.backgroundColor,
    },
    button: {
      backgroundColor: globalStyles.palette.background.fifth.backgroundColor,
      position: 'absolute',
      bottom: 0,
      right: 0,
      borderRadius: 30,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -60,
    },
  },
  kitButtons: {
    flex: 0.13,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: globalStyles.palette.background.first.backgroundColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    marginLeft: 20,
    marginRight: 12,
  },
  scrollViewButtons: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsService: {
    button: {
      color: globalStyles.palette.quinary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      position: 'absolute',
      bottom: 5,
      right: 5,
    },
  },
  textButtonBottomBar: {
    color: '#FFF',
  },
  underlineActiveService: {
    borderTopWidth: 2,
    borderTopColor: '#FFF',
    paddingTop: 5,
    // color: '#0A8ECD',
  },
  underlineUnactiveService: {
    borderTopWidth: 0,
    // borderBottom: 0,
    // color: '#FFF',
  },
};

export default styles;
