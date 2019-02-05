import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchNextLaunch } from '../spaceXApi';

export const GET_NEXT_LAUNCH = 'GET_NEXT_LAUNCH';
export const GET_NEXT_LAUNCH_LOADING = 'GET_NEXT_LAUNCH_LOADING';
export const GET_NEXT_LAUNCH_ERROR = 'GET_NEXT_LAUNCH_ERROR';
export const SET_NEXT_LAUNCH = 'SET_NEXT_LAUNCH';

const initialState = {
  next: null,
  next_loading: false,
  next_error: null
};

export function* getNextLaunch() {
  try {
    yield put({ type: GET_NEXT_LAUNCH_LOADING, data: true });

    const nextLaunch = yield call(fetchNextLaunch);
    yield put({ type: SET_NEXT_LAUNCH, data: nextLaunch });
  } catch (error) {
    yield put({ type: GET_NEXT_LAUNCH_ERROR, data: error });
  } finally {
    yield put({ type: GET_NEXT_LAUNCH_LOADING, data: false });
  }
}

export function* watchGetNextLaunch() {
  yield takeLatest(GET_NEXT_LAUNCH, getNextLaunch);
}

function launches(state = initialState, action) {
  switch (action.type) {
    case GET_NEXT_LAUNCH_LOADING:
      return { ...state, next_loading: action.data };
    case GET_NEXT_LAUNCH_ERROR:
      return { ...state, next_error: action.data };
    case SET_NEXT_LAUNCH:
      return { ...state, next: action.data };
    default:
      return state;
  }
}

export default launches;
