import {CHANGE_ORDER_STATUS_SUCCESS, GET_ALL_ORDER_SUCCESS, GET_ORDER_BY_USER_SUCCESS} from '@/constants/constants';

export default (state = {total: 0, orders: []}, action) => {
    switch (action.type){
        case GET_ORDER_BY_USER_SUCCESS:
            return {
                ...state,
                total: action.payload.length,
                orders: action.payload};
        case GET_ALL_ORDER_SUCCESS:
            return {
                ...state,
                total: action.payload.length,
                orders: action.payload};
        case CHANGE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(o => {
                    if (o.id === action.payload.id) return action.payload;
                    return o;
                })
            }
        default:
            return state;
    }
}