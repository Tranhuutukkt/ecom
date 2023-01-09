import {GET_ORDER_BY_USER_SUCCESS} from '@/constants/constants';

export default (state = {total: 0, orders: []}, action) => {
    switch (action.type){
        case GET_ORDER_BY_USER_SUCCESS:
            return {
                ...state,
                total: action.payload.length,
                orders: action.payload};
        default:
            return state;
    }
}