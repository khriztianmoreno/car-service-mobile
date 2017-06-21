import React from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
// import { VictoryArea, VictoryChart, VictoryTheme } from 'victory-native';
import DatePicker from 'react-native-datepicker';
import { accounting } from 'accounting';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import PieChart from 'react-native-pie-chart';
import { Badge } from 'native-base';
import I18n from 'react-native-i18n';

import globalStyles from '../../config/styles';
import EXPENSES_VALUES from './ExpensesValues';
import STYLES from './styles';

import FBSendEvent from '../../helpers/FBAnalytics';

let dateStart;
let dateFinal;

const FAB = (props) => {
  return (
    <View style={[STYLES.fabAdd, { bottom: 24, right: 30 }]}>
      <Icon
        reverse
        raised
        name="add"
        color={globalStyles.palette.primary}
        size={globalStyles.icon.small}
        onPress={() => {
          if (props.existNetwork) {
            Actions.NewExpense();
          }
        }}
      />
    </View>
  );
};

const CardMetric = (props, category) => {
  const toMoney = number => accounting.formatMoney(number, { thousand: '.', decimal: ',', precision: 0 });
  let currentCost = 0;
  let objCost = [];
  if (props.costs.types) {
    objCost = props.costs.types.filter(cost => cost._id.type === category.toUpperCase());
  }

  if (objCost.length > 0) {
    currentCost = objCost[0].value;
  }

  const totalCostsForCategory = `${toMoney(currentCost)}`;
  const currentValueCost = currentCost === 0 ? 'Sin datos para mostrar' : totalCostsForCategory;
  const titleMetrics = `${EXPENSES_VALUES.convertionsTypeExpense.direct[category.toUpperCase()]}`;


  let content = (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <Card
        title={titleMetrics}
        titleStyle={{ fontSize: 18, color: '#4f9deb' }}
      >

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 20 }}>
              {currentValueCost}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );

  if (currentCost === 0) content = null;
  return content;
};

const TotalCost = (props) => {
  const total = props.costs.total.length === 0 ? accounting.formatMoney(0, { thousand: '.', decimal: ',', precision: 0 }) : accounting.formatMoney(props.costs.total[0].value, { thousand: '.', decimal: ',', precision: 0 });
  return (
    <View>
      <Card
        title={props.costs.total.length === 0 ? 'Sin gastos aún' : 'Gastos totales'}
        titleStyle={{ fontSize: 24, color: '#4f9deb' }}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 32 }}>{total}</Text>
        </View>
      </Card>
    </View>
  );
};

const mbDatePicker = (props, defaultDate, type)  => {
  let picker;
  if (type === 'start') {
    const limit = new Date(dateFinal);
    limit.setDate(limit.getDate() - 1);
    picker = (
      <DatePicker
        style={{ marginTop: 15, marginBottom: 7 }}
        date={new Date(defaultDate)}
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
          dateInput: Platform.select({
            android: {
              marginLeft: 36,
              height: 42,
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              marginTop: 15,
              marginBottom: 15,
            },
            ios: {
              marginLeft: 36,
              height: 42,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              marginTop: 15,
            },
          }),
        }}
        onDateChange={(date) => {
          if (type === 'start') dateStart = new Date(date).getTime();
          else if (type === 'final') dateFinal = new Date(date).getTime();
          props.getCostsByTime(dateStart, dateFinal);
          props.setDate(type, new Date(date).getTime());
          FBSendEvent.expensesUpdateMetricsDates({});
        }}
        maxDate={limit}
      />
    );
  } else if (type === 'final') {
    const limit = new Date(dateStart);
    limit.setDate(limit.getDate() + 1);
    picker = (
      <DatePicker
        style={{ marginTop: 15, marginBottom: 7 }}
        date={new Date(defaultDate)}
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
          dateInput: Platform.select({
            android: {
              marginLeft: 36,
              height: 42,
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              marginTop: 15,
              marginBottom: 15,
            },
            ios: {
              marginLeft: 36,
              height: 42,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              marginTop: 15,
            },
          }),
        }}
        onDateChange={(date) => {
          if (type === 'start') dateStart = new Date(date).getTime();
          else if (type === 'final') dateFinal = new Date(date).getTime();
          props.getCostsByTime(dateStart, dateFinal);
          props.setDate(type, new Date(date).getTime());
          FBSendEvent.expensesUpdateMetricsDates({});
        }}
        minDate={limit}
      />
    );
  }
  return picker;
};

/*
<Text>Inicial</Text>
<Text>Final</Text>
*/

const Metrics = (props) => {
  dateStart = props.dates.dateStart;
  dateFinal = props.dates.dateFinal;

  const colors = [
    '#2196F3', '#4CAF50', '#FF9800', '#2c3e50', '#16a085',
    '#7f8c8d', '#27ae60', '#DB5A6B', '#FFB3A7', '#1F4788', '#F44336',
  ];

  const dataPie = {
    series: [],
    labels: [],
    colors: [],
  };
  Object.keys(props.percentages).map((key, index) => {
    dataPie.series.push(props.percentages[key]);
    dataPie.labels.push(key);
    dataPie.colors.push(colors[index]);
  });

  return (
    <View style={[STYLES.container, { padding: 0 }]}>
      <ScrollView style={{ flex: 1, padding: 20, paddingTop: 0 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 0.5 }}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              {mbDatePicker(props, props.dates.dateStart, 'start')}
              <Text style={{ textAlign: 'center', fontStyle: 'italic', marginLeft: -8 }}>{I18n.t('expenses.metrics.initDate')}</Text>
            </View>
          </View>

          <View style={{ flex: 0.5 }}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              {mbDatePicker(props, props.dates.dateFinal, 'final')}
              <Text style={{ textAlign: 'center', fontStyle: 'italic', marginLeft: 5 }}>{I18n.t('expenses.metrics.lastDate')}</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
          <View style={{ flex: 0.6, marginLeft: 10 }}>
            <PieChart
              chart_wh={200}
              series={dataPie.series}
              sliceColor={dataPie.colors}
              doughnut
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
          </View>

          <View style={{ flex: 0.4, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', marginRight: 5 }}>
            {
              dataPie.colors.map((item, index) => (
                <Badge key={index} style={{ backgroundColor: item, padding: 5 }}>
                  <Text style={{ color: '#FFF', fontSize: 10, marginTop: 6 }}>{dataPie.labels[index]} ({Math.round(dataPie.series[index])}%)</Text>
                </Badge>
              ))
            }
          </View>
        </View>

        {TotalCost(props)}
        {CardMetric(props, 'fuel')}
        {CardMetric(props, 'mechanical')}
        {CardMetric(props, 'assistance')}
        {CardMetric(props, 'carwash')}
        {CardMetric(props, 'toll')}
        {CardMetric(props, 'other')}
      </ScrollView>

      <FAB existNetwork={props.existNetwork} />
    </View>
  );
};

export default Metrics;
