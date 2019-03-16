import { combineReducers } from 'redux'
import counter from './counter';
import layout from './layout';
import data from './data';

export default combineReducers({
  counter, layout, data
});
