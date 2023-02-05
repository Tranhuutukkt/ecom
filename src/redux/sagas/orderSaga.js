/* eslint-disable indent */
import {
    CHANGE_ORDER_STATUS,
    GET_ALL_ORDER,
    GET_ORDER_BY_USER

} from '@/constants/constants';
import {all, call, put, select} from 'redux-saga/effects';
import {setLoading, setRequestStatus} from "@/redux/actions/miscActions";
import {history} from "@/routers/AppRouter";
import {displayActionMessage} from "@/helpers/utils";
import firebase from "@/services/firebase";
import {changeOrderStatusSuccess, getAllOrderSuccess, getOrderByUserSuccess} from "@/redux/actions/orderActions";
import {ADMIN_ORDERS} from "@/constants/routes";

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
        case GET_ALL_ORDER:{
            try{
                yield initRequest();
                const result = yield call(firebase.getAllOrder);
                yield put(getAllOrderSuccess(result));
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;
        }
        case CHANGE_ORDER_STATUS:{
            try {
                yield initRequest();
                yield call(firebase.updateOrder, payload.id, payload);
                yield put(changeOrderStatusSuccess(payload));
                yield put(setLoading(false));
                yield handleAction(undefined, 'Order succesfully changed status!', 'success');
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `Order failed to change status: ${e.message}`, 'error');
            }
            break;
        }
        default: {
            throw new Error(`Unexpected action type ${type}`);
        }
    }
}

export default orderSaga;