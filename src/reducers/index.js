import { combineReducers } from 'redux'
import counter from './counter';
import layout from './layout';

export default combineReducers({
  counter, layout
});
