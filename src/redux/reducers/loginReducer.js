const INITIAL_STATE = {
  name: '',
  email: '',
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOG_IN':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default loginReducer;
