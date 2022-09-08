import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';
import mockFectToken from './helpers/mockFectToken';

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
  it('Verifica se o botão habilita ao digitar o email e o nome', () => {
    renderWithRouterAndRedux(<App />)

    const inputName = screen.getByTestId(inputNameTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);
    const inputButton = screen.getByRole('button', { name: buttonText });

    userEvent.type(inputEmail, 'teste2@gmail.com');
    userEvent.type(inputName, 'Xablau');

    expect(inputEmail).toHaveValue('teste2@gmail.com');
    expect(inputName).toHaveValue('Xablau');
    expect(inputButton).not.toBeDisabled();
  });
  it('Verifica se ao clicar no botão com o texto "Play" é redirecionado para pagina GameScreen', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFectToken);

    const { history } = renderWithRouterAndRedux(<App />)

    const inputName = screen.getByTestId(inputNameTestId);
    const inputEmail = screen.getByTestId(inputEmailTestId);
    const inputButton = screen.getByRole('button', { name: buttonText });

    userEvent.type(inputEmail, 'teste2@gmail.com');
    userEvent.type(inputName, 'Xablau');
    userEvent.click(inputButton)

    await waitFor(() => expect(history.location.pathname).toBe('/GameScreen'));

    global.fetch.mockClear();
  });
})