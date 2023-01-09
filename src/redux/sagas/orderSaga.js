/* eslint-disable indent */
import {
    GET_ORDER_BY_USER

} from '@/constants/constants';
import {all, call, put, select} from 'redux-saga/effects';
import {setLoading, setRequestStatus} from "@/redux/actions/miscActions";
import {history} from "@/routers/AppRouter";
import {displayActionMessage} from "@/helpers/utils";
import firebase from "@/services/firebase";
import {getOrderByUserSuccess} from "@/redux/actions/orderActions";

function* initRequest() {
    yield put(setLoading(true));
    yield put(setRequestStatus(null));
}

function* handleAction(location, message, status) {
    if (location) yield call(history.push, location);
    yield call(displayActionMessage, message, status);
}

function* handleError(e) {
    yield put(setLoading(false));
    yield put(setRequestStatus(e?.message || 'Failed to fetch orders.'));
    console.log('ERROR: ', e);
}

function* orderSaga({type, payload}){
    switch (type){
        case GET_ORDER_BY_USER:{
            try{
                yield initRequest();
                const result = yield call(firebase.getOrderHistory);
                yield put(getOrderByUserSuccess(result));
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;
        }
    }
}

export default orderSaga;