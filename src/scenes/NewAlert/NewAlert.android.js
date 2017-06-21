import React from 'react';
import { View, ScrollView, Picker, Text } from 'react-native';
import { CheckBox, Card, Icon, FormInput } from 'react-native-elements';
import TextField from 'react-native-md-textinput';
import DatePicker from 'react-native-datepicker';

import STYLES from './styles';
import globalStyles from '../../config/styles';

const defaultPickerValues = {
  categories: { key: 'defC', label: 'Sin categoría', value: 'default' },
  subcategories: { key: 'defS', label: 'Sin subcategoría', value: 'default' },
};

const defaultTimePeriodicity = [
  { key: 't0', label: 'Días', value: 'days' },
  { key: 't1', label: 'Semanas', value: 'weeks' },
  { key: 't2', label: 'Meses', value: 'months' },
  { key: 't3', label: 'Años', value: 'years' },
];

const FAB = (props) => {
  return (
    <View style={STYLES.FAB}>
      <Icon
        reverse
        raised
        name="check"
        color={globalStyles.palette.secondary}
        size={globalStyles.icon.small}
        onPress={() => props.saveAlert()}
      />
    </View>
  );
};

const NewAlertORIGINAL = (props) => {
  const isVisiblePeriodicityTitle = ((props.states.initMileage !== '0' && props.states.initMileage.length > 0) || props.states.visibilityInitDate);
  const isVisiblePeriodicityMileage = props.states.initMileage !== '0' && props.states.initMileage.length;
  const isVisiblePeriodicityDate = props.states.visibilityInitDate;
  const backgroundTextField = {
    date: props.states.visibilityInitDate ? '#FFF' : '#F6F8FA',
    mileage: props.states.visibilityInitMileage ? '#FFF' : '#F6F8FA',
  };

  console.log('props new alert', props);

  return (
    <View style={STYLES.globalContainer}>
      <ScrollView
        style={{ padding: 0 }}
        centerContent
        keyboardShouldPersistTaps
      >

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', marginLeft: -15, marginRight: -15, marginTop: -15, paddingBottom: -15 }}>
          <Card
            title="Información básica"
            containerStyle={{ marginBottom: -15, borderBottomWidth: 2.8, borderBottomColor: '#E2E2E2' }}
          >
            {/* Category Picker */}
            <View>
              <Text> Elija una categoría </Text>
              <Picker
                mode="dropdown"
                style={{ height: 40, width: 340 }}
                selectedValue={props.states.category}
                onValueChange={cat => {
                  props.updateState('category', cat);
                }}
              >
                {
                  props.categories.length > 0
                  ?
                    props.categories.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))
                  :
                    <Picker.Item key={defaultPickerValues.categories.key} label={defaultPickerValues.categories.label} value={defaultPickerValues.categories.value} />
                }
              </Picker>
            </View>

            {/* Subcategory Picker */}
            <View>
              <Text style={{ marginTop: 30 }}> Elija una Subcategoría </Text>
              <Picker
                style={{ height: 40, width: 340 }}
                selectedValue={props.states.subcategory}
                onValueChange={sub => props.updateState('subcategory', sub)}
                mode="dropdown"
              >
                
                {
                  props.subcategories.length > 0
                  ?
                    props.subcategories.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))
                  :
                    <Picker.Item key={defaultPickerValues.subcategories.key} label={defaultPickerValues.subcategories.label} value={defaultPickerValues.subcategories.value} />
                }
              </Picker>
            </View>

            {/* Name alert */}
            <View>
              <TextField
                dense
                label={'Nombre de la alerta'}
                highlightColor={'#4DB6AC'}
                value={props.states.name}
                onChangeText={text => props.updateState('name', text)}
              />
            </View>
          </Card>

          <Card
            title="1. Datos iniciales"
            containerStyle={{ marginBottom: -5, borderBottomWidth: 2.8, borderBottomColor: '#E2E2E2' }}
          >
            {/* Initial Mileage */}
            <View>
              <View style={{ marginTop: 20 }}>
                <TextField
                  dense
                  label="Kilométraje inicial"
                  highlightColor={'#4DB6AC'}
                  value={props.states.initMileage}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    props.updateState('initMileage', text);
                    props.updateState('visibilityInitMileage', text !== '0' && text.length > 0);
                  }}
                />
              </View>
            </View>

            {/* Initial Date */}
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginBottom: -100 }}>
              <View style={STYLES.rowItem.five}>
                <CheckBox
                  title="Fecha inicial"
                  checked={props.states.visibilityInitDate}
                  containerStyle={{ borderWidth: 0, backgroundColor: '#FFF' }}
                  onPress={() => props.updateState('visibilityInitDate', !props.states.visibilityInitDate)}
                />
              </View>

              <View style={STYLES.rowItem.five}>
                <DatePicker
                  style={{ marginTop: 5, marginBottom: 7 }}
                  disabled={!props.states.visibilityInitDate}
                  date={props.states.initDate}
                  mode="date"
                  placeholder="Seleccione la fecha de base"
                  format="YYYY[/]MM[/]D"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 90,
                      top: 2,
                      marginLeft: 0,
                      opacity: 0,
                    },
                    dateInput: {
                      marginLeft: 0,
                      height: 42,
                      borderBottomWidth: 2,
                      borderTopWidth: 2,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      marginTop: 15,
                      marginBottom: 15,
                    },
                  }}
                  onDateChange={date => props.updateState('initDate', date)}
                />
              </View>
            </View>
          </Card>

          {/* Periodicity */}
          <View>
            <Card
              title="2. Periodicidad"
              containerStyle={{ marginBottom: -15, borderBottomWidth: 2.8, borderBottomColor: '#E2E2E2' }}>

              <View style={{ marginBottom: -120 }}>
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 25, justifyContent: 'center' }}>
                  <View style={{ flex: 1, marginLeft: -10 }}>
                    <Text style={{ fontSize: 16, marginTop: 5, marginLeft: 10 }}> Por tiempo </Text>
                  </View>
                </View>
            
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 25 }}>
                  <View style={[STYLES.rowItem.two, { marginTop: 15 }]}>
                    <Text> Cada </Text>
                  </View>
                  <View style={[STYLES.rowItem.two, { marginTop: -25 }]}>
                    <TextField
                      dense
                      highlightColor={'#4DB6AC'}
                      value={props.states.datePeriodicity}
                      keyboardType={'numeric'}
                      editable={props.states.visibilityInitDate}
                      onChangeText={text => props.updateState('datePeriodicity', text)}
                      inputStyle={{ backgroundColor: backgroundTextField.date }}
                    />
                  </View>

                  <View style={STYLES.rowItem.six}>
                    <Picker
                      mode="dropdown"
                      selectedValue={props.states.dateTypePeriodicity}
                      onValueChange={value => props.updateState('dateTypePeriodicity', value)}
                      style={{ height: 40, marginLeft: 20 }}>
                      {
                        defaultTimePeriodicity.map(item => (
                          <Picker.Item key={item.key} label={item.label} value={item.value} />
                        ))
                      }
                    </Picker>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: 0 }}>
                <Text style={{ fontSize: 16, marginLeft: 10, marginTop: 10 }}> Por kilometraje </Text>
            
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginLeft: 25, marginBottom: -100 }}>
                  <View style={STYLES.rowItem.two}>
                    <Text> Cada </Text>
                  </View>
                  
                  <View style={[STYLES.rowItem.two, { marginTop: -40 }]}>
                    <TextField
                      dense
                      highlightColor={'#4DB6AC'}
                      value={props.states.mileagePeriodicity}
                      keyboardType={'numeric'}
                      editable={props.states.visibilityInitMileage}
                      onChangeText={text => props.updateState('mileagePeriodicity', text)}
                      inputStyle={{ backgroundColor: backgroundTextField.mileage }}
                    />
                  </View>

                  <View style={STYLES.rowItem.six}>
                    <Text style={{ marginLeft: 5 }}> kilómetros </Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>

      {FAB(props)}
    </View>
  );
};

const NewAlertY = (props) => {
  return (
    <ScrollView
      style={{ padding: 10 }}
      centerContent
      keyboardShouldPersistTaps
    >
      <View style={{ padding: 0, paddingBottom: 10, margin: -10, marginBottom: 10 }}>
        <Card containerStyle={{ marginBottom: 0, borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
          {/* Category Picker */}
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Elija una categoría </Text>
            <Picker
              mode="dropdown"
              style={{ height: 40, width: 340 }}
              selectedValue={props.states.category}
              onValueChange={cat => props.updateState('category', cat)}>
              <Picker.Item key={defaultPickerValues.categories.key} label={defaultPickerValues.categories.label} value={defaultPickerValues.categories.value} />
              {
                props.categories.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))
              }
            </Picker>
          </View>

          {/* Subcategory Picker */}
          <View>
            <Text style={{ marginTop: 30, fontSize: 20, fontWeight: 'bold' }}> Elija una Subcategoría </Text>
            <Picker
              style={{ height: 40, width: 340 }}
              selectedValue={props.states.subcategory}
              onValueChange={sub => props.updateState('subcategory', sub)}
              mode="dropdown">
              
              {
                defaultPickerValues.subcategories.map((item) => {
                  return <Picker.Item key={item.key} label={item.label} value={item.value} />;
                })
              }
            </Picker>
          </View>
        </Card>

        <Card containerStyle={{ marginBottom: 0, borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
          {/* Initial Mileage */}
            <View>
              <View style={{ marginTop: 20 }}>
                <FormInput
                  value={props.states.initMileage}
                  placeholder="Kilométraje inicial"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    props.updateState('initMileage', text);
                    props.updateState('visibilityInitMileage', text !== '0' && text.length > 0);
                  }}
                />
              </View>
            </View>

            {/* Initial Date */}
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginBottom: -100 }}>
              <View style={STYLES.rowItem.five}>
                <CheckBox
                  title="Fecha inicial"
                  checked={props.states.visibilityInitDate}
                  containerStyle={{ borderWidth: 0, backgroundColor: '#FFF' }}
                  onPress={() => props.updateState('visibilityInitDate', !props.states.visibilityInitDate)}
                />
              </View>

              <View style={STYLES.rowItem.five}>
                <DatePicker
                  style={{ marginTop: 5, marginBottom: 7 }}
                  disabled={!props.states.visibilityInitDate}
                  date={props.states.initDate}
                  mode="date"
                  placeholder="Seleccione la fecha de base"
                  format="YYYY[/]MM[/]D"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 90,
                      top: 2,
                      marginLeft: 0,
                      opacity: 0,
                    },
                    dateInput: {
                      marginLeft: 0,
                      height: 42,
                      borderBottomWidth: 2,
                      borderTopWidth: 2,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      marginTop: 15,
                      marginBottom: 15,
                    },
                  }}
                  onDateChange={date => props.updateState('initDate', date)}
                />
              </View>
            </View>

        </Card>
      </View>
    </ScrollView>
  );
};

const NewAlert = (props) => {
  return (
    <View>
      <Text> ALerts List </Text>
    </View>
  );
};

export default NewAlert;
