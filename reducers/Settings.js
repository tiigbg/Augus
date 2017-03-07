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
      global.storage.save({
        key: 'language',   // Note: Do not use underscore("_") in key!
        rawData: { 
            language: action.language,
            displaySignlanguage: action.displaySignlanguage,
        },
        // if not specified, the defaultExpires will be applied instead.
        // if set to null, then it will never expire.
        expires: null
      });
      return Object.assign({}, state, {
        language: action.language,
        displaySignlanguage: action.displaySignlanguage,
      })
    default:
      return state;
  }
}
