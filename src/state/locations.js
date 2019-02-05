import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLandingPads } from '../spaceXApi';

export const GET_LANDING_PADS = 'GET_LANDINGPADS';
export const GET_LANDING_PADS_LOADING = 'GET_LANDINGPADS_LOADING';
export const GET_LANDING_PADS_ERROR = 'GET_LANDINGPADS_ERROR';
export const SET_LANDING_PADS = 'SET_LANDINGPADS';

const initialState = {
  landingPads: [],
  langingPadsLoading: false,
  langinPadsError: null
};

export function* getLandingPads() {
  try {
    yield put({ type: GET_LANDING_PADS_LOADING, data: true });

    const landingPadOverviews = yield call(fetchLandingPads);
    yield put({ type: SET_LANDING_PADS, data: landingPadOverviews });
  } catch (error) {
    yield put({ type: GET_LANDING_PADS_ERROR, data: error });
  } finally {
    yield put({ type: GET_LANDING_PADS_LOADING, data: false });
  }
}

export function* watchGetLandingPads() {
  yield takeLatest(GET_LANDING_PADS, getLandingPads);
}

function locations(state = initialState, action) {
  switch (action.type) {
    case GET_LANDING_PADS_LOADING:
      return { ...state, langingPadsLoading: action.data };

    case GET_LANDING_PADS_ERROR:
      return { ...state, langinPadsError: action.data };

    case SET_LANDING_PADS:
      return { ...state, landingPads: action.data };

    default:
      return state;
  }
}

export default locations;
