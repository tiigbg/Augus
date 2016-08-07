import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as AT from '../constants/ActionTypes';

// worker Saga : will be fired on ADVENTURES_FETCH_REQUESTED actions
function* fetchMuseumData(action) {
  try {
    const payload = yield call(fetchData, action.payload.REQUEST_URL);
    yield put({ type: AT.MUSEUM_DATA_FETCH_SUCCEEDED, payload: payload});
  } catch (e) {
    console.log("error in fetching:" + e.message);
    yield put({ type: AT.MUSEUM_DATA_FETCH_FAILED, message: e.message });
  }
}

function fetchData(url) {
  console.log("The url is " + url);
  return fetch(url).then((response) => response.json());
}

/*
 Alternatively you may use takeLatest

 Do not allow concurrent fetches of user, If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run
 */
export default function* fetchDataSaga() {
  yield* takeLatest(AT.MUSEUM_DATA_FETCH_REQUESTED, fetchMuseumData);
}
