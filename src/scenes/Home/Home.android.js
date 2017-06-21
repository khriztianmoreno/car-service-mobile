import React from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { View, Text, Picker, ActivityIndicator } from 'react-native';
import { Card, FormInput, FormValidationMessage, Button, ListItem } from 'react-native-elements';
// import Carousel from 'react-native-looped-carousel';
import moment from 'moment';
import I18n from 'react-native-i18n';

import globalStyles from '../../config/styles';
import FBSendEvent from '../../helpers/FBAnalytics';

const defaltMileageOptions = [
  { key: 'null0', label: 'Elija su opción', value: null },
];

const TIPS = [
  'Calibra tus llantas y evita el desgaste de estas.',
  'Conduce con prudencia respetando las normas.',
  'El balanceo evita las vibraciones en el volante.',
  'Evita que la batería se seque, añade líquido de baterías.',
];

const LoadingIndicator = (props) => {
  return (
    <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
      <ActivityIndicator
        animating={props.loading}
        style={[globalStyles.centering, { height: 80 }]}
        size="large"
      />
    </View>
  );
};


const HomeWithoutData = (props) => {
  return (
    <View>
      <Card containerStyle={{ borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
        <Text
          style={{ textAlign: 'center', fontSize: 17, color: 'grey', fontWeight: 'bold' }}
        >
            Vehículo actual: {props.vehicle.plate.number}
        </Text>
      </Card>

      <Card containerStyle={{ borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
        <Text
          style={{ textAlign: 'center', fontSize: 20, color: 'grey', fontWeight: 'bold' }}
        >
            Tu kilometraje inicial es
        </Text>

        <FormInput
          autoFocus
          inputStyle={{ height: 80, fontSize: 30, textAlign: 'center' }}
          value={props.initialValueMileage}
          keyboardType="numeric"
          placeholder="0 km"
          onChangeText={v => {
            props.updateState('initialValueMileage', v);
            if (v < 5000) {
              props.updateState('lastRevisionValue', v);
            }
          }}
        />

        <FormValidationMessage
          containerStyle={{ opacity: props.errorInitialMessage ? 1 : 0, height: 25, marginBottom: 10 }}
          labelStyle={{ fontSize: 16, textAlign: 'center' }}
        >
          Valor inválido para el kilometraje
        </FormValidationMessage>

        <Button
          large
          title="Actualizar"
          backgroundColor="#25b9ff"
          disabled={!props.validators.initialValueMileage}
          onPress={() => {
            console.log('press button update xD');
            if (props.validators.initialValueMileage) {
              props.saveInitialValueMileage();
            } else {
              props.updateState({ errorInitialMessage: true });
            }
          }}
        />
      </Card>
    </View>
  );
};

const HomeWithData = (props) => {
  return (
    <View>
      <Card containerStyle={{ borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
        <Text
          style={{ textAlign: 'center', fontSize: 17, color: 'grey', fontWeight: 'bold' }}
        >
            Vehículo actual: {props.vehicle.plate.number}
        </Text>
      </Card>

      <Card containerStyle={{ borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
        <Text
          style={{ textAlign: 'center', fontSize: 17, color: 'grey', fontWeight: 'bold' }}
        >
            Tu kilometraje actual es
        </Text>

        <FormInput
          inputStyle={{ height: 80, fontSize: 30, textAlign: 'center' }}
          value={props.initialValueMileage}
          editable={false}
        />
      </Card>

      {/* Card Months Ago */}
      <Card containerStyle={{ borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
        <Text
          style={{ textAlign: 'center', fontSize: 17, color: 'grey', fontWeight: 'bold' }}
        >
            ¿Hace cuántos meses fue tu última revisión?
        </Text>

        <FormInput
          autoFocus
          inputStyle={{ height: 80, fontSize: 30, textAlign: 'center' }}
          value={props.monthsAgo}
          keyboardType="numeric"
          placeholder="Ejm: 2 meses"
          onChangeText={(v) => {
            props.setStates.monthsAgo(v);
            props.generateLastReviewOptions();
          }}
        />
      </Card>

      {/* Card Last Review */}
      {
        props.validators.monthsAgo && props.initialValueMileage > 5000
        ?
          <Card containerStyle={{ borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
            <Text
              style={{ textAlign: 'center', fontSize: 17, color: 'grey', fontWeight: 'bold' }}
            >
                ¿Cuál fue tu última revisión?
            </Text>

            <Picker
              mode="dropdown"
              style={{ height: 40, width: 340, marginTop: 15 }}
              selectedValue={props.lastRevisionValue}
              onValueChange={opt => {
                console.log('OPT', opt);
                props.setStates.lastRevisionValue(opt);
              }}
            >
              {
                props.optionsLastReview.map(item => (
                  <Picker.Item key={item.key} label={`${item.label} km`} value={item.value} />
                ))
              }
            </Picker>
          </Card>
        :
          null
      }

      {/* Button save */}
      {
        props.monthsAgo.length > 0
        ?
          <View style={{ marginTop: 20 }}>
            <Button
              large
              title="Guardar"
              backgroundColor="#25b9ff"
              onPress={() => {
                props.updateState('initDataSaved', true);
                props.saveDataHome();
              }}
            />
          </View>
        :
          null
      }
    </View>
  );
};

const MainHome = (props) => {
  const mileageValues = {
    current: parseInt(props.currentMileage, 10),
    original: parseInt(props.originalCurrentMileage, 10),
  };
  return (
    <View style={{ margin: -15 }}>
      <Card containerStyle={{ borderWidth: 0, backgroundColor: '#FFF', elevation: 5, minHeight: 200 }}>        
        <Text
          style={{ textAlign: 'center', fontSize: 20, color: 'grey', fontWeight: 'bold' }}
        >
          {I18n.t('home.labelQuestion')}
        </Text>

        <FormInput
          // editable={!props.isCorrectCurrentMileage}
          inputStyle={{ height: 80, fontSize: 30, textAlign: 'center' }}
          value={mileageValues.current > 0 ? Math.floor(parseInt(props.currentMileage, 10)).toString() : null}
          keyboardType="numeric"
          // placeholder="0 km"
          onChangeText={v => props.updateCurrentMileage(v.length > 0 ? parseInt(v, 10) : v)}
        />

        {/* Actions Buttons */}

        <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}>
          <View style={{ flex: 0.5 }}>
            <Button
              disabled={mileageValues.current > 0 && mileageValues.original !== mileageValues.current}
              title={I18n.t('home.buttonFine')}
              backgroundColor="#498EF3"
              onPress={() => {
                props.updateState('showButtonsCorrectValueMileage', false);
                props.updateCurrentMileageValue();
                props.updateCurrentMileageOnDb();
                // props.setStates.showForm(false);
                FBSendEvent.homeClickFineButton({});
              }}
            />
          </View>

          <View style={{ flex: 0.5 }}>
            <Button
              raised
              disabled={mileageValues.current > 0 ? mileageValues.original === mileageValues.current : true}
              title={I18n.t('home.buttonUpdate')}
              backgroundColor="#4E9657"
              onPress={() => {
                props.updateState('showButtonsCorrectValueMileage', false);
                props.updateCurrentMileageValue();
                props.updateCurrentMileageOnDb();
                // props.setStates.showForm(false);
                FBSendEvent.homeClickFineButton({});
              }}
            />
            {
              /* props.isCorrectCurrentMileage
              ?
                <Button
                  raised
                  title="Mal"
                  backgroundColor="#BA2626"
                  onPress={() => props.updateState('isCorrectCurrentMileage', false)}
                />
              :
                <Button
                  raised
                  disabled={props.currentMileage.length <= 0}
                  title="Actualizar"
                  backgroundColor="#4E9657"
                  onPress={() => {
                    props.updateState('showButtonsCorrectValueMileage', false);
                    props.updateCurrentMileageValue();
                    props.updateCurrentMileageOnDb();
                  }}
                /> */
            }
          </View>
        </View>
      </Card>

      {/* List of alerts */}
      <Card containerStyle={{ marginTop: 1, paddingBottom: -5, borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {I18n.t('home.labelAlertsList')} </Text>
        {
          props.alerts[0]
          ?
            <ListItem
              hideChevron
              title={props.alerts[0].name}
              leftIcon={{ name: 'error', style: { fontSize: 36, color: 'orange' } }}
              rightTitle={moment(props.alerts[0].nextReviewDate).format('L')}
              onPress={() => {
                FBSendEvent.homeClickNextAlerts({});
                Actions.AlertsCenter({ type: ActionConst.REPLACE });
              }}
            />
          :
            null
        }
        {
          props.alerts[1]
          ?
            <ListItem
              hideChevron
              title={props.alerts[1].name}
              leftIcon={{ name: 'error', style: { fontSize: 36, color: 'orange' } }}
              rightTitle={moment(props.alerts[1].nextReviewDate).format('L')}
              onPress={() => Actions.AlertsCenter({ type: ActionConst.REPLACE })}
            />
          :
            null
        }
      </Card>

      {/* Slide tips */}
      {
        /* <Card containerStyle={{ marginTop: 1, paddingBottom: -5, borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
          <View style={{ padding: 50 }}>
            <Carousel
              delay={2000}
              style={{ width: 400, height: 200 }}
              autoplay
              onAnimateNextPage={(p) => console.log(p)}
            >
              <View><Text style={{ fontSize: 24 }}>{TIPS[0]}</Text></View>
              <View><Text style={{ fontSize: 24 }}>{TIPS[1]}</Text></View>
              <View><Text style={{ fontSize: 24 }}>{TIPS[2]}</Text></View>
            </Carousel>
          </View>
        </Card> */
      }
      <Card containerStyle={{ marginTop: 1, paddingBottom: -5, borderWidth: 0, backgroundColor: '#FFF', elevation: 5 }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}> {I18n.t('home.labelTips')} </Text>
        <View style={{ padding: 50 }}>
          <Text style={{ fontSize: 20, fontStyle: 'italic' }}>{TIPS[0]}</Text>
        </View>
      </Card>
    </View>
  );
};

const whatShow = (props) => {
  if (props.vehicle._id === undefined) {
    return <LoadingIndicator loading />;
  }

  if (!props.vehicle.initialMileage && !props.initialValueMileageSaved) {
    return HomeWithoutData(props);
  } else if (!props.vehicle.initialMileage && props.initialValueMileageSaved) {
    return HomeWithData(props);
  }
  return MainHome(props);
};

const HomeAndroid = (props) => {
  return (
    <View>
      { whatShow(props) }
    </View>
  );
};

export default HomeAndroid;
