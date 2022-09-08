import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';

const inputEmailTestId = 'input-gravatar-email';
const inputNameTestId = 'input-player-name';
const buttonText = /^Play/i;

describe('Testa a pagina da login', () => {
  it('Verifica se possue um input para digitar o nome e outro para o email', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId(inputNameTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
  });
  it('Verifica se possue um botão com o texto "Play", que comece desabilitado', () => {
    renderWithRouterAndRedux(<App />)

    const inputButton = screen.getByRole('button', { name: buttonText });

    expect(inputButton).toBeInTheDocument();
    expect(inputButton).toBeDisabled();
  });
})