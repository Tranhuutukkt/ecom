/* eslint-disable indent */
import {
    CHANGE_STATUS,
    GET_ALL_USER
} from '@/constants/constants';
import { ADMIN_USERS } from '@/constants/routes';
import { displayActionMessage } from '@/helpers/utils';
import {
    all, call, put, select
} from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '@/redux/actions/miscActions';
import { history } from '@/routers/AppRouter';
import firebase from '@/services/firebase';
import {changeStatusSuccess, getAllUserSuccess} from "@/redux/actions/userActions";

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
    yield put(setRequestStatus(e?.message || 'Failed to fetch users'));
    console.log('ERROR: ', e);
}

function* userSaga({type, payload}) {
    switch (type) {
        case GET_ALL_USER:{
            try {
                yield initRequest();
                const result = yield call(firebase.getAllUsers);

                if (result.total === 0) {
                    handleError('No users found.');
                }
                else {
                    yield put(getAllUserSuccess(result));
                }
                yield put(setLoading(false));
            } catch (e) {
                console.log(e);
                yield handleError(e);
            }
            break;
        }
        case CHANGE_STATUS:{
            try {
                yield initRequest();
                yield call(firebase.updateProfile, payload.id, payload);
                yield put(changeStatusSuccess(payload));
                yield put(setLoading(false));
                yield handleAction(ADMIN_USERS, 'User succesfully changed status!', 'success');
            } catch (e) {
                yield handleError(e);
                yield handleAction(undefined, `User failed to change status: ${e.message}`, 'error');
            }
            break;
        }

        default: {
            throw new Error(`Unexpected action type ${type}`);
        }
    }
}

export default userSaga;
