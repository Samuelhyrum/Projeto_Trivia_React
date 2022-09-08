import React, { Component } from 'react';

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
          type="submit"
          disabled={ isButtonDisabled }
          // onClick={ this.handleSubmit }
        >
          Play
        </button>
      </fieldset>
    );
  }
}

export default Login;
