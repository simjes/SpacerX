export const GET_LANDINGPADS = 'GET_LANDINGPADS';
export const GET_LANDINGPAD_DETAILS = 'GET_LANDINGPAD_DETAILS';

export const getLandingPads = () => {
  return { type: GET_LANDINGPADS };
};

export const getLandingPadDetails = () => {
  return { type: GET_LANDINGPAD_DETAILS };
};

const pads = () => ['landingpad1', 'landingpad2'];
const padDetails = () => {
  return {
    name: 'temp',
    location: 'lol'
  };
};

const initialState = {
  overviews: [],
  details: []
};

function landingPads(state = initialState, action) {
  switch (action.type) {
    case GET_LANDINGPADS:
      return { ...state, overviews: pads() };
    case GET_LANDINGPAD_DETAILS:
      return { ...state, details: padDetails() };
    default:
      return state;
  }
}

export default landingPads;
