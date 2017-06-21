import React from 'react';
import { View, Text, ScrollView, Picker, TextInput } from 'react-native';
import { Card, Icon, FormInput, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

const FormItem = (props) => {
  // <Card containerStyle={[{ minHeight: 60, padding: 10, paddingTop: 15, paddingBottom: 15, marginLeft: 0, marginRight: -25, marginBottom: 0, marginTop: 2, borderWidth: 0, borderBottomWidth: 0, borderBottomColor: '#D0D0D0', backgroundColor: '#FFF', elevation: 0 }, props.style]}>
  return (
    <Card containerStyle={[{ minHeight: 60, padding: 0, paddingTop: 15, paddingBottom: 15, marginBottom: 0, marginTop: 2, borderWidth: 0, borderBottomWidth: 0, borderBottomColor: '#D0D0D0', backgroundColor: '#FFF', elevation: 0 }, props.style]}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Icon
            name={props.iconData.name}
            size={props.iconData.size}
            color="#7F7D7F"
          />
        </View>
        <View style={{ flex: 0.8, flexDirection: 'column' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.title}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: -20 }}>
            {props.component}
          </View>
        </View>
      </View>

    </Card>
  );
};

const InputCategory = (props) => {
  return (
    <Card containerStyle={[{ minHeight: 60, padding: 10, paddingTop: 15, paddingBottom: 15, marginLeft: 0, marginRight: -23, marginBottom: 0, marginTop: 2, borderWidth: 0, borderBottomWidth: 0, borderBottomColor: '#D0D0D0', backgroundColor: '#FFF', elevation: 0 }, props.style]}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.2 }}>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center' }}>
              <Icon name="alarm" size={36} />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.title}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.2 }} />
        <View style={{ flex: 0.8 }}>
          <Text style={{ fontSize: 16 }}>{props.component}</Text>
        </View>
      </View>
    </Card>
  );
};

const NewAlertFromTemplate = (props) => {
  console.log('props NewAlertFromTemplate', props);
  return (
    <ScrollView style={{ flex: 1, padding: 0 }}>
      {/* CATEGORY */}
      <FormItem
        style={{ marginTop: 25 }}
        title="Categoría"
        iconData={{ name: 'label', size: 32 }}
        component={
          <FormInput
            editable={false}
            value={props.data.category}
          />
        }
      />

      {/* SUBCATEGORY */}
      <FormItem
        title="Nombre de la alerta"
        iconData={{ name: 'label', size: 32 }}
        component={
          <TextInput
            multiline
            style={{ marginLeft: 20 }}
            editable={false}
            value={props.data.subCategory}
          />
        }
      />

      {/* INITIAL MILEAGE */}
      <FormItem
        title="Kilometrage inicial"
        iconData={{ name: 'directions-car', size: 32 }}
        component={
          <FormInput
            editable={false}
            keyboardType="numeric"
            value={props.data.startMileage.toString()}
          />
        }
      />

      {/* INITIAL DATE */}
      <FormItem
        title="A partir de este fecha"
        iconData={{ name: 'date-range', size: 32 }}
        component={
          <DatePicker
            disabled
            style={{ marginTop: 5, marginBottom: 7, marginLeft: 20, width: 300 }}
            date={new Date(props.data.startDate)}
            mode="date"
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
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                marginTop: 15,
                marginBottom: 15,
              },
            }}
          />
        }
      />


      {/* BUTTON EDIT ALERT */}
      {/* <Button
        large
        buttonStyle={{ backgroundColor: '#0398EC' }}
        title="Editar"
      /> */}

    </ScrollView>
  );
};

export default NewAlertFromTemplate;
