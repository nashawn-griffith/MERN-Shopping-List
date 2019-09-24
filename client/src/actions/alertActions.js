import {SET_ALERT, REMOVE_ALERT} from './types';

export const displayAlert = (message, type) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: {message, type}
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: {type}
    });
  }, 2000);
};
