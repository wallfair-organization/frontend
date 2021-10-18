import _ from 'lodash';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import sagas from './sagas/index';
import storage from 'redux-persist/lib/storage';
import withReady from 'redux-ready';
import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { createBrowserHistory } from 'history';
import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import Environment from '../helper/Environment';
import createMigrate from 'redux-persist/es/createMigrate';
import { migrations, MIGRATION_VERSION } from './migration';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  version: MIGRATION_VERSION,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: true }),
  blacklist: ['router', 'rosiGame'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const isDevelopment = Environment.isDevelopment();
const allMiddlewares = [
  isDevelopment ? require('redux-immutable-state-invariant').default() : null,
  sagaMiddleware,
  routerMiddleware(history),
];
const middlewares = _.reject(allMiddlewares, _.isNull);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(withReady, applyMiddleware(...middlewares))
);

store.ready().then(state => {
  sagaMiddleware.run(sagas.root);
});

const persistor = persistStore(store);

export default () => ({ store, persistor });
