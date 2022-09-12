import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App';

describe('Testa a pagina de settings', () => {
  it('Verifica se a página possui o título configuracoes', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: 'Configurações' });
    userEvent.click(button);

    const title = screen.getByRole('heading', {name: 'Configurações'});

    expect(title).toBeInTheDocument();
  });
});
    
      