import {
    CHANGE_ORDER_STATUS, CHANGE_ORDER_STATUS_SUCCESS,
    GET_ALL_ORDER, GET_ALL_ORDER_SUCCESS,
    GET_ORDER_BY_USER, GET_ORDER_BY_USER_SUCCESS
} from '@/constants/constants';
export const getOrderByUser = () => ({
    type: GET_ORDER_BY_USER,
});

export const getOrderByUserSuccess = (orders) => ({
    type: GET_ORDER_BY_USER_SUCCESS,
    payload: orders
})

export const getAllOrder = () => ({
    type: GET_ALL_ORDER,
})

export const getAllOrderSuccess = (orders) => ({
    type: GET_ALL_ORDER_SUCCESS,
    payload: orders
});

export const changeOrderStatus = (updates) => ({
    type: CHANGE_ORDER_STATUS,
    payload: updates
});

export const changeOrderStatusSuccess = (updates) => ({
    type: CHANGE_ORDER_STATUS_SUCCESS,
    payload: updates
})