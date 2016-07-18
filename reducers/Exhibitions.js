import * as AT from '../constants/ActionTypes';

const initialState = {
  exhibitions: [
  ],
  loaded: false,
};

export default function Exhibitions(state = initialState, action) {
  switch (action.type) {
    case AT.ADVENTURES_FETCH_SUCCEEDED:
      console.log("Exhibitions in the reducer are " + action.payload.exhibitions);
      // console.log("Loaded in the reducer is " + state.loaded);
      return {
        exhibitions: action.payload.exhibitions,
        loaded: true,
      };
    case AT.ADVENTURES_FETCH_FAILED:
      return state;
    default:
      return state;
  }
}
