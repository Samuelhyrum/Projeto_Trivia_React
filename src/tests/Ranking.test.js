import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import mockFectToken from './helpers/mockFectToken';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';
import App from '../App';

describe('Testa a pagina de ranking', () => {
  it('Verifica se a página possui o título ranking', () => {
    const initialState = {player: {score: 50, assertions: 1, name: 'xablau', gravatarEmail: 'xablau@gmail.com' }}
    const { history } = renderWithRouterAndRedux(<App />, initialState);
        history.push('/feedback');
        const ranking = screen.getByRole('button', { name: 'Ranking' });
        userEvent.click(ranking);

    const inputName = screen.getByRole('heading', {name: 'Ranking'});

    expect(inputName).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botao home o jogador é redirecionado para a página principal', () => {
        const initialState = {player: {score: 50, assertions: 1, name: 'xablau', gravatarEmail: 'xablau@gmail.com' }}
        const { history } = renderWithRouterAndRedux(<App />, initialState);
        history.push('/feedback');
        const ranking = screen.getByRole('button', { name: 'Ranking' });
        userEvent.click(ranking);
    
        const home = screen.getByRole('button', { name: 'Home' });
        userEvent.click(home);
    
        const inputName = screen.getByTestId('input-gravatar-email');
    
        expect(inputName).toBeInTheDocument();
      });
});