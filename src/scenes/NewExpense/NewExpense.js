import React from 'react';
import { View, ScrollView, TextInput, Platform, Picker } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import tcomb from 'tcomb-form-native';
import ModalPicker from 'react-native-modal-picker';

import styles from '../../config/styles';
import customStyles from './styles';
import ExpenseValues from '../Expenses/ExpensesValues';

import FBSendEvent from '../../helpers/FBAnalytics';

const FormTcom = tcomb.form.Form;
const OS = Platform.OS;

const optionsPickers = {
  expenseType: Object.keys(ExpenseValues.convertionsTypeExpense.inverse).map(
    (item, index) => {
      return { key: index, label: item, value: ExpenseValues.convertionsTypeExpense.inverse[item] };
    }
  ),
  expenseReason: Object.keys(ExpenseValues.convertionsReasons.inverse).map(
    (item, index) => {
      return { key: index, label: item, value: ExpenseValues.convertionsReasons.inverse[item] };
    }
  ),
};

const pickerExpenseType = (props, currentOS) => {
  if (OS === 'android' && currentOS === 'android') {
    return (
      <View style={[OS === 'android' ? customStyles.rowItem.five : customStyles.rowItem.ten]}>
        <Picker
          style={customStyles.pickers.picker}
          selectedValue={props.data.formData_typeExpense}
          onValueChange={item => props.setters.setTypeExpense(item)}
          mode={'dropdown'}
        >
          {
            Object.keys(ExpenseValues.convertionsTypeExpense.inverse).map(
              (item, index) => {
                return (
                  <Picker.Item key={index} label={item} value={ExpenseValues.convertionsTypeExpense.inverse[item]} />
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
          initValue="Tipo gasto"
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
      <View style={[customStyles.rowItem.ten]}>
        <Picker
          style={customStyles.pickers.picker}
          selectedValue={props.data.formData_reason}
          onValueChange={item => props.setters.setReason(item)}
          mode={'dropdown'}
        >
          {
            Object.keys(ExpenseValues.convertionsReasons.inverse).map(
              (item, index) => {
                return (
                  <Picker.Item key={index} label={item} value={ExpenseValues.convertionsReasons.inverse[item]} />
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
          initValue="Razón del gasto"
          onChange={option => props.setters.setReason(option.value)}
          cancelText="Cancelar"
        />
      </View>
    );
  }
};

const NewExpense = props => (
  <View style={customStyles.globalContainer}>
    <ScrollView
      style={[styles.contentPadding, customStyles.columns, { padding: 15 }]}
      centerContent
      keyboardShouldPersistTaps
    >

      <View style={customStyles.rows.general}>
        <View style={[customStyles.rowItem.one, { marginTop: 12 }, customStyles.visibility.icons, OS === 'ios' ? { marginBottom: 20 } : null]}>
          <Icon
            name="directions-car"
          />
        </View>
        <View style={OS === 'android' ? customStyles.rowItem.nine : customStyles.rowItem.ten}>
          <FormTcom
            type={tcomb.struct({ odometer: tcomb.Number })}
            options={{
              auto: 'none',
              fields: {
                odometer: {
                  placeholder: 'Kilometraje (km)',
                  // help: 'Kilometraje actual 200km',
                  stylesheet: customStyles.form,
                },
              },
            }}
            value={props.data.formData_odometer}
            onChange={(value) => { props.setters.setOdometer(value); }}
          />
        </View>
      </View>

      {pickerExpenseType(props, 'ios')}

      <View style={[customStyles.rows.general, customStyles.rows.materialInput]}>
        <View style={[customStyles.rowItem.one, { marginTop: 12 }, customStyles.visibility.icons]}>
          <Icon
            name="build"
          />
        </View>

        {pickerExpenseType(props, 'android')}

        <View style={[customStyles.rowItem.one, { marginTop: 12 }, customStyles.visibility.icons]}>
          <Icon
            name="attach-money"
          />
        </View>

        <View style={[OS === 'android' ? customStyles.rowItem.three : customStyles.rowItem.ten]}>
          <FormTcom
            type={tcomb.struct({ valueExpense: tcomb.Number })}
            options={{
              auto: 'none',
              fields: {
                valueExpense: {
                  placeholder: 'Valor',
                  stylesheet: customStyles.formNoBordersInputs,
                },
              },
            }}
            value={props.data.formData_valueExpense}
            onChange={(value) => {
              props.setters.setValueExpense(value);
            }}
          />
        </View>
      </View>

      {pickerExpenseReason(props, 'ios')}

      <View style={[customStyles.rows.general, customStyles.rows.materialInput]}>
        <View style={[customStyles.rowItem.one, { marginTop: 12 }, customStyles.visibility.icons]}>
          <Icon
            name="help"
          />
        </View>

        {pickerExpenseReason(props, 'android')}
      </View>

      <View style={customStyles.rows.general}>
        <View style={[customStyles.rowItem.one, { marginTop: 12 }, customStyles.visibility.icons]}>
          <Icon
            name="label"
          />
        </View>
        <View style={[OS === 'android' ? customStyles.rowItem.nine : customStyles.rowItem.ten, OS === 'ios' ? { marginTop: -40, borderTopWidth: 0.5 } : null]}>
          <FormTcom
            type={tcomb.struct({ name: tcomb.String })}
            options={{
              auto: 'none',
              fields: {
                name: {
                  placeholder: 'Nombre del gasto',
                  stylesheet: customStyles.form,
                },
              },
            }}
            value={props.data.formData_name}
            onChange={(value) => {
              props.setters.setName(value);
            }}
          />
        </View>
      </View>

      <View style={customStyles.rows.general}>
        <View style={[customStyles.rowItem.one, { marginTop: 12 }, customStyles.visibility.icons]}>
          <Icon
            name="place"
          />
        </View>
        <View style={[OS === 'android' ? customStyles.rowItem.nine : customStyles.rowItem.ten, OS === 'ios' ? { marginTop: -40, borderTopWidth: 0.5 } : null]}>
          <FormTcom
            type={tcomb.struct({ place: tcomb.String })}
            options={{
              auto: 'none',
              fields: {
                place: {
                  placeholder: 'Lugar del gasto',
                  stylesheet: customStyles.form,
                },
              },
            }}
            value={props.data.formData_place}
            onChange={value => props.setters.setPlace(value)}
          />
        </View>
      </View>

      <View style={[customStyles.rows.general, customStyles.rows.inputMiltiline]}>
        <View style={[customStyles.rowItem.one, { marginTop: 55 }, customStyles.visibility.icons]}>
          <Icon
            name="mode-edit"
          />
        </View>
        <View style={[OS === 'android' ? customStyles.rowItem.nine : customStyles.rowItem.ten, OS === 'ios' ? { marginTop: -100 } : null]}>
          <TextInput
            style={OS === 'android' ? { borderBottomWidth: 0 } : customStyles.rows.textarea}
            multiline
            numberOfLines={5}
            placeholder="Notas"
            value={props.data.formData_notes}
            onChangeText={(value) => { props.setters.setNotes(value); }}
          />
        </View>
      </View>

      <View style={[customStyles.rows.general]}>
        <View style={[customStyles.rowItem.ten, { height: 200, width: 300 }, OS === 'ios' ? { marginTop: -100 } : null]}>
          <Button
            raised
            icon={{ name: 'add' }}
            title="Agregar"
            onPress={() => {
              FBSendEvent.expensesAddExpense({});
              if (props.data.formData_typeExpense === 'OTHER') {
                FBSendEvent.expensesChooseCategoryOthers({});
              }
              props.saveExpense();
            }}
          />
        </View>
      </View>
    </ScrollView>
  </View>
);

export default NewExpense;
