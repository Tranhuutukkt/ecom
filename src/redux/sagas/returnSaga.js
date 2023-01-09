/* eslint-disable indent */
import {
    ADD_RETURN,
    GET_ORDER_BY_USER, GET_RETURN_BY_USER

} from '@/constants/constants';
import {all, call, put, select} from 'redux-saga/effects';
import {setLoading, setRequestStatus} from "@/redux/actions/miscActions";
import {history} from "@/routers/AppRouter";
import {displayActionMessage} from "@/helpers/utils";
import firebase from "@/services/firebase";
import {addReturnSuccess, getReturnByUserSuccess} from "@/redux/actions/returnAction";
import {ACCOUNT, ADMIN_PRODUCTS} from "@/constants/routes";
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
    }
}

export default returnSaga;