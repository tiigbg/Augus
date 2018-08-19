import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import fetchDataSaga from '../sagas/Sagas.js';
import logger from 'redux-logger';


export function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
    applyMiddleware(logger)
  );

  sagaMiddleware.run(fetchDataSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
