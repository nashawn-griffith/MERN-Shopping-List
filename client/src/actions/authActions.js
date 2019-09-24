import axios from 'axios';
//import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

export const loadUser = () => async (dispatch, getState) => {
  try {
    dispatch({type: USER_LOADING});
    const token = getState().auth.token;

    let config = {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODhkNzFiMzhiMmE1MjFmMGZjNzkyZiIsIm5hbWUiOiJuYXNoYXduIiwiaWF0IjoxNTY5MjcxMzE0LCJleHAiOjE1NjkyNzQ5MTR9.5BXuLFwGTXjfyZRqpU9-Z9PYITDvj3ADB_svZi93f1g';

    // const user = await axios.get('/api/users/current', {
    //   headers: {Authorization: `Bearer ${token}`}
    // });

    const user = await axios.get('/api/users/current', config);

    dispatch({
      type: USER_LOADED,
      payload: user.data
    });

    //dispatch user
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

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
  } catch (err) {
    dispatch({type: REGISTER_FAIL});
  }
};
