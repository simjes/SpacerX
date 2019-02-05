import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import launches, { watchGetNextLaunch } from './launches';
import locations, { watchGetLandingPads } from './locations';

const reducers = combineReducers({
  locations,
  launches
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
  yield all([watchGetLandingPads(), watchGetNextLaunch()]);
}

sagaMiddleware.run(rootSaga);
