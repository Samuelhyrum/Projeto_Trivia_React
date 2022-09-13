import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';
import mockFectApi from './helpers/mockFectApi';
import GameScreen from '../pages/Game';

const initialState = {player: {score: 0, assertions: 0, name: 'xablau', gravatarEmail: 'xablau@gmail.com' }}

describe('Testa a pagina gameScreen', () => {

let renderReturn;
beforeEach(() => {
jest.spyOn(global, 'fetch').mockImplementation(mockFectApi);
renderReturn =  renderWithRouterAndRedux(<GameScreen />, initialState);
});

afterEach(() => {
  global.fetch.mockClear();
})

  it('Verifica se o Header é renderizado na tela', async () => {
    const image = await screen.findByRole('img', { name: 'avatar' });
    const name = await screen.findByText('xablau');
    const score = await screen.findByText('0');
    
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  });
  it('Verifica se a questao aparece na tela', async () => {
    const category = await screen.findByText('Geography');
    const question = await screen.findByText('Greenland is almost as big as Africa.');
    const buttonTrue = await screen.findByRole('button', { name: 'True' });
    const buttonFalse = await screen.findByRole('button', { name: 'False' });

    expect(category).toBeInTheDocument();
    expect(question).toBeInTheDocument();
    expect(buttonTrue).toBeInTheDocument();
    expect(buttonFalse).toBeInTheDocument();
  });
  it('Verifica se após 30 segundos desativa os botoes', async () => {
    await waitFor(async () => expect(await screen.findByRole('heading', { name: /^timer/i, level: 3 })).toHaveTextContent('timer 0'), {timeout: 31000});

    const buttonTrue = screen.getByRole('button', { name: 'True' });
    const buttonFalse = screen.getByRole('button', { name: 'False' });

    expect(buttonTrue).toBeDisabled();
    expect(buttonFalse).toBeDisabled();
  }, 32000);
  it('Verifica se o botao de next aparece após uma resposta ser selecionada', async () => {
    const buttonTrue = await screen.findByRole('button', { name: 'True' });
    userEvent.click(buttonTrue);
    const buttonNext = screen.getByRole('button', { name: 'Next' });

    expect(buttonNext).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botao de next passa para a próxima questao', async () => {
    const buttonTrue = await screen.findByRole('button', { name: 'True' });
    userEvent.click(buttonTrue);
    const buttonNext = screen.getByRole('button', { name: 'Next' });
    userEvent.click(buttonNext);

    const category = await screen.findByText('Entertainment: Video Games');
    const question = await screen.findByText('In Half-Life 2, if you play the zombies&#039; speech in reverse, they actually speak coherent English.');
    const timer = await screen.findByRole('heading', { name: /^timer/i, level: 3 })

    expect(timer).toHaveTextContent('timer 30');
    expect(category).toBeInTheDocument();
    expect(question).toBeInTheDocument();
  });
  it('Verifica se ao clicar na resposta correta a pontuacao é mostrada corretamente', async () => {
    const buttonFalse = await screen.findByRole('button', { name: 'False' });
    userEvent.click(buttonFalse);
    const score = screen.getByTestId('header-score');

    expect(score).toHaveTextContent('40');
  });
})

describe('Testa a pagina gameScreen', () => {
  it('Verifica se após responder as cinco questoes é redirecioado para a página de feedback', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFectApi);
    const { history } =  renderWithRouterAndRedux(<App />, initialState);
    history.push('/GameScreen');
    const buttonFalse = await screen.findByRole('button', { name: 'False' });
    userEvent.click(buttonFalse);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    const buttonTwo = await screen.findByRole('button', { name: 'False' });
    userEvent.click(buttonTwo);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    const buttonThree = await screen.findByRole('button', { name: 'The Blackbeard Chest' });
    userEvent.click(buttonThree);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    const buttonFour = await screen.findByRole('button', { name: 'Kiddy Kong' });
    userEvent.click(buttonFour);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    const buttonFive = await screen.findByRole('button', { name: '12' });
    userEvent.click(buttonFive);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(history.location.pathname).toBe('/feedback');

    global.fetch.mockClear();
  });
})
