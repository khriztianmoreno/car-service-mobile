import React from 'react';
import { Platform } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';

import NewAlertAndroid from './NewAlert.android';
import NewAlertIos from './NewAlert.ios';
import AlertsServices from '../../services/alerts';
import SystemValuesServices from '../../services/systemvalues';

class NewAlertContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      category: 'default',
      subcategory: 'default',
      initDate: new Date(),
      initMileage: '',
      visibilityInitDate: false,
      visibilityInitMileage: false,
      dateTypePeriodicity: 'days',
      datePeriodicity: '1',
      mileagePeriodicity: '0',
      language: 'es',
      initDataReady: false,
    };

    this.categoriesData = { en: {}, es: {} };
    this.categories = { en: [], es: [] };
  }

  componentDidMount() {
    this.getAlertsConfig();
  }

  updateState(state, value) {
    if (state === 'name') this.setState({ name: value });
    else if (state === 'category') this.setState({ category: value });
    else if (state === 'subcategory') this.setState({ subcategory: value });
    else if (state === 'initDate') this.setState({ initDate: value });
    else if (state === 'initMileage') this.setState({ initMileage: value });
    else if (state === 'visibilityInitDate') this.setState({ visibilityInitDate: value });
    else if (state === 'visibilityInitMileage') this.setState({ visibilityInitMileage: value });
    else if (state === 'dateTypePeriodicity') this.setState({ dateTypePeriodicity: value });
    else if (state === 'datePeriodicity') this.setState({ datePeriodicity: value });
    else if (state === 'mileagePeriodicity') this.setState({ mileagePeriodicity: value });
    else if (state === 'numberPeriodicity') this.setState({ numberPeriodicity: value });
  }

  validateNewAlert() {
    const out = { valid: false, message: '' };
    if (this.state.category === 'default') {
      out.message = 'Debe elegir un categoría';
    } else if (this.state.subcategory === 'default') {
      out.message = 'Debe elegir un subcategoría';
    } else if (this.state.name.length <= 0) {
      out.message = 'Debe agregar un nombre';
    } else if (!this.state.visibilityInitDate && (this.state.initMileage.length <= 0 || this.state.initMileage === '0')) {
      out.message = 'Debe elegir agregar una fecha o on kilometraje inicial';
    } else if ((this.state.initMileage !== '0' && this.state.initMileage.length > 0 && this.state.mileagePeriodicity > '0' && this.state.mileagePeriodicity.length > 0) || this.state.visibilityInitDate) {
      out.valid = true;
    } else if ((this.state.initMileage.length > 0 || this.state.initMileage === '0') && (this.state.mileagePeriodicity === '0' || this.state.mileagePeriodicity.length <= 0)) {
      out.message = 'Debe ingresar un valor para el kilometraje periódico';
    }
    return out;
  }

  async saveAlert() {
    console.log('saving new alert', this.state);
    const validation = this.validateNewAlert();
    if (validation.valid) {
      try {
        let periodicity;
        if ((this.state.initMileage !== '0' && this.state.initMileage.length > 0 && this.state.mileagePeriodicity > '0' && this.state.mileagePeriodicity.length > 0) && this.state.visibilityInitDate) {
          periodicity = {
            time: {
              number: this.state.datePeriodicity,
              type: this.state.dateTypePeriodicity,
            },
            mileage: this.state.mileagePeriodicity,
          };
        } else if (this.state.initMileage !== '0' && this.state.initMileage.length > 0 && this.state.mileagePeriodicity > '0' && this.state.mileagePeriodicity.length > 0) {
          periodicity = {
            mileage: this.state.mileagePeriodicity,
          };
        } else if (this.state.visibilityInitDate) {
          periodicity = {
            time: {
              number: this.state.datePeriodicity,
              type: this.state.dateTypePeriodicity,
            },
          };
        }

        const newAlert = {
          category: this.state.category,
          subCategory: this.state.subcategory,
          name: this.state.name,
          startDate: this.state.initDate,
          startMileage: this.state.initMileage,
          periodicity,
          idUser: this.props.user,
          idDevice: this.props.deviceId,
          idVehicle: this.props.vehicle._id,
          plate: {
            number: this.props.vehicle.plate.number,
            origin: this.props.vehicle.plate.origin,
          },
        };
        await AlertsServices.addAlert(newAlert);
        Actions.pop();
        Actions.refresh({ shouldRefresh: true });
      } catch (err) {
        console.log('error adding new alert', err);
      }
    } else {
      Toast.show(validation.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  async getAlertsConfig() {
    try {
      const alertsConfig = await SystemValuesServices.getAlertsConfig();
      // Create template for this.categoriesData
      const keys = [];
      alertsConfig.map(cat => {
        if (keys.filter(k => cat.category.en === k.en).length === 0) {
          keys.push({ en: cat.category.en });
          this.categories.en.push(cat.category.en);
          this.categories.es.push(cat.category.es);
          this.categoriesData.en[cat.category.en] = [];
          this.categoriesData.es[cat.category.es] = [];
        }
      });

      // Add data to template created
      alertsConfig.map(cat => {
        this.categoriesData.en[cat.category.en].push(cat.subCategory.en);
        this.categoriesData.es[cat.category.es].push(cat.subCategory.es);
      });
      this.setState({ initDataReady: true });
    } catch (err) {
      console.error(`Error onteniendo categorías: ${err}`);
      Toast.show(`Error onteniendo categorías: ${err}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
      });
    }
  }

  render() {
    /* const Content = Platform.OS === 'android'
      ?
        (
          <NewAlertAndroid
            states={this.state}
            updateState={(k, v) => this.updateState(k, v)}
            saveAlert={() => this.saveAlert()}
            categories={this.state.initDataReady ? this.categories[this.state.language] : []}
            subcategories={this.state.initDataReady && this.state.category !== 'default' ? this.categoriesData[this.state.language][this.state.category] : []}
          />
        )
      :
        (
          <NewAlertIos
            states={this.state}
            updateState={(k, v) => this.updateState(k, v)}
            saveAlert={() => this.saveAlert()}
            categories={this.state.initDataReady ? this.categories[this.state.language] : []}
          />
        ); */

    const Content = Platform.OS === 'android'
      ?
        <NewAlertAndroid />
      :
        <NewAlertIos />;

    return Content;
  }
}

const mapStateToProps = state => ({
  online: state.online,
  vehicle: state.vehicle,
  deviceId: state.deviceId,
  deviceTags: state.deviceTags,
  user: state.user,
});

export default connect(mapStateToProps)(NewAlertContainer);
