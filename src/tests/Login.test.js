import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';

const inputEmailTestId = 'input-gravatar-email';
const inputNameTestId = 'input-player-name';

describe('Testa a pagina da login', () => {
  it('Verifica se possue um input para digitar o nome e outro para o email', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(inputNameTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });
})