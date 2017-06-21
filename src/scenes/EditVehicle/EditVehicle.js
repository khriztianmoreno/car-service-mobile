import React from 'react';
import { ScrollView, View } from 'react-native';
import t from 'tcomb-form-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import ButtonStatus from '../../components/ButtonStatus';

import G_STYLES from '../../config/styles';
import L_STYLES, { textInputWithIcon } from './styles';

const Form = t.form.Form;

class EditVehicle extends React.Component {
  constructor(props) {
    super(props);
    const { formOptions: options } = this.props;

    options.fields.plate.template = textInputWithIcon('directions-car');
    options.fields.model.template = textInputWithIcon('local-offer');
    options.fields.mileage.template = textInputWithIcon('rv-hookup');
    // options.fields.bodyWork.template = textInputWithIcon('extension');
    options.fields.cylinder.template = textInputWithIcon('whatshot');
    options.fields.vin.template = textInputWithIcon('credit-card');
    options.fields.service.template = textInputWithIcon('room-service');
    options.fields.fuel.template = textInputWithIcon('local-gas-station');
    options.fields.capacity.template = textInputWithIcon('space-bar');
    options.fields.motor.template = textInputWithIcon('attach-file');
    options.fields.serie.template = textInputWithIcon('attach-file');

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
        <View style={{ flexDirection: 'row', flex: 1, paddingBottom: 8 }}>
          {selectOptions.map(item => (
            <ButtonStatus
              status={item.status}
              value={item.value}
              key={item.key}
              icon={item.icon}
              bgColor="white"
              label={item.label}
              onPress={() => Actions.SearchModal({
                title: item.label,
                id: item.key,
                data: selectData[item.key],
                onSelect: onSelectModalOption,
              })}
            />
          ))}
        </View>
        <Button
          raised
          title="GUARDAR"
          buttonStyle={{ marginLeft: 0, marginRight: 0 }}
          onPress={() => this.props.onFormSubmit(this.form)}
        />
      </ScrollView>
    );
  }
}

EditVehicle.propTypes = {
  formOptions: React.PropTypes.object,
  selectOptions: React.PropTypes.array,
  onSelectModalOption: React.PropTypes.func,
  selectData: React.PropTypes.object,
  formSchema: React.PropTypes.func,
  onFormSubmit: React.PropTypes.func,
  value: React.PropTypes.object,
  handleValueChange: React.PropTypes.func,
};

export default EditVehicle;
