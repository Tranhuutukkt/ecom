import * as ACTION from '@/constants/constants';
import { takeLatest } from 'redux-saga/effects';
import authSaga from './authSaga';
import productSaga from './productSaga';
import profileSaga from './profileSaga';
import userSaga from "@/redux/sagas/userSaga";
import orderSaga from "@/redux/sagas/orderSaga";
import returnSaga from "@/redux/sagas/returnSaga";

function* rootSaga() {
  yield takeLatest([
    ACTION.SIGNIN,
    ACTION.SIGNUP,
    ACTION.SIGNOUT,
    ACTION.SIGNIN_WITH_GOOGLE,
    ACTION.SIGNIN_WITH_FACEBOOK,
    ACTION.SIGNIN_WITH_GITHUB,
    ACTION.ON_AUTHSTATE_CHANGED,
    ACTION.ON_AUTHSTATE_SUCCESS,
    ACTION.ON_AUTHSTATE_FAIL,
    ACTION.SET_AUTH_PERSISTENCE,
    ACTION.RESET_PASSWORD
  ], authSaga);
  yield takeLatest([
    ACTION.ADD_PRODUCT,
    ACTION.SEARCH_PRODUCT,
    ACTION.REMOVE_PRODUCT,
    ACTION.EDIT_PRODUCT,
    ACTION.GET_PRODUCTS,
    ACTION.GET_SUGGESTED_PRODUCT
  ], productSaga);
  yield takeLatest([
      ACTION.GET_ALL_USER,
      ACTION.CHANGE_STATUS
  ], userSaga);
  yield takeLatest([
    ACTION.UPDATE_EMAIL,
    ACTION.UPDATE_PROFILE
  ], profileSaga);
  yield takeLatest([
      ACTION.GET_ORDER_BY_USER,
      ACTION.GET_ALL_ORDER,
      ACTION.CHANGE_ORDER_STATUS
  ], orderSaga);
  yield takeLatest([
      ACTION.ADD_RETURN,
      ACTION.GET_RETURN_BY_USER,
      ACTION.GET_ALL_RETURN,
      ACTION.CHANGE_RETURN_STATUS
  ], returnSaga);
}

export default rootSaga;
