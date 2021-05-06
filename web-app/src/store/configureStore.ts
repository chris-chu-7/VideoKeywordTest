import { AnyAction, applyMiddleware, compose, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import history from 'store/history';
import { DEV } from '../constants';
import createRootReducer, { RootState } from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware({});

const middleware: Middleware[] = [sagaMiddleware, thunk];

if (!DEV) {
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
  }
} else {
  middleware.push(
    createLogger({
      predicate: (
        _,
        action: {
          type: string;
          payload: Record<string, unknown>;
          meta: Record<string, unknown>;
        },
      ) => !/^@@/.test(action.type) && !/UPDATE_FRAME/.test(action.type),
      collapsed: true,
    }),
  );
}

const composeEnhancers =
  DEV && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const store = createStore<RootState, AnyAction, Record<string, unknown>, undefined>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  createRootReducer(history),
  composeEnhancers(applyMiddleware(...middleware)),
);

export default () => {
  sagaMiddleware.run(rootSaga);
  return { store };
};
