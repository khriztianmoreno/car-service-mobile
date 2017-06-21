import React from 'react';
import { Platform } from 'react-native';

import NewAlertFromTemplateAndroid from './NewAlertFromTemplate.android';
import NewAlertFromTemplateIos from './NewAlertFromTemplate.ios';

class NewAlertFromTemplateContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      category: 'default',
    };
  }

  render() {
    const Content = Platform.OS === 'android'
      ?
        (
          <NewAlertFromTemplateAndroid
            data={this.props.data}
            states={this.state}
          />
        )
      :
        (
          <NewAlertFromTemplateIos />
        );

    return Content;
  }
}

export default NewAlertFromTemplateContainer;
