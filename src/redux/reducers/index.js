import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  loginReducer,
  gameReducer,
});

export default rootReducer;
