import { createAction } from 'redux-actions';

const GET_NEXT_LAUNCH = 'LAUNCH/GET_NEXT_LAUNCH';
const SET_NEXT_LAUNCH = 'LAUNCH/SET_NEXT_LAUNCH';
const ERROR_NEXT_LAUNCH = 'LAUNCH/ERROR_NEXT_LAUNCH';
const REQUESTING_NEXT_LAUNCH = 'LAUNCH/REQUESTING_NEXT_LAUNCH';

export const getNextLaunch = createAction(GET_NEXT_LAUNCH);
export const setNextLaunch = createAction(SET_NEXT_LAUNCH);
export const errorNextLaunch = createAction(ERROR_NEXT_LAUNCH);
export const requestingNextLaunch = createAction(REQUESTING_NEXT_LAUNCH);
