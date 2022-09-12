import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';
import mockFectToken from './helpers/mockFectToken';
import Feedback from '../pages/Feedback';

const inputScoreTestId = 'feedback-total-score';
const inputFeedbackTestId = 'feedback-total-question';
const inputEmailTestId = 'input-gravatar-email';
// const buttonPlay = /^jogar novamente/i;
// const buttonRanking = /^ranking/i;

describe('Testa a pagina de feedback', () => {
  it('Verifica se possue um h3 com o texto placar final', () => {
    const initialState = {player: {score: 50, assertions: 1}}
    renderWithRouterAndRedux(<Feedback />, initialState);

    const scoreName = screen.getByTestId(inputScoreTestId);
    const feedbackQuestion = screen.getByTestId(inputFeedbackTestId);

    expect(scoreName).toBeInTheDocument();
    expect(feedbackQuestion).toBeInTheDocument();
  });
  it('Verifica se possue um botão com o texto Jogar Novamente', () => {
    const initialState = {player: {score: 50, assertions: 1}}
    renderWithRouterAndRedux(<Feedback />, initialState);

    const inputPlayAgain = screen.getByRole('button', { name: 'Jogar Novamente' });

    expect(inputPlayAgain).toBeInTheDocument();
  });
  it('Verifica se possue um botão com o texto Ranking', () => {
    const initialState = {player: {score: 50, assertions: 1}}
    renderWithRouterAndRedux(<Feedback />, initialState);

    const inputRanking = screen.getByRole('button', { name: 'Ranking' });

    expect(inputRanking).toBeInTheDocument();
  });
  it('Verifica se a mensagem Could be better... é exibida quando o numero de asserçoes é menor que 3', () => {
    const initialState = {player: {score: 50, assertions: 1}}
    renderWithRouterAndRedux(<Feedback />, initialState);

    const message = screen.getByText('Could be better...', {exact: 'p'});

    expect(message).toBeInTheDocument();
  });
  it('Verifica se a mensagem Well Done! é exibida quando o numero de asserçoes é maior ou igual a 3', () => {
    const initialState = {player: {score: 50, assertions: 4}}
    renderWithRouterAndRedux(<Feedback />, initialState);

    const message = screen.getByText('Well Done!', {exact: 'p'});

    expect(message).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botao Play Again o jogador é redirecionado para a página principal', () => {
    const initialState = {player: {score: 50, assertions: 1}}
    const { history } = renderWithRouterAndRedux(<App />, initialState);
    history.push('/feedback');

    const playAgain = screen.getByRole('button', { name: 'Jogar Novamente' });
    userEvent.click(playAgain);

    const inputName = screen.getByTestId('input-gravatar-email');

    expect(inputName).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botao Ranking o jogador é redirecionado para a página Ranking', async () => {
    const initialState = {player: {score: 50, assertions: 1}}
    const { history } = renderWithRouterAndRedux(<App />, initialState);
    history.push('/feedback');

    const ranking = screen.getByRole('button', { name: 'Ranking' });
    userEvent.click(ranking);


    await waitFor(() => expect(history.location.pathname).toBe('/Ranking'));
  });
})