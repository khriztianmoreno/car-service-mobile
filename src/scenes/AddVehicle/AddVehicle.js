import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import t from 'tcomb-form-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import ButtonStatus from '../../components/ButtonStatus';

import G_STYLES from '../../config/styles';
import L_STYLES, { textInputWithIcon } from './styles';
import CountryPicker from './../../components/CountryPicker';

import FBSendEvent from '../../helpers/FBAnalytics';

// const R = require('ramda');

const Form = t.form.Form;

/* const stylesheet = R.clone(Form.stylesheet);
stylesheet.formGroup.normal.marginBottom = 5;
stylesheet.formGroup.normal.height = 72;
stylesheet.formGroup.normal.justifyContent = 'center';
stylesheet.formGroup.error.marginBottom = 5;
stylesheet.controlLabel.normal.marginBottom = 2;
stylesheet.controlLabel.normal.fontSize = 12;
stylesheet.controlLabel.normal.color = '#CCC';
stylesheet.textbox.normal.padding = 0;
stylesheet.textbox.normal.margin = 0;
stylesheet.textbox.normal.paddingBottom = 5;

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.normal.borderRadius = 0;
stylesheet.textbox.normal.borderBottomWidth = 1;
stylesheet.textbox.normal.borderColor = '#CCC'; */

class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    const { formOptions: options } = this.props;

    options.fields.plate.template = textInputWithIcon('directions-car');
    options.fields.model.template = textInputWithIcon('local-offer');
    // options.fields.bodyWork.template = textInputWithIcon('extension');
    // options.fields.cylinder.template = textInputWithIcon('whatshot');
    // options.fields.mileage.template = textInputWithIcon('rv-hookup');
    // options.fields.vin.template = textInputWithIcon('credit-card');

    this.options = options;
  }

  render() {
    const { selectOptions, selectData, onSelectModalOption } = this.props;
    return (
      <ScrollView
        style={G_STYLES.modal.container}
        keyboardShouldPersistTaps
        contentContainerStyle={L_STYLES.container}
      >
        <Form
          ref={(form) => { this.form = form; }}
          type={this.props.formSchema}
          options={this.options}
          value={this.props.value}
          onChange={value => this.props.handleValueChange(value)}
        />
        <View style={{ height: 72, borderBottomWidth: 1, borderColor: '#CCC' }}>
          <Text style={{ fontSize: 12, paddingBottom: 8, color: '#555' }}>PAIS DE RODAMIENTO</Text>
          <View style={{ justifyContent: 'center' }}>
            <CountryPicker onChangeValue={val => this.props.updateCountry(val)} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 8 }}>
          {selectOptions.map(item => (
            <ButtonStatus
              status={item.status}
              value={item.value}
              key={item.key}
              icon={item.icon}
              bgColor="white"
              label={item.label}
              onPress={() => Actions.SearchModal(
                {
                  title: item.label,
                  id: item.key,
                  data: selectData[item.key],
                  onSelect: onSelectModalOption,
                  emptyInitial: item.emptyInitial,
                  placeholder: item.placeholder,
                  searchMessage: item.searchMessage,
                }
              )
              }
            />
          ))}
        </View>
        <Button
          raised
          icon={{ name: 'add' }}
          title="AGREGAR"
          buttonStyle={{ marginLeft: 0, marginRight: 0, marginTop: 2 }}
          onPress={() => {
            this.props.onFormSubmit(this.form);
            FBSendEvent.vehiclesAddVehicle({});
          }}
        />
      </ScrollView>
    );
  }
}

AddVehicle.propTypes = {
  formOptions: React.PropTypes.object,
  selectOptions: React.PropTypes.array,
  onSelectModalOption: React.PropTypes.func,
  selectData: React.PropTypes.object,
  formSchema: React.PropTypes.func,
  onFormSubmit: React.PropTypes.func,
  value: React.PropTypes.object,
  handleValueChange: React.PropTypes.func,
  updateCountry: React.PropTypes.func,
};

export default AddVehicle;
