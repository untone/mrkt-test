import { call, put, takeLatest } from 'redux-saga/effects';

import Api from './api';

function* getRequest(action) {
  const {name} = action.payload
  const prefix = name.toUpperCase();
  try {
    const response = yield call(Api, action.payload);
    if (response.error != null) {
      yield put({
        type: `${prefix}_REQUEST_FAILED`
      });
    } else {
      yield put({
        type: `${prefix}_REQUEST_SUCCEEDED`,
        name: name === 'signin' ? response.data.user.name : ''
      });
    }
  } catch (e) {
    yield put({
      type: `${prefix}_REQUEST_FAILED`, message: e.message
    });
  }
};

function* saga() {
  yield takeLatest('SIGNIN_REQUEST', getRequest);
  yield takeLatest('PASSWORD_REQUEST', getRequest);
};

export default saga;


