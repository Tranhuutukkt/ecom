import {ADD_USER, CHANGE_STATUS_SUCCESS, DELETE_USER, EDIT_USER, GET_ALL_USER_SUCCESS} from '@/constants/constants';

// const initState = [
//   {
//     firstname: 'Gago',
//     lastname: 'Ka',
//     email: 'gagoka@mail.com',
//     password: 'gagooo',
//     avatar: '',
//     banner: '',
//     dateJoined: 0
//   }
// ];

export default (state = {total: 0, users: []}, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload
          };
        }
        return user;
      });
    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        total: action.payload.total,
        users: action.payload.users};
    case CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.payload.id) return action.payload;
          return u;
        })
      }

    default:
      return state;
  }
};
