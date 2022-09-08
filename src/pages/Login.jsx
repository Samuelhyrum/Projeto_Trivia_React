import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveToken } from '../Helpers/storage';

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
    const { history } = this.props;
    const response = await fetch(URL);
    const data = await response.json();
    saveToken(data.token);
    history.push('/GameScreen');
  };

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
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
