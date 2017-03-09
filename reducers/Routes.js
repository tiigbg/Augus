import * as AT from '../constants/ActionTypes';

const initialState = {
  scene: {},
  currentNodeId: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
  case "focus":
    return {
      ...state,
      scene: action.scene,
    };
  case AT.NAVIGATOR_STATE_CHANGE:
    return Object.assign({}, state, {
        currentNodeId: action.currentNodeId,
      });

  default:
    return state;
  }
}
