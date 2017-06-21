import React from 'react';
import { Platform, Text } from 'react-native';

import AlertDetailsAndroid from './AlertDetails.android';
// import AlertDetailsIos from './AlertDetails.ios';

class AlertDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      category: this.props.data.category,
      subcategory: this.props.data.subCategory,
      initDate: new Date(this.props.data.startDate),
      initMileage: this.props.data.startMileage.toString(),
      visibilityInitDate: false,
      visibilityInitMileage: false,
      dateTypePeriodicity: this.props.data.periodicity.time.type,
      datePeriodicity: this.props.data.periodicity.time.number,
      mileagePeriodicity: this.props.data.periodicity.mileage
    };
  }

  componentWillMount() {
    /* this.setState({
      name: this.props.data.name,
      mileage: this.props.data.mileage,
      timeType: this.props.data.timeType,
      timeValue: this.props.data.timeValue,
      index: this.props.index,
    }); */
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


  render() {
    console.log('props alert details', this.props.data);
    const content = Platform.OS === 'android'
      ?
        <AlertDetailsAndroid states={this.state} />
      :
        <AlertDetailsAndroid />;
    return content;
  }
}

export default AlertDetailsContainer;
