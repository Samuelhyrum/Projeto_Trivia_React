import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PlayerCard from '../components/PlayerCard';
import { getItem, RANKING } from '../Helpers/storage';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const players = getItem(RANKING);
    players.sort(({ score: a }, { score: b }) => b - a);
    this.setState({ ranking: players });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <div data-testid="ranking-title">Ranking</div>
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Home
          </button>
        </Link>
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

export default connect()(Ranking);
