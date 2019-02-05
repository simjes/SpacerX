import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import landingPads, {
  watchGetLandingPads,
  watchGetLandingPad
} from './landingPads';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import launches, { watchGetNextLaunch } from './launches';

const reducers = combineReducers({
  landingPads,
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
  yield all([
    watchGetLandingPads(),
    watchGetLandingPad(),
    watchGetNextLaunch()
  ]);
}

sagaMiddleware.run(rootSaga);
