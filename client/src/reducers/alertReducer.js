import {SET_ALERT, REMOVE_ALERT} from '../actions/types';

const initialState = {
  message: null,
  type: null
};

export const alertReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        message: payload.message,
        type: payload.type
      };
    case REMOVE_ALERT:
      return {
        ...state,
        message: null,
        type: payload.type
      };

    default:
      return state;
  }
};
