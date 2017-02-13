import * as AT from '../constants/ActionTypes';
import { put } from 'redux-saga/effects';

const initialState = {
  baseUrl: 'http://gsm.augus.se',
  language: 'sv',
  displaySignlanguage: false,
};

export default function Settings(state = initialState, action) {
  switch (action.type) {
    case AT.CHANGE_BASE_URL:
      console.log(action.payload);
      return Object.assign({}, state, {
        baseUrl: action.payload.baseUrl
      })
    case AT.CHANGE_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language,
        displaySignlanguage: action.displaySignlanguage,
      })
    default:
      return state;
  }
}
