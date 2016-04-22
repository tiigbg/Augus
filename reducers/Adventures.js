import * as AT from '../constants/ActionTypes';

const initialState = {
    adventures: [
    ],
    loaded: false,
  };

export default function Adventures(state = initialState, action) {
  switch (action.type) {
  case AT.ADVENTURES_FETCH_SUCCEEDED:
    // console.log("Adventures in the reducer are " + action.payload.adventures);
    // console.log("Loaded in the reducer is " + state.loaded);
    return {
        adventures: action.payload.adventures,
        loaded: true
      };
  case AT.ADVENTURES_FETCH_FAILED:
    return state;
  default:
    return state;
  }
}
