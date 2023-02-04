import {
    ADD_RETURN,
    ADD_RETURN_SUCCESS,
    CHANGE_ORDER_STATUS,
    CHANGE_ORDER_STATUS_SUCCESS,
    CHANGE_RETURN_STATUS,
    CHANGE_RETURN_STATUS_SUCCESS,
    GET_ALL_RETURN,
    GET_ALL_RETURN_SUCCESS,
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

export const getAllReturn = () => ({
    type: GET_ALL_RETURN,
})

export const getAllReturnSuccess = (returns) => ({
    type: GET_ALL_RETURN_SUCCESS,
    payload: returns
});

export const changeReturnStatus = (updates) => ({
    type: CHANGE_RETURN_STATUS,
    payload: updates
});

export const changeReturnStatusSuccess = (updates) => ({
    type: CHANGE_RETURN_STATUS_SUCCESS,
    payload: updates
})