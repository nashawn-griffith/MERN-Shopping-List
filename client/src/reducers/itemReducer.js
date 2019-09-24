import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';
const initialState = {
  items: [],
  loading: false
};

export const itemReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GET_ITEMS:
      return {
        ...state,
        items: payload.items,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, payload.data]
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== payload.id)
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
