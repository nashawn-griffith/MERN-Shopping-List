// import {
//   USER_LOADED,
//   USER_LOADING,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT_SUCCESS,
//   REGISTER_SUCCESS,
//   REGISTER_FAIL
// } from '../actions/types';

// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   isLoading: false,
//   user: null
// };

// export const authReducer = (state = initialState, action) => {
//   const {type, payload} = action;

//   switch (type) {
//     case USER_LOADING:
//       return {
//         ...state,
//         isLoading: true
//       };

//     case USER_LOADED:
//       return {
//         ...state,
//         isAuthenticated: true,
//         isLoading: false,
//         user: payload.data
//       };
//     case LOGIN_SUCCESS:
//     case REGISTER_SUCCESS:
//       const token = payload.meta.token;
//       localStorage.setItem('token', token);
//       return {
//         ...state,
//         isAuthenticated: true,
//         isLoading: false,
//         user: 'User Just logged in'
//       };
//     case AUTH_ERROR:
//     case LOGIN_FAIL:
//     case LOGOUT_SUCCESS:
//     case REGISTER_FAIL:
//       localStorage.removeItem('token');
//       return {
//         ...state,
//         token: null,
//         user: null,
//         isAuthenticated: false,
//         isLoading: false
//       };

//     default:
//       return state;
//   }
// };
