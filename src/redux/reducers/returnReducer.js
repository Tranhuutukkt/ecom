import {
    ADD_RETURN_SUCCESS, CHANGE_ORDER_STATUS_SUCCESS, CHANGE_RETURN_STATUS_SUCCESS,
    GET_ALL_RETURN_SUCCESS,
    GET_RETURN_BY_USER_SUCCESS
} from '@/constants/constants';

export default (state = {total: 0, returns: []}, action) => {
    switch (action.type){
        case ADD_RETURN_SUCCESS:
            return {
                ...state,
                total: state.total+1,
                returns: [...state.returns, action.payload]};
        case GET_RETURN_BY_USER_SUCCESS:
            return {
                ...state,
                total: action.payload.length,
                orders: action.payload};
        case GET_ALL_RETURN_SUCCESS:
            return {
                ...state,
                total: action.payload.length,
                returns: action.payload};
        case CHANGE_RETURN_STATUS_SUCCESS:
            return {
                ...state,
                returns: state.returns.map(o => {
                    if (o.id === action.payload.id) return action.payload;
                    return o;
                })
            }
        default:
            return state;
    }
}