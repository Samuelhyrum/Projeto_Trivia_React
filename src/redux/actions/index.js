import store from '../store';
import getQuestions from '../../Helpers/triviaAPI';

export const LOG_IN = 'LOG_IN';
export const loginInfoAction = (payload) => (
  store.dispatch({ type: LOG_IN, payload })
);

const REQUEST_API = 'REQUEST_API';
export const requestAPIAction = () => ({
  type: REQUEST_API,
});

const RESPONSE_API_SUCCESS = 'RESPONSE_API_SUCCESS';
export const responseAPISucessAction = (response) => ({
  type: RESPONSE_API_SUCCESS,
  payload: response,
});

const RESPONSE_API_FAILURE = 'RESPONSE_API_FAILURE';
export const responseAPIFailureAction = (error) => ({
  type: RESPONSE_API_FAILURE,
  erro: error,
});

export const UPDATE_SCORE = 'UPDATE_SCORE';
export const updateScore = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

// a ação de middleware precisa obrigatoriamente retornar outra função e assícrona
export const fetchCurrencyMiddleware = () => async (dispatch) => {
  dispatch(requestAPIAction());

  try {
    const response = await getQuestions();
    const successAction = responseAPISucessAction(response);
    dispatch(successAction);
  } catch (error) {
    const errorAction = responseAPIFailureAction(error);
    dispatch(errorAction);
  }
};
