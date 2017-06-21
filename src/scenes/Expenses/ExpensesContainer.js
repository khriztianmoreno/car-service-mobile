import React from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { Tab, Tabs, Icon } from 'react-native-elements';
import { Text, View, AsyncStorage } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import OneSignal from 'react-native-onesignal';
import I18n from 'react-native-i18n';

import Expenses from './Expenses';
import Metrics from './Metrics';
import ExpensesService from '../../services/expenses';
import globalStyles from '../../config/styles';
import STYLES from './styles';
import actions from '../../actions/actionTypes';

class ExpensesContainer extends React.Component {
  constructor() {
    super();

    const cDate = moment().toDate();
    cDate.setHours(23);
    cDate.setMinutes(59);
    cDate.setSeconds(0);
    const bDate = moment().subtract(30, 'days').toDate();
    bDate.setHours(0);
    bDate.setMinutes(0);
    bDate.setSeconds(0);

    this.state = {
      expenses: [],
      isLoadingData: true,
      vehicleSelected: false,
      existNetwork: true,
      errorGettingExpenses: false,
      selectedTab: 'expenses',
      costs: {
        total: [],
        types: [],
      },
      dateStart: bDate.getTime(),
      dateFinal: cDate.getTime(),
    };
  }

  componentDidMount() {
    console.log('DIDMOUNT EXPENSES', this.props.online);
    if (this.props.online && this.props.vehicle._id) {
      this.getMyExpenses();
      this.getCostsByTime(this.state.dateStart, this.state.dateFinal);
    } else if (this.props.online && !this.props.vehicle._id) {
      Toast.show('Buscando sus gastos', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    } else if (!this.props.online) {
      Toast.show('No hay conexión', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    } else if (!this.props.vehicle._id) {
      Toast.show('Al parecer no hay vehículos', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    } else {
      Toast.show('Buscando sus gastos', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.shouldRefresh)
      || (nextProps.online && nextProps.vehicle._id)) {
      this.getMyExpenses(nextProps.vehicle);
      this.getCostsByTime(this.state.dateStart, this.state.dateFinal);
    }
  }

  async getMyExpenses(vehicle) {
    try {
      const cVehicle = this.props.vehicle._id ? this.props.vehicle : vehicle;
      console.log('cVehicle on getMyExpenses', cVehicle._id);
      if (cVehicle._id) {
        const response = await ExpensesService.getMyExpenses(cVehicle._id);
        const answerExpenses = response.data.data.filter(item => item.expense.type !== undefined);

        console.log('getMyExpensesResponse', answerExpenses);

        this.setState({
          expenses: answerExpenses,
          isLoadingData: false,
          vehicleSelected: true,
          errorGettingExpenses: false,
        });
      } else {
        this.setState({
          isLoadingData: true,
          errorGettingExpenses: false,
        });
      }
    } catch (e) {
      console.log(`Error obteniendo los gastos: ${JSON.stringify(e)}`);
      Toast.show(`Error obteniendo los gastos: ${JSON.stringify(e)}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
      this.setState({
        isLoadingData: false,
        errorGettingExpenses: true,
      });
    }
  }

  async getCostsByTime(dateStart, dateFinal) {
    const initial = new Date(dateStart);
    initial.setHours(0);
    initial.setMinutes(0);
    initial.setSeconds(0);
    const final = new Date(dateFinal);
    final.setHours(23);
    final.setMinutes(59);
    final.setSeconds(59);
    try {
      const costs = await ExpensesService.getCostsByTime(
        initial.getTime(),
        final.getTime(),
        this.props.vehicle._id,
      );
      this.setState({ costs: costs === undefined ? { total: [], types: [] } : costs.data });
    } catch (e) {
      Toast.show(`Algo ha fallado obteniendo los costos: ${e}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  changeTab(newTab) {
    this.setState({ selectedTab: newTab });
  }

  tabsScrollabelNavigation(online) {
    return (
      <ScrollableTabView
        style={{ margin: -15, padding: 15 }}
        initialPage={2}
        tabBarBackgroundColor={globalStyles.palette.background.first.backgroundColor}
      >
        <Text tabLabel="Gastos">
          <Expenses
            expenses={this.state.expenses}
            isloading={this.state.isLoadingData}
            existNetwork={online}
            errorGettingExpenses={this.state.errorGettingExpenses}
          />
        </Text>

        <Text tabLabel="Métricas">favorite</Text>
      </ScrollableTabView>
    );
  }

  getPercentages() {
    const percentages = {};
    let total = 0;
    this.state.expenses.map((item) => {
      if (percentages[item.expense.type]) {
        percentages[item.expense.type] += item.expense.cost;
      } else {
        percentages[item.expense.type] = item.expense.cost;
      }
      total += item.expense.cost;
    });

    Object.keys(percentages).map((key) => {
      if (key !== 'total') percentages[key] = (percentages[key] * 100) / total;
    });

    return percentages;
  }

  render() {
    const { online } = this.props;

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
            }
            }
          />
        </View>
      );
    };

    return (
      <ScrollableTabView
        style={{ margin: -15 }}
        initialPage={0}
        tabBarActiveTextColor="white"
        tabBarInactiveTextColor="#C9C8C4"
        tabBarUnderlineStyle={{ backgroundColor: 'white' }}
        tabBarBackgroundColor={globalStyles.palette.background.first.backgroundColor}
        onScroll={(pos) => {
          if (pos === 1) {
            this.getCostsByTime(this.state.dateStart, this.state.dateFinal);
          }
        }}
        onChangeTab={(pos) => {
          if (pos === 1) {
            this.getCostsByTime(this.state.dateStart, this.state.dateFinal);
          }
        }}
      >

        <Expenses
          tabLabel={I18n.t('expenses.tabHistory')}
          expenses={this.state.expenses}
          isloading={this.state.isLoadingData}
          existNetwork={online}
          errorGettingExpenses={this.state.errorGettingExpenses}
        />

        <Metrics
          tabLabel={I18n.t('expenses.tabMetrics')}
          getCostsByTime={(start, final) => this.getCostsByTime(start, final)}
          costs={this.state.costs}
          existNetwork={online}
          dates={{ dateStart: this.state.dateStart, dateFinal: this.state.dateFinal }}
          setDate={(type, value) => {
            return type === 'start' ? this.setState({ dateStart: value }) : this.setState({ dateFinal: value })
          }}
          percentages={this.getPercentages()}
        />
      </ScrollableTabView>
    );
  }
}

ExpensesContainer.propTypes = {
  vehicle: React.PropTypes.object,
  online: React.PropTypes.bool,
};

const mapStateToProps = state => ({
  online: state.online,
  vehicle: state.vehicle,
  deviceId: state.deviceId,
  deviceTags: state.deviceTags,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setDeviceId(status) {
    dispatch({ type: actions.SET_DEVICE_ID, payload: status });
  },
  setUser(status) {
    dispatch({ type: actions.SET_USER_ID, payload: status });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesContainer);
