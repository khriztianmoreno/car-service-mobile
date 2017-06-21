import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Icon, Card } from 'react-native-elements';
import ResponsiveImage from 'react-native-responsive-image';

import STYLES from './styles';
import globalStyles from '../../config/styles';
import NoNetwork from '../../components/NoNetwork';
import ExpensesValues from './ExpensesValues';
import images from '../../config/images';
import Fab from '../../components/Fab';
import ItemCard from '../../components/ItemCard';

const accounting = require('accounting');

const formatDate = (format, cdate) => {
  const date = new Date(cdate);
  const objDate = {
    year: date.getFullYear(),
    month: date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
    day: date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`,
    hours: date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`,
    minutes: date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`,
    seconds: date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`,
  };

  if (format === 'time') {
    return `${objDate.hours}:${objDate.minutes}:${objDate.seconds}`;
  }

  return `${objDate.day}/${objDate.month}/${objDate.year}`;
}

const CardError = () => {
  return (
    <Card title="Error de conexión">
      <Text style={{ marginBottom: 10 }}>
        Error intentando obtener sus gastos
      </Text>
    </Card>
  );
};

const LoadingIndicator = props => {
  return (
    <View style={{ justifyContent: 'center', flex: 1, padding: 10 }}>
      <ActivityIndicator
        animating={props.isloading}
        style={[globalStyles.centering, { height: 80 }]}
        size="large"
      />
    </View>
  );
};

const CardNoInfo = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ResponsiveImage source={images.general.noData} initWidth="250" initHeight="340" />
    </View>
  );
};


const Expenses = (props) => {
  let content;

  if (props.errorGettingExpenses) {
    content = <CardError />;
  } else if (!props.existNetwork) {
    content = <NoNetwork />;
  } else if (props.expenses.length === 0 && props.isloading) {
    console.log('exp :: no data & loading');
    content = <LoadingIndicator isloading={props.isloading} />;
  } else if (props.expenses.length === 0 && !props.isloading) {
    console.log('exp :: no data & no loading');
    content = (
      <View style={STYLES.container}>
        <CardNoInfo />
        <Fab
          onPress={() => {
            if (props.existNetwork) {
              Actions.NewExpense();
            }
          }}
          iconName="add"
          style={{ right: 30 }}
        />
      </View>
    );
  } else if (props.expenses.length > 0) {
    content = (
      <View style={[STYLES.container, { padding: 0, paddingTop: 0 }]}>
        <ScrollView style={{ flex: 1 }}>
          {props.expenses.map(item => (

            item.expense.type
            ?
              <ItemCard
                key={item._id}
                style={{ marginRight: 10, height: 75 }}
                onPress={() => Actions.ExpenseDetails({ data: item })}
                leftTitle={ExpensesValues.convertionsTypeExpense.direct[item.expense.type]}
                rightTitle={accounting.formatMoney(item.expense.cost, { thousand: '.', decimal: ',', precision: 0 })}
                leftSubtitle={formatDate('date', item.createdAt)}
                rightSubtitle={`${item.actualMileage} km`}
                letter={ExpensesValues.convertionsTypeExpense.direct[item.expense.type][0]}
                colorLeftIcon={globalStyles.palette.background.second.backgroundColor}
              />
            :
              null
          ))}
        </ScrollView>

        <Fab
          onPress={() => {
            if (props.existNetwork) {
              Actions.NewExpense();
            }
          }}
          iconName="add"
          style={{ right: 30 }}
        />
      </View>
    );
  }
  return content;
};

export default Expenses;
