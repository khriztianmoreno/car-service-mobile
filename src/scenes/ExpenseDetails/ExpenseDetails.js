import React from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Platform,
  Picker,
} from 'react-native';

import { Button, Icon } from 'react-native-elements';
import tcomb from 'tcomb-form-native';
import ModalPicker from 'react-native-modal-picker';

import STYLES from './styles';
import globalStyles from '../../config/styles';
import ExpensesValues from '../Expenses/ExpensesValues';
import CustomModal from '../../components/CustomModal';

const Form = tcomb.form.Form;
const OS = Platform.OS;

const optionsPickers = {
  expenseType: Object.keys(ExpensesValues.convertionsTypeExpense.inverse).map(
    (item, index) => {
      return { key: index, label: item, value: ExpensesValues.convertionsTypeExpense.inverse[item] };
    }
  ),
  expenseReason: Object.keys(ExpensesValues.convertionsReasons.inverse).map(
    (item, index) => {
      return { key: index, label: item, value: ExpensesValues.convertionsReasons.inverse[item] };
    }
  ),
};

const pickerExpenseType = (props, currentOS) => {
  if (OS === 'android' && currentOS === 'android') {
    return (
      <View style={[OS === 'android' ? STYLES.rowItem.five : STYLES.rowItem.ten]}>
        <Picker
          style={STYLES.pickers.picker}
          selectedValue={props.data.typeExpense}
          onValueChange={item => props.setters.setTypeExpense(item)}
          mode={'dropdown'}
        >
          {
            Object.keys(ExpensesValues.convertionsTypeExpense.inverse).map(
              (item, index) => {
                return (
                  <Picker.Item key={index} label={item} value={ExpensesValues.convertionsTypeExpense.inverse[item]} />
                );
              },
            )
          }
        </Picker>
      </View>
    );
  }
  if (OS === 'ios' && currentOS === 'ios') {
    return (
      <View style={{ marginTop: 20, marginBottom: -20, marginRight: 45 }}>
        <ModalPicker
          data={optionsPickers.expenseType}
          initValue={ExpensesValues.convertionsTypeExpense.direct[props.data.typeExpense]}
          onChange={option => props.setters.setTypeExpense(option.value)}
          cancelText="Cancelar"
        />
      </View>
    );
  }
};

const pickerExpenseReason = (props, currentOS) => {
  if (OS === 'android' && currentOS === 'android') {
    return (
      <View style={[STYLES.rowItem.ten]}>
        <Picker
          style={STYLES.pickers.picker}
          selectedValue={props.data.reason}
          onValueChange={item => props.setters.setReason(item)}
          mode={'dropdown'}
        >
          {
            Object.keys(ExpensesValues.convertionsReasons.inverse).map(
              (item, index) => {
                return (
                  <Picker.Item key={index} label={item} value={ExpensesValues.convertionsReasons.inverse[item]} />
                );
              },
            )
          }
        </Picker>
      </View>
    );
  }
  if (OS === 'ios' && currentOS === 'ios') {
    return (
      <View style={{ marginTop: 20, marginRight: 45, marginBottom: -20 }}>
        <ModalPicker
          data={optionsPickers.expenseReason}
          initValue={ExpensesValues.convertionsReasons.direct[props.data.reason]}
          onChange={option => props.setters.setReason(option.value)}
          cancelText="Cancelar"
        />
      </View>
    );
  }
};

const ConfirmUpdateModal = (props) => {
  return (
    <CustomModal
      show={props.showModalUpdate}
      needToEdit={false}
      showModalCallback={() => props.setters.showModalUpdate(false)}
      contentTitle={'Se modificará el gasto, ¿está seguro?'}
      buttonOkDisabled={false}
      buttonOkLabel="Actualizar"
      buttonOkCallback={() => props.updateExpense()}
      buttonCancelLabel="Cancelar"
      buttonCancelCallback={() => props.setters.showModalUpdate(false)}
    />
  );
};

const ConfirmRemoveModal = (props) => {
  return (
    <CustomModal
      show={props.showModalRemove}
      needToEdit={false}
      showModalCallback={() => props.setters.showModalRemove(false)}
      contentTitle={'Se eliminará el gasto, ¿está seguro?'}
      buttonOkDisabled={false}
      buttonOkLabel="Eliminar"
      buttonOkCallback={() => props.removeExpense()}
      buttonCancelLabel="Cancelar"
      buttonCancelCallback={() => props.setters.showModalRemove(false)}
    />
  );
};

const ExpenseDetails = props => (
  <View style={STYLES.globalContainer}>
    <ScrollView
      style={[globalStyles.contentPadding, STYLES.columns, { padding: 15 }]}
      centerContent
      keyboardShouldPersistTaps
    >
      <View>
        <View style={STYLES.rows.general}>
          <View style={[STYLES.rowItem.one, { marginTop: 12 }, STYLES.visibility.icons]}>
            <Icon
              name="directions-car"
            />
          </View>

          <View style={[OS === 'android' ? STYLES.rowItem.nine : STYLES.rowItem.ten]}>
            <Form
              type={tcomb.struct({ odometer: tcomb.Number })}
              options={{
                auto: 'none',
                fields: {
                  odometer: {
                    placeholder: 'Kilometraje (km)',
                    stylesheet: STYLES.form,
                  },
                },
              }}
              value={{ odometer: props.data.odometer }}
              onChange={(value) => { props.setters.setOdometer(value.odometer); }}
            />
          </View>
        </View>

        {pickerExpenseType(props, 'ios')}

        <View style={[STYLES.rows.general, STYLES.rows.materialInput]}>
          <View style={[STYLES.rowItem.one, { marginTop: 12 }, STYLES.visibility.icons]}>
            <Icon
              name="build"
            />
          </View>
          
          {pickerExpenseType(props, 'android')}

          <View style={[STYLES.rowItem.three, OS === 'ios' ? { borderTopWidth: 0.5 } : null]}>
            <Form
              type={tcomb.struct({ value: tcomb.Number })}
              options={{
                auto: 'none',
                nullOption: false,
                fields: {
                  value: {
                    placeholder: 'Valor',
                    stylesheet: STYLES.formNoBordersInputs,
                  },
                },
              }}
              value={{ value: props.data.valueExpense }}
              onChange={(value) => { props.setters.setValueExpense(value.value); }}
            />
          </View>
        </View>


        {pickerExpenseReason(props, 'ios')}

        <View style={[STYLES.rows.general, STYLES.rows.materialInput]}>
          <View style={[STYLES.rowItem.one, { marginTop: 12 }, STYLES.visibility.icons]}>
            <Icon
              name="help"
            />
          </View>
          {pickerExpenseReason(props, 'android')}
        </View>

        <View style={STYLES.rows.general}>
          <View style={[STYLES.rowItem.one, { marginTop: 12 }, STYLES.visibility.icons]}>
            <Icon
              name="label"
            />
          </View>
          <View style={[STYLES.rowItem.nine, OS === 'ios' ? { marginTop: -40, borderTopWidth: 0.5 } : null]}>
            {/* <Form
              type={tcomb.struct({ name: tcomb.String })}
              options={{
                auto: 'none',
                fields: {
                  name: {
                    placeholder: 'Nombre del gasto',
                    stylesheet: STYLES.form,
                  },
                },
              }}
              value={{ name: props.data.name }}
              onChange={(value) => { props.setters.setName(value.name); }}
            /> */}
            <TextInput
              editable
              multiline
              hintText="Nombre del gasto"
              value={props.data.name}
              onChangeText={v => props.setters.setName(v)}
            />
          </View>
        </View>

        <View style={STYLES.rows.general}>
          <View style={[STYLES.rowItem.one, { marginTop: 12 }, STYLES.visibility.icons]}>
            <Icon
              name="place"
            />
          </View>

          <View style={[STYLES.rowItem.nine, OS === 'ios' ? { marginTop: -40, borderTopWidth: 0.5 } : null]}>
            <Form
              type={tcomb.struct({ place: tcomb.String })}
              options={{
                auto: 'none',
                fields: {
                  place: {
                    placeholder: 'Lugar del gasto',
                    stylesheet: STYLES.form,
                  },
                },
              }}
              value={{ place: props.data.place }}
              onChange={(value) => { props.setters.setPlace(value.place); }}
            />
          </View>
        </View>

        <View style={[STYLES.rows.general, STYLES.rows.inputMiltiline]}>
          <View style={[STYLES.rowItem.one, { marginTop: 55 }, STYLES.visibility.icons]}>
            <Icon
              name="mode-edit"
            />
          </View>
          <View style={[STYLES.rowItem.nine, OS === 'ios' ? { marginTop: -80 } : null]}>
            <TextInput
              style={OS === 'android' ? { borderBottomWidth: 0 } : STYLES.rows.textarea}
              multiline
              numberOfLines={5}
              placeholder="Notas"
              value={props.data.notes}
              onChangeText={(value) => { props.setters.setNotes(value); }}
            />
          </View>
        </View>
      </View>

      <View style={[STYLES.rows.general, OS === 'ios' ? { marginTop: -70 } : null]}>
        <View style={[STYLES.rowItem.five]}>
          <Button
            raised
            icon={{ name: 'edit' }}
            title="Modificar"
            overrides={{ backgroundColor: globalStyles.palette.background.fifth.backgroundColor }}
            onPress={() => {
              props.updateExpense();
            }}
          />
        </View>

        <View style={[STYLES.rowItem.five]}>
          <Button
            raised
            icon={{ name: 'delete' }}
            title="Eliminar"
            onPress={() => {
              props.setters.showModalRemove(true);
            }}
          />
        </View>
      </View>
    </ScrollView>

    { ConfirmUpdateModal(props) }

    { ConfirmRemoveModal(props) }
  </View>
);

export default ExpenseDetails;
