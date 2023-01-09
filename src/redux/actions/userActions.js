import {
  ADD_USER, GET_ALL_USER,

  DELETE_USER, EDIT_USER, GET_USER, REGISTER_USER, GET_ALL_USER_SUCCESS, CHANGE_STATUS, CHANGE_STATUS_SUCCESS
} from '@/constants/constants';

// insert in profile array
export const registerUser = (user) => ({
  type: REGISTER_USER,
  payload: user
});

export const getUser = (uid) => ({
  type: GET_USER,
  payload: uid
});

export const getAllUser = () => ({
  type: GET_ALL_USER
});

export const getAllUserSuccess = (users) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: users
});

export const changeStatus = (updates) => ({
  type: CHANGE_STATUS,
  payload: updates
});

export const changeStatusSuccess = (updates) => ({
  type: CHANGE_STATUS_SUCCESS,
  payload: updates
})

// different from registerUser -- only inserted in admins' users array not in profile array
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user
});

export const editUser = (updates) => ({
  type: EDIT_USER,
  payload: updates
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  payload: id
});
