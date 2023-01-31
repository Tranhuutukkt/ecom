/* eslint-disable indent */
import {
    ADD_RETURN, CHANGE_ORDER_STATUS, CHANGE_RETURN_STATUS, GET_ALL_RETURN,
    GET_RETURN_BY_USER

} from '@/constants/constants';
import {all, call, put, select} from 'redux-saga/effects';
import {setLoading, setRequestStatus} from "@/redux/actions/miscActions";
import {history} from "@/routers/AppRouter";
import {displayActionMessage} from "@/helpers/utils";
import firebase from "@/services/firebase";
import {
    addReturnSuccess,
    changeReturnStatusSuccess,
    getAllReturnSuccess,
    getReturnByUserSuccess
} from "@/redux/actions/returnAction";
import {ACCOUNT, ADMIN_ORDERS, ADMIN_PRODUCTS, ADMIN_RETURNS} from "@/constants/routes";
import {changeOrderStatusSuccess, getAllOrderSuccess, getOrderByUserSuccess} from "@/redux/actions/orderActions";

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
    yield put(setRequestStatus(e?.message || 'Failed to fetch returns.'));
    console.log('ERROR: ', e);
}

function* returnSaga({type, payload}){
    switch (type){
        case ADD_RETURN:{
            try{
                yield initRequest();

                const { returnImage } = payload;
                const key = yield call(firebase.generateKey);
                let images = [];

                if (returnImage.length !== 0) {
                    const imageKeys = yield all(returnImage.map(() => firebase.generateKey));
                    const imageUrls = yield all(returnImage.map((img, i) => firebase.storeImage(imageKeys[i](), 'returns', img.file)));
                    images = imageUrls.map((url, i) => ({
                        id: imageKeys[i](),
                        url
                    }));
                }

                const returns = {
                    ...payload,
                    returnImage: images
                };

                yield call(firebase.addReturn, returns);
                yield put(addReturnSuccess(returns));
                yield handleAction(ACCOUNT, 'Request succesfully sent', 'success');
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;
        }
        case GET_RETURN_BY_USER:{
            try{
                yield initRequest();
                const result = yield call(firebase.getReturnHistory);
                yield put(getReturnByUserSuccess(result));
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;
        }
        case GET_ALL_RETURN:{
            try{
                yield initRequest();
                const result = yield call(firebase.getAllReturns);
                yield put(getAllReturnSuccess(result));
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;
        }
        case CHANGE_RETURN_STATUS:{
            try {
                yield initRequest();
                yield call(firebase.updateReturn, payload.id, payload);
                yield put(changeReturnStatusSuccess(payload));
                yield put(setLoading(false));
                yield handleAction(ADMIN_RETURNS, 'Return succesfully changed status!', 'success');
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

export default returnSaga;