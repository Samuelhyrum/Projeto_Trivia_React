const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOG_IN':
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case 'UPDATE_SCORE': return {
    ...state,
    ...action.payload,
  };
  default:
    return state;
  }
}

export default player;
