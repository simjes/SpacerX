import { handleActions } from 'redux-actions';
import {
  errorNextLaunch,
  requestingNextLaunch,
  setNextLaunch
} from './launchActions';

const initialState = {
  next: null,
  errorNext: null,
  requestingNext: false
};

const launches = handleActions(
  {
    [setNextLaunch]: (state, action) => ({
      ...state,
      next: action.payload,
      requestingNext: false
    }),
    [requestingNextLaunch]: (state, _) => ({
      ...state,
      requestingNext: true
    }),
    [errorNextLaunch]: (state, action) => ({
      ...state,
      errorNext: action.payload,
      requestingNext: false
    })
  },
  initialState
);

export default launches;
