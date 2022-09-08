import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
