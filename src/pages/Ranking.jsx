import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import PlayerCard from '../components/PlayerCard';
import { getItem, RANKING } from '../Helpers/storage';
import { updateScore } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const players = getItem(RANKING);
    players.sort(({ score: a }, { score: b }) => b - a);
    this.setState({ ranking: players });
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(updateScore({ score: 0, assertions: 0 }));
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.playAgain }
        >
          Home
        </button>
        <div>
          {
            ranking.map((player, index) => {
              const { gravatarEmail, name, score } = player;
              return (
                <PlayerCard
                  key={ index }
                  name={ name }
                  gravatarEmail={ gravatarEmail }
                  score={ score }
                  index={ index }
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: propTypes.func,
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
