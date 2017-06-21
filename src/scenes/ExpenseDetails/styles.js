/* import { Platform } from 'react-native';

const LABEL_COLOR = '#000000';
const INPUT_COLOR = '#212121';
const ERROR_COLOR = '#a94442';
const HELP_COLOR = '#999999';
const BORDER_COLOR = '#cccccc';
const DISABLED_COLOR = '#777777';
const DISABLED_BACKGROUND_COLOR = '#eeeeee';
const FONT_SIZE = 17;
const FONT_WEIGHT = '500';

const formStyles = {
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10,
    },
    error: {
      marginBottom: 10,
    },
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT,
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT,
    },
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: 13,
      marginBottom: 2,
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2,
    },
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR,
  },
  textboxView: {
    normal: {
    },
    error: {
    },
    notEditable: {
    },
  },
  textbox: {
    normal: {
      color: '#000',
      fontSize: FONT_SIZE,
      height: 36,
      padding: 2,
      marginTop: 5,
      borderBottomColor: INPUT_COLOR,
      borderBottomWidth: 1,
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5,
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR,
    },
  },
  checkbox: {
    normal: {
      marginBottom: 4,
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4,
    },
  },
  pickerContainer: {
    normal: {
      marginBottom: 4,
      borderRadius: 4,
      borderBottomColor: INPUT_COLOR,
      borderBottomWidth: 1,
    },
    error: {
      borderColor: ERROR_COLOR,
    },
    open: {
      // Alter styles when select container is open
    },
  },
  select: {
    normal: Platform.select({
      android: {
        paddingLeft: 7,
        color: INPUT_COLOR,
        borderBottomColor: INPUT_COLOR,
        borderBottomWidth: 1,
        marginBottom: 5,
        marginTop: 10,
      },
      ios: {

      },
    }),
    // the style applied when a validation error occours
    error: Platform.select({
      android: {
        paddingLeft: 7,
        color: ERROR_COLOR,
      },
      ios: {

      },
    }),
  },
  pickerTouchable: {
    normal: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
    },
    error: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
    },
    active: {
      borderBottomWidth: 0.5,
      borderColor: BORDER_COLOR,
    },
  },
  pickerValue: {
    normal: {
      fontSize: FONT_SIZE,
      paddingLeft: 7,
    },
    error: {
      fontSize: FONT_SIZE,
      paddingLeft: 7,
    },
  },
  datepicker: {
    normal: {
      color: ERROR_COLOR,
      marginBottom: 4,
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4,
    },
  },
  dateTouchable: {
    normal: {},
    error: {},
  },
  dateValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5,
    },
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5,
    },
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  // Own styles
};

const formNoBordersInputs = JSON.parse(JSON.stringify(formStyles));
formNoBordersInputs.textbox.normal.borderBottomWidth = 0;

const generalStyles = {
  color: '#000',
};

const columnStyles = {
  flex: 0,
  flexDirection: 'column',
};

const rowsStyles = {
  first: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    marginTop: 0,
    marginBottom: 10,
    width: 360,
  },
  general: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    width: 360,
  },
  materialInput: {
    borderBottomColor: INPUT_COLOR,
    borderBottomWidth: 0.5,
  },
  noBorders: {
    borderWidth: 0,
  },
  inputMiltiline: {
    height: 140,
    marginTop: -20,
  },
  textarea: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
};

const rowItemStyle = {
  one: {
    width: 34,
    height: 200,
  },
  two: {
    width: 68,
    height: 200,
  },
  three: {
    width: 102,
    height: 200,
  },
  four: {
    width: 136,
    height: 200,
  },
  five: {
    width: 170,
    height: 200,
  },
  six: {
    width: 204,
    height: 200,
  },
  seven: {
    width: 238,
    height: 200,
  },
  eight: {
    width: 272,
    height: 200,
  },
  nine: {
    width: 306,
    height: 200,
  },
  ten: {
    width: 340,
    height: 200,
  },
};

const customLabel = {
  fontSize: 1.3,
  fontWeight: 'bold',
};

const styles = {
  general: generalStyles,
  form: formStyles,
  formNoBordersInputs,
  rows: rowsStyles,
  rowItem: rowItemStyle,
  columns: columnStyles,
  customLabel,
};

export default styles; */

import { Platform } from 'react-native';

const LABEL_COLOR = 'grey';
const INPUT_COLOR = '#212121';
const ERROR_COLOR = '#a94442';
const HELP_COLOR = '#999999';
const BORDER_COLOR = '#cccccc';
const DISABLED_COLOR = '#777777';
const DISABLED_BACKGROUND_COLOR = '#eeeeee';
const FONT_SIZE = 17;
const FONT_WEIGHT = '500';

const visibility = {
  icons: Platform.select({
    android: {},
    ios: {
      opacity: 0,
    },
  }),
};

const globalContainer = Platform.select({
  android: {},
  ios: {
    backgroundColor: '#EFEFF4',
    marginTop: -5,
  },
});

const formStyles = {
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10,
    },
    error: {
      marginBottom: 10,
    },
  },
  controlLabel: {
    normal: Platform.select({
      android: {
        color: LABEL_COLOR,
        fontSize: 13,
        marginBottom: -5,
        fontWeight: 'normal',
      },
      ios: {},
    }),
    // the style applied when a validation error occours
    error: Platform.select({
      android: {
        color: ERROR_COLOR,
        fontSize: FONT_SIZE,
        marginBottom: 7,
        fontWeight: FONT_WEIGHT,
      },
      ios: {},
    }),
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: 13,
      marginBottom: 2,
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2,
    },
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR,
  },
  textboxView: {
    normal: Platform.select({
      android: {},
      ios: {
        height: 1,
      },
    }),
    error: {
    },
    notEditable: {
    },
  },
  textbox: {
    normal: Platform.select({
      android: {
        color: '#000',
        fontSize: FONT_SIZE,
        height: 36,
        padding: 2,
        marginTop: 5,
        borderBottomColor: INPUT_COLOR,
        borderBottomWidth: 1,
      },
      ios: {
        height: 36,
        padding: 7,
        borderRadius: 5,
        borderColor: INPUT_COLOR,
        borderWidth: 0.5,
      },
    }),
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5,
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR,
    },
  },
  checkbox: {
    normal: {
      marginBottom: 4,
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4,
    },
  },
  pickerContainer: {
    normal: Platform.select({
      android: {
        marginBottom: 4,
        borderRadius: 4,
        borderBottomColor: INPUT_COLOR,
        borderBottomWidth: 1,
      },
      ios: {},
    }),
    error: {
      borderColor: ERROR_COLOR,
    },
    open: {
      // Alter styles when select container is open
    },
  },
  select: {
    normal: Platform.select({
      android: {
        paddingLeft: 7,
        color: INPUT_COLOR,
        borderBottomColor: INPUT_COLOR,
        borderBottomWidth: 1,
        marginBottom: 0,
        marginTop: 0,
      },
      ios: {
        borderBottomColor: INPUT_COLOR,
        borderBottomWidth: 1,
      },
    }),
    // the style applied when a validation error occours
    error: Platform.select({
      android: {
        paddingLeft: 7,
        color: ERROR_COLOR,
      },
      ios: { },
    }),
  },
  pickerTouchable: {
    normal: Platform.select({
      android: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
      },
      ios: {
        height: 30,
        backgroundColor: 'red',
      },
    }),
    error: Platform.select({
      android: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
      },
      ios: {
        height: 1,
      },
    }),
    active: Platform.select({
      android: {
        borderBottomWidth: 0.5,
        borderColor: BORDER_COLOR,
      },
      ios: {
        height: 44,
      },
    }),
  },
  pickerValue: {
    normal: Platform.select({
      android: {
        fontSize: FONT_SIZE,
        paddingLeft: 7,
      },
      ios: {},
    }),
    error: Platform.select({
      android: {
        fontSize: FONT_SIZE,
        paddingLeft: 7,
      },
      ios: {},
    }),
  },
  datepicker: {
    normal: {
      color: ERROR_COLOR,
      marginBottom: 4,
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4,
    },
  },
  dateTouchable: {
    normal: {},
    error: {},
  },
  dateValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5,
    },
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5,
    },
  },
  buttonText: Platform.select({
    android: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center',
    },
    ios: {},
  }),
  button: Platform.select({
    android: {
      height: 36,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    ios: {},
  }),
};

const formNoBordersInputs = JSON.parse(JSON.stringify(formStyles));
formNoBordersInputs.textbox.normal.borderBottomWidth = 0;

const generalStyles = {
  color: '#000',
};

const columnStyles = Platform.select({
  android: {
    flex: 0,
    flexDirection: 'column',
  },
  ios: {
    flex: 0,
    flexDirection: 'column',
  },
});

const rowsStyles = {
  first: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    marginTop: 0,
    marginBottom: 10,
    width: 360,
  },
  general: Platform.select({
    android: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
      marginTop: 10,
      marginBottom: 10,
      width: 360,
    },
    ios: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 50,
      marginTop: 10,
      marginBottom: 10,
      width: 300,
    },
  }),
  materialInput: Platform.select({
    android: {
      borderBottomColor: INPUT_COLOR,
      borderBottomWidth: 0.5,
    },
    ios: {},
  }),
  noBorders: {
    borderWidth: 0,
  },
  inputMiltiline: Platform.select({
    android: {
      height: 140,
      marginTop: -20,
    },
    ios: {
      height: 140,
    },
  }),
  textarea: Platform.select({
    android: {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
    },
    ios: {
      borderColor: 'gray',
      borderWidth: 1,
      height: 50,
      padding: 7,
      borderRadius: 3,
    },
  }),
};

const rowItemStyle = {
  one: Platform.select({
    android: {
      flex: 0.1,
      height: 200,
    },
    ios: {
      flex: 0.1,
      height: 1,
    },
  }),
  two: Platform.select({
    android: {
      flex: 0.2,
      height: 200,
    },
    ios: {
      flex: 0.2,
      height: 1,
    },
  }),
  three: Platform.select({
    android: {
      flex: 0.3,
      height: 200,
    },
    ios: {
      flex: 0.3,
      height: 1,
    },
  }),
  four: Platform.select({
    android: {
      flex: 0.4,
      height: 200,
    },
    ios: {
      flex: 0.4,
      height: 1,
    },
  }),
  five: Platform.select({
    android: {
      flex: 0.5,
      height: 200,
    },
    ios: {
      flex: 0.5,
      height: 1,
    },
  }),
  six: Platform.select({
    android: {
      flex: 0.6,
      height: 200,
    },
    ios: {
      flex: 0.6,
      height: 1,
    },
  }),
  seven: Platform.select({
    android: {
      flex: 0.7,
      height: 200,
    },
    ios: {
      flex: 0.7,
      height: 1,
    },
  }),
  eight: Platform.select({
    android: {
      flex: 0.8,
      height: 200,
    },
    ios: {
      flex: 0.8,
      height: 1,
    },
  }),
  nine: Platform.select({
    android: {
      flex: 0.9,
      height: 200,
    },
    ios: {
      flex: 0.9,
      height: 1,
    },
  }),
  ten: Platform.select({
    android: {
      flex: 1,
      height: 200,
    },
    ios: {
      flex: 1,
      height: 1,
    },
  }),
};

const cardStyles = {
  cardContainer: {
    justifyContent: 'center',
    margin: 0,
    marginBottom: 8,
    height: 70,
    padding: 0,
    paddingLeft: 10,
  },
};

const pickers = {
  pickerContainer: Platform.select({
    android: {
    },
    ios: {
      backgroundColor: 'red',
      marginTop: -100,
      marginBottom: 1,
      height: 50,
    },
  }),
  picker: Platform.select({
    android: {
      paddingBottom: -20,
    },
    ios: {
      backgroundColor: 'red',
      paddingBottom: -20,
      borderColor: 'blue',
      borderWidth: 1,
    },
  }),
};

const styles = {
  general: generalStyles,
  form: formStyles,
  formNoBordersInputs,
  rows: rowsStyles,
  rowItem: rowItemStyle,
  columns: columnStyles,
  card: cardStyles,
  visibility,
  globalContainer,
  pickers,
};

export default styles;



