import {
    ADD_RETURN,
    ADD_RETURN_SUCCESS,
    GET_ORDER_BY_USER,
    GET_ORDER_BY_USER_SUCCESS,
    GET_RETURN_BY_USER,
    GET_RETURN_BY_USER_SUCCESS

} from '@/constants/constants';
export const addReturnRequest = (data) => ({
    type: ADD_RETURN,
    payload: data
});

export const addReturnSuccess = (data) => ({
    type: ADD_RETURN_SUCCESS,
    payload: data
});

export const getReturnByUser = () => ({
    type: GET_RETURN_BY_USER,
});

export const getReturnByUserSuccess = (returns) => ({
    type: GET_RETURN_BY_USER_SUCCESS,
    payload: returns
})