import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { updateScore } from '../redux/actions';
import { getItem, RANKING, saveItem } from '../Helpers/storage';

const assertionsNumber = 3;
class Feedback extends Component {
  componentDidMount() {
    const { name, gravatarEmail, score } = this.props;
    const ranking = getItem(RANKING) || [];
    const player = {
      name,
      gravatarEmail,
      score,
    };
    const array = [...ranking, player];
    saveItem(RANKING, array);
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(updateScore({ score: 0, assertions: 0 }));
    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h3>
          Placar final:
          <h3 data-testid="feedback-total-score">{ score }</h3>
        </h3>
        <h4>
          Quantidade de acertos:
          <h4
            data-testid="feedback-total-question"
          >
            {assertions}
          </h4>
        </h4>
        <div>
          { assertions < assertionsNumber && (
            <p data-testid="feedback-text">Could be better...</p>
          )}
          { assertions >= assertionsNumber && (
            <p data-testid="feedback-text">Well Done!</p>
          )}
        </div>
        <button
          data-testid="btn-play-again"
          onClick={ this.playAgain }
          type="button"
        >
          Jogar Novamente
        </button>
        <Link to="/Ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: propTypes.number,
  assertions: propTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Feedback);
