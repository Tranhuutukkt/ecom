import {ADD_RETURN_SUCCESS, GET_RETURN_BY_USER_SUCCESS} from '@/constants/constants';

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
        default:
            return state;
    }
}