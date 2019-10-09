import axios from 'axios';

import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

//register user
export const registerUser = ({name, email, password}) => async dispatch => {
  const body = {
    name,
    email,
    password
  };

  try {
    const result = await axios.post('/api/users/register', body);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: result.data
    });

    /* may have to dispatch fail here if 422 status is returned from server
      check out */
  } catch (err) {
    dispatch({type: REGISTER_FAIL});
  }
};

//get current user
export const loadUser = () => async dispatch => {
  try {
    //get item from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error();
    }
    let config = {};
    config.headers.Authorization = `Bearer ${token}`;
    const user = await axios.get('/api/users/current', config);

    dispatch({
      type: USER_LOADED,
      payload: user.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//login user
export const loginUser = ({email, password}) => async dispatch => {
  const body = {email, password};
  try {
    const result = await axios.post('/api/users/login', body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data
    });

    /* may have to dispatch fail here if 422 status is returned from server
      check out */
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//logout user
export const logoutUser = () => dispatch => {
  dispatch({type: LOGOUT});
};
