import {
    GET_ORDER_BY_USER, GET_ORDER_BY_USER_SUCCESS
} from '@/constants/constants';
export const getOrderByUser = () => ({
    type: GET_ORDER_BY_USER,
});

export const getOrderByUserSuccess = (orders) => ({
    type: GET_ORDER_BY_USER_SUCCESS,
    payload: orders
})