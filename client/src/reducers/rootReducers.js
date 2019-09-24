import {combineReducers} from 'redux';
import {itemReducer} from './itemReducer';
import {authReducer} from './authReducer';
import {alertReducer} from './alertReducer';

export default combineReducers({
  items: itemReducer,
  //auth: authReducer,
  alert: alertReducer
});
