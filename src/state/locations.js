import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLandingPads, fetchLaunchPads } from '../spaceXApi';
import {
  mapLandingPadsToLocations,
  mapLaunchPadsToLocations
} from '../utils/locationUtils';

export const GET_LANDING_PADS = 'GET_LANDING_PADS';
export const GET_LANDING_PADS_LOADING = 'GET_LANDINGPADS_LOADING';
export const GET_LANDING_PADS_ERROR = 'GET_LANDINGPADS_ERROR';
export const SET_LANDING_PADS = 'SET_LANDING_PADS';

export const GET_LAUNCH_PADS = 'GET_LAUNCH_PADS';
export const GET_LAUNCH_PADS_LOADING = 'GET_LAUNCH_PADS_LOADING';
export const GET_LAUNCH_PADS_ERROR = 'GET_LAUNCH_PADS_ERROR';
export const SET_LAUNCH_PADS = 'SET_LAUNCH_PADS';

const initialState = {
  landingPads: null,
  landingPadsLoading: false,
  langingPadsError: null,
  launchPads: null,
  launchPadsLoading: false,
  launchPadsError: null
};

export function* getLandingPads() {
  try {
    yield put({ type: GET_LANDING_PADS_LOADING, data: true });

    const landingPads = yield call(fetchLandingPads);
    const locations = mapLandingPadsToLocations(landingPads);

    yield put({ type: SET_LANDING_PADS, data: locations });
  } catch (error) {
    yield put({ type: GET_LANDING_PADS_ERROR, data: error });
  } finally {
    yield put({ type: GET_LANDING_PADS_LOADING, data: false });
  }
}
export function* getLaunchPads() {
  try {
    yield put({ type: GET_LAUNCH_PADS_LOADING, data: true });

    const launchPads = yield call(fetchLaunchPads);
    const locations = mapLaunchPadsToLocations(launchPads);

    yield put({ type: SET_LAUNCH_PADS, data: locations });
  } catch (error) {
    yield put({ type: GET_LAUNCH_PADS_ERROR, data: error });
  } finally {
    yield put({ type: GET_LAUNCH_PADS_LOADING, data: false });
  }
}

export function* watchGetLaunchPads() {
  yield takeLatest(GET_LAUNCH_PADS, getLaunchPads);
}

export function* watchGetLandingPads() {
  yield takeLatest(GET_LANDING_PADS, getLandingPads);
}

function locations(state = initialState, action) {
  switch (action.type) {
    case GET_LANDING_PADS_LOADING:
      return { ...state, landingPadsLoading: action.data };

    case GET_LANDING_PADS_ERROR:
      return { ...state, landingPadsError: action.data };

    case SET_LANDING_PADS:
      return { ...state, landingPads: action.data };

    case GET_LAUNCH_PADS_LOADING:
      return { ...state, launchPadsLoading: action.data };

    case GET_LAUNCH_PADS_ERROR:
      return { ...state, launchPadsError: action.data };

    case SET_LAUNCH_PADS:
      return { ...state, launchPads: action.data };

    default:
      return state;
  }
}

export default locations;
