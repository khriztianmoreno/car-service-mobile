import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './../reducers/';

function configureStore(initialState = undefined) {
  const logger = createLogger();
  let middleware = [thunk];
  if (__DEV__) {
    // Dev-only middleware
    middleware = [
      ...middleware,
      // logger, // Logs state changes to the dev console
    ];
  }
  const enhancer = compose(applyMiddleware(...middleware));

  return createStore(reducers, initialState, enhancer);
}

export default configureStore;
