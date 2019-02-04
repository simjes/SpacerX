import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchLandingPad, fetchLandingPads } from '../spaceXApi';

export const GET_LANDINGPADS = 'GET_LANDINGPADS';
export const GET_LANDINGPADS_LOADING = 'GET_LANDINGPADS_LOADING';
export const GET_LANDINGPADS_ERROR = 'GET_LANDINGPADS_ERROR';
export const SET_LANDINGPADS = 'SET_LANDINGPADS';

export const GET_LANDINGPAD = 'GET_LANDINGPAD';
export const GET_LANDINGPAD_LOADING = 'GET_LANDINGPAD_LOADING';
export const GET_LANDINGPAD_ERROR = 'GET_LANDINGPAD_ERROR';
export const SET_LANDINGPAD = 'SET_LANDINGPAD';

const initialState = {
  overviews: [],
  overviews_loading: false,
  overviews_error: null,
  details: [],
  details_loading: false,
  details_error: null
};

export function* getLandingPads() {
  try {
    yield put({ type: GET_LANDINGPADS_LOADING, data: true });

    const landingPadOverviews = yield call(fetchLandingPads);
    yield put({ type: SET_LANDINGPADS, data: landingPadOverviews });
  } catch (error) {
    yield put({ type: GET_LANDINGPADS_ERROR, data: error });
  } finally {
    yield put({ type: GET_LANDINGPADS_LOADING, data: false });
  }
}

export function* getLandingPad(action) {
  try {
    yield put({ type: GET_LANDINGPAD_LOADING, data: true });

    const landingPad = yield call(fetchLandingPad, action.id);
    yield put({ type: SET_LANDINGPAD, data: landingPad });
  } catch (error) {
    yield put({ type: GET_LANDINGPAD_ERROR, data: error });
  } finally {
    yield put({ type: GET_LANDINGPAD_LOADING, data: false });
  }
}

export function* watchGetLandingPads() {
  yield takeLatest(GET_LANDINGPADS, getLandingPads);
}

export function* watchGetLandingPad() {
  yield takeLatest(GET_LANDINGPAD, getLandingPad);
}

function landingPads(state = initialState, action) {
  switch (action.type) {
    case GET_LANDINGPADS_LOADING:
      return { ...state, overviews_loading: action.data };
    case GET_LANDINGPADS_ERROR:
      return { ...state, overviews_error: action.data };
    case SET_LANDINGPADS:
      return { ...state, overviews: action.data };
    case GET_LANDINGPAD_LOADING:
      return { ...state, details_loading: action.data };
    case GET_LANDINGPAD_ERROR:
      return { ...state, details_error: action.data };
    case SET_LANDINGPAD:
      return { ...state, details: action.data };
    default:
      return state;
  }
}

export default landingPads;
