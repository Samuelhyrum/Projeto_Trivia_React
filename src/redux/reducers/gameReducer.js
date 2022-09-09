const INITIAL_STATE = {
  response_code: 0,
  results: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_API':
    return {
      ...state,
    };
  case 'RESPONSE_API_SUCCESS':
    return {
      response_code: action.payload.response_code,
      results: action.payload.results,
    };
  case 'RESPONSE_API_FAILURE':
    return {
      ...state,
      erro: action.error,
    };
  default:
    return state;
  }
};

export default gameReducer;
