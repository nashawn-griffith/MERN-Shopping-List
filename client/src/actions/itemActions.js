import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';
import axios from 'axios';

export const getItem = () => async dispatch => {
  dispatch(setItemLoading());
  const result = await axios.get('/api/items/');
  if (result.data) {
    dispatch({
      type: GET_ITEMS,
      payload: result.data
    });
  }
};

export const addItem = item => async dispatch => {
  const result = await axios.post('/api/items/add', {name: item});

  dispatch({
    type: ADD_ITEM,
    payload: result.data
  });
};

export const deleteItem = id => async dispatch => {
  console.log('inside action', id);
  await axios.post('/api/items/delete/', {id});
  dispatch({
    type: DELETE_ITEM,
    payload: {id}
  });
};

export const setItemLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
