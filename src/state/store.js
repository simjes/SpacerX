import { combineReducers, createStore } from 'redux';
import landingPads from './landingPads';

const reducers = combineReducers({
  landingPads
});

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
