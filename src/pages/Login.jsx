import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveToken } from '../Helpers/storage';
import { loginInfoAction } from '../redux/actions';

const URL = 'https://opentdb.com/api_token.php?command=request';
class Login extends Component {
  state = {
    name: '',
    email: '',
    isButtonDisabled: true,
  };

  handleButtonDisabled = () => {
    const { name, email } = this.state;

    const validadeForm = name && email;
    this.setState({
      isButtonDisabled: !validadeForm,
    });
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.handleButtonDisabled();
    });
  };

  handleSubmit = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const response = await fetch(URL);
    const data = await response.json();
    saveToken(data.token);
    dispatch(loginInfoAction({ name, email }));
    history.push('/GameScreen');
  };

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <div>
        <fieldset>
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleInputChange }
            placeholder="Nome"
          />
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleInputChange }
            placeholder="Email"
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isButtonDisabled }
            onClick={ this.handleSubmit }
          >
            Play
          </button>
        </fieldset>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Configurações</button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: propTypes.func,
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;

export default connect()(Login);
