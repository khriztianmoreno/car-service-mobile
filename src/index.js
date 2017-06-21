import React from 'react';
import { Provider } from 'react-redux';

import MainApp from './app';
import configureStore from './config/store';

class App extends React.Component {
  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <MainApp />
      </Provider>
    );
  }
}

export default App;
