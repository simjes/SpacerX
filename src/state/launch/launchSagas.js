import { call, put, takeLatest } from 'redux-saga/effects';
import { requestNextLaunch } from '../../services/spaceXApi';
import {
  errorNextLaunch,
  getNextLaunch,
  requestingNextLaunch,
  setNextLaunch
} from './launchActions';

export function* watchGetNextLaunch() {
  yield takeLatest(getNextLaunch, fetchNextLaunch);
}

export function* fetchNextLaunch() {
  try {
    yield put(requestingNextLaunch());

    const nextLaunch = yield call(requestNextLaunch);
    yield put(setNextLaunch(nextLaunch));
  } catch (error) {
    yield put(errorNextLaunch(error));
  }
}
