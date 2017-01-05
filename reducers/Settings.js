import * as AT from '../constants/ActionTypes';
import { put } from 'redux-saga/effects';

const initialState = {
  // baseUrl: 'http://www.augus.se',
  baseUrl: 'http://192.168.1.122:8000',
};

export default function Settings(state = initialState, action) {
  switch (action.type) {
    case AT.CHANGE_BASE_URL:
      console.log(action.payload);
      return Object.assign({}, state, {
        baseUrl: action.payload.baseUrl
      })
    default:
      return state;
  }
}
