import store from '../store';

const LOG_IN = 'LOG_IN';
const loginInfoAction = (payload) => (
  store.dispatch({ type: LOG_IN, payload })
);

export default loginInfoAction;
