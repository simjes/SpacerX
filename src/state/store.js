import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import landingPads, {
  watchGetLandingPads,
  watchGetLandingPad
} from './landingPads';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const reducers = combineReducers({
  landingPads
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

function* rootSaga() {
  yield all([watchGetLandingPads(), watchGetLandingPad()]);
}

sagaMiddleware.run(rootSaga);
