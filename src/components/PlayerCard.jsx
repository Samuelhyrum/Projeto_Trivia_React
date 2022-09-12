import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import propTypes from 'prop-types';

class PlayerCard extends Component {
  render() {
    const { gravatarEmail, name, score, index } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt=""
        />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </div>
    );
  }
}

PlayerCard.propTypes = {
  score: propTypes.number,
  index: propTypes.number,
  name: propTypes.string,
  gravatarEmail: propTypes.string,
}.isRequired;

export default PlayerCard;
